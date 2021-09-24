const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

function initalQuestions(){
inquirer
  .prompt ([
    {
      name: 'action',
      type: 'rawlist',
      message: 'Select from the following:',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Done?'
      ]
    }
  ]).then(function (data){
    if (data.inquirer === 'View All Departments') {
      return (console.table('department'));
    } else if (data.role === 'View All Roles') {
      return (console.table('role'));
    } else if (data.inquirer === 'View All Employees') {
      return (console.table('employee'));
    } else if (data.inquirer === 'Add a Department') {
      return (results);
    } else if (data.inquirer === 'Add a Role') {
      return (results);
    } else if (data.inquirer === 'Add an Employee') {
      return (results);
    } else if (data.inquirer === 'Update an Employee Role') {
      return (results);
    }
  }).catch((err) => {
    console.log(err);
  })
};


function viewDept () {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) return (err);
    console.table(department);
    initialQuestions();
  });
};

// app.post('api/add-department', (req, res) => {
//   const department_name = [req.body.department_name];
//   db.query(`INSERT INTO department (department_name)  VALUES (?)`, department_name, (err, results) => {
//     console.log(results);
//     res.json({ status: 'ok' });
//   });
// });

  function viewRole () {
    db.query(`SELECT * FROM role`, function (err, results) {
      if (err) return (err);
      console.table(role);
      initialQuestions();
    });
  };

  function addRole(){
    db.query(`SELECT * FROM role`, function (err, results) {
      if (err) return (err);
      console.table(err);
    }, 
    inquirer
        .prompt([
          {
            name:'role_title',
            type: 'input',
            message: 'What is the new role?'
          },
          {
            name:'role_salary',
            type: 'input',
            message: 'Yearly Salary?'
          },
          {
            name:'department_name',
            type:'input',
            message:'What department will this role be apart of?'
          }
        ]). then ((res) => {
          db.query(`INSERT INTO role(title, salary, department_name)  VALUES (?)`, res.role_title, res.role_salary, res.department_name, function (err, results) {
            if (err) return console.log(results);
            initialQuestions();
        })
      })
    )
}

// app.post('api/add-role', (req, res) => {
//   const role_title = [req.body.role_title];
//   db.query(`INSERT INTO role(role_title)  VALUES (?)`, role_title, (err, results) => {
//     console.log(results);
//     res.json({ status: 'ok' });
//   });
// });


function viewEmployee () {
  db.query(`SELECT employee.id, employee.first_name,
  employee.last_name, role.title AS role, role.salary,
  department.name AS department, employee.manager_id
  FROM employee JOIN employee AS manager ON employee.manager_id = manager.id
  JOIN role ON role.id = employee.role_id
  JOIN department ON role.department_id = department.id
  ORDER BY employee.id`, 
  function (err, results) {
    if (err) return (err)
    console.table(employee);
    initialQuestions();
  });
};
function addEmployee(){
  db.query(`SELECT * FROM role`, function (err, results) {
    if (err) return (err);
    console.table(err);
  }, 
  inquirer
      .prompt([
        {
          name:'first_name',
          type: 'input',
          message: 'What the First Name of the employee?'
        },
        {
          name:'last_name',
          type: 'input',
          message: 'What the Last Name of the employee?'
        },
        {
          name:'role_title',
          type: 'input',
          message: 'What is the employees position?'
        },
        {
          name:'manager_id',
          type: 'checkbox',
          message: 'Who is your manager?',
          choice: [
               'Thurston','Cox', 4,
                'Taylor','Burk', 5,
                'Josh','Williams', 5,
                'Kennedy','Morehead', 4
          ]
        },   
      ]).then ((res) => {
        db.query(`INSERT INTO employee(first_name, last_name, manager_id)  VALUES (?)`, res.first_name, res.last_name, res.manager_id, function (err, results) {
          if (err) return console.log(results);
          initialQuestions();
      })
    })
  )
}
function addDept (){
  inquirer
    .prompt ([
      {
        name:'department',
        type:'input',
        message: 'Please name the new department:'
      },
    ]).then(res){
      db.query(`INSERT INTO department (department_name) 
       VALUES (?)`, res.department_name, function (err, results){
      console.log(results);
      initialQuestions();
       })
    }
  }


// app.post('api/add-employee', (req, res) => {
//   const first_name = [req.body.first_name];
//   db.query(`INSERT INTO employee (first_name)  VALUES (?)`, first_name, (err, results) => {
//     console.log(results);
//     res.json({ status: 'ok' });
//   });
// });

initalQuestions();
