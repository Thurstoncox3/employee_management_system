// const express = require('express');
// const action = require('action');
const mysql = require('mysql');
const table = require('console.table');
const inquirer = require('inquirer');

// const PORT = process.env.PORT || 3001;
// const app = express();


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db',
    port: 3306
  },
  console.log(`Connected to the employee_db answerbase.`)
);

db.connect(function (err) {
  if (err) throw err;
  initialQuestions();
})

function initialQuestions() {
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'list',
        message: 'Select from the following:',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'View All',
          'Done?'
        ]
      }
    ]).then(function (answer) {
      if (answer.action === 'View All Departments') {
        viewDept();
      } else if (answer.action === 'View All Roles') {
        viewRole();
      } else if (answer.action === 'View All Employees') {
        viewEmployee();
      } else if (answer.action === 'Add a Department') {
        addDept();
      } else if (answer.action === 'Add a Role') {
        addRole();
      } else if (answer.action === 'Add an Employee') {
        addEmployee();
      } else if (answer.action === 'Update an Employee Role') {
        update();
      } else if (answer.action === 'View All') {
        veiwAll();
      } else {
        db.end();
      }
    }).catch((err) => {
      console.log(err);
    })
};


function viewDept() {
  db.query('SELECT * FROM department', function (err, res) {
    if (err) return (err);
    console.table(res);
    initialQuestions();
    console.log('Lines are running');
  });
};

function viewRole() {
  db.query('SELECT * FROM role', function (err, res) {
    if (err) return (err);
    console.table(res);
    initialQuestions();
  });
};

function addRole() {
  inquirer
    .prompt([
      {
        name: 'role_title',
        type: 'input',
        message: 'What is the new role?'
      },
      {
        name: 'role_salary',
        type: 'input',
        message: 'Yearly Salary?'
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'What is the department ID?'
      }
    ]).then(function (roleRes) {
      db.query('INSERT INTO role SET ?',
        {
          title: roleRes.role_title,
          salary: roleRes.role_salary,
          department_id: roleRes.department_id
        }
      );
      console.log('addedNewRole');
      initialQuestions();
    })
}

function addDept() {
  inquirer
    .prompt([
      {
        name: 'dept_name',
        type: 'input',
        message: 'What is the Department name?'
      }
    ]).then(function (deptRes) {
      db.query('INSERT INTO department SET ?',
        {
          name: deptRes.dept_name
        }
      )
      console.log('addedNewDept')
      initialQuestions();
    })
}
function update() {
  inquirer
    .prompt([
      {
        name: 'role_or_dept',
        type: 'list',
        message: 'Would you like to update a Role or Department?',
        choices: [
          'Role', 'Department'
        ]
      }
    ]).then(function (updateAnswer) {
      if (updateAnswer.role_or_dept === 'Role') {
        inquirer
          .prompt([
            {
              name: 'role_id',
              type: 'input',
              message: 'What is the ID # for the Employee?'
            },
            {
              name: 'new_role',
              type: 'input',
              message: 'What is the new Role for the Employee?'
            }
          ]).then(function (newRoleAnswer) {
            db.query('UPDATE role SET ? WHERE ?',
              [
                {
                  title: newRoleAnswer.new_role
                },
                {
                  department_id: newRoleAnswer.role_id
                }
              ]
            )
            console.log('New role has been added');
            initialQuestions();
          })
      } else {
        inquirer
          .prompt([
            {
              name: 'department_id',
              type: 'input',
              message: 'What is the ID # for the Employee?'
            },
            {
              name: 'newDept',
              type: 'input',
              message: 'What is the new Department for this Employee?'
            }
          ]).then(function (newDeptAnswer) {
            db.query('UPDATE department SET ? WHERE ?',
              [
                {
                  name: newDeptAnswer.newDept
                },
                {
                  id: newDeptAnswer.department_id
                }
              ]
            )
            console.log('New department has been added');
            initialQuestions();
          })
      }
    })
}

function viewEmployee() {
  db.query('SELECT * FROM employee',
    function (err, results) {
      if (err) return (err)
      console.table(results);
      initialQuestions();
    });
};

function veiwAll() {
  db.query('SELECT * FROM department INNER JOIN employee ON role_id = department.id INNER JOIN role on department_id = employee.id;', function (err, res) {
    if (err) return (err)
    console.table(res);
    initialQuestions();
  });
}


function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'dept_name',
        type: 'input',
        message: 'What is the employees department?'
      }
    ]).then(function (addDept) {
      db.query('INSERT INTO department SET ?',
        {
          name: addDept.dept_name
        }
      )
      inquirer
        .prompt([
          {
            name: 'roleTitle',
            type: 'input',
            message: 'What is the role for this employee?'
          },
          {
            name: 'salary',
            type: 'input',
            message: 'What is this employees salary?'
          },
          {
            name: 'dept_id',
            type: 'input',
            message: 'What is this employees department id number?'
          }
        ])
        .then(function (roleAnswer) {
          db.query('INSERT INTO role SET ?;',
            {
              title: roleAnswer.roleTitle,
              salary: roleAnswer.salary,
              department_id: roleAnswer.dept_id
            }
          )
          inquirer
            .prompt([
              {
                name: 'firstName',
                type: 'input',
                message: 'What is the Employee first name?'
              },
              {
                name: 'lastName',
                type: 'input',
                message: 'What is the Employees last name?'
              },
              {
                name: 'roleId',
                type: 'input',
                message: 'What is the Employees department ID number?'
              },
              {
                name: 'managerName',
                type: 'list',
                message: 'What is the Employees Managers Name?',
                choices: [
                  'Bobby Dabr',
                  'Dan Taff',
                  'Tiff Burr'
                ]
              }
            ]).then(function (employeeAnswer) {
              db.query('INSERT INTO employee SET ?',
                {
                  first_name: employeeAnswer.firstName,
                  last_name: employeeAnswer.lastName,
                  role_id: employeeAnswer.roleId,
                  manager: employeeAnswer.managerName
                }
              )
              console.log('newEmployeeAdded');
              initialQuestions();
            })
        })
    });
}
