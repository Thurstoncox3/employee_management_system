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

inquirer
  .prompt ([
    {
      name: 'input',
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
  ]).then((data) => {
    if(data.inquirer === 'View All Departments'){
      return (console.table('department'));
    } else if (data.inquirer === 'View All Roles'){
      return (console.table('role'));
    } else if (data.inquirer === 'View All Employees'){
      return (console.table('employee'));
    } else if (data.inquirer === 'Add a Department'){
      return (results);
    } else if (data.inquirer === 'Add a Role'){
      return(results);
    } else if (data.inquirer === 'Add an Employee'){
      return(results);
    } else if (data.inquirer === 'Update an Employee Role'){
      return(results);
    }
  }).catch((err) => {
    console.log(err);
  })



app.get('api/deparment', (req, res) => {
  db.query(`SELECT * FROM department`, (err, results) => {
    if (err) return res.status(500) .json(err);
    console.table('department');
    return res.json(department);
  });
});
app.post('api/add-department', (req, res) => {
  const department_name = [req.body.department_name];
  db.query(`INSERT INTO department (department_name)  VALUES (?)`, department_name, (err, results) => {
    console.log(results);
    res.json({ status: 'ok' });
  });
});

app.get('/api/role', (req, res) => {
  db.query(`SELECT * FROM role`, (err, results) => {
    if (err) return res.status(500) .json(err);
    console.table('role');
    return res.json(role);
  });
});
app.post('api/add-role', (req, res) => {
  const role_title = [req.body.role_title];
  db.query(`INSERT INTO role(role_title)  VALUES (?)`, role_title, (err, results) => {
    console.log(results);
    res.json({ status: 'ok' });
  });
});

app.get('/api/employee', (req, res) => {
  db.query(`SELECT * FROM employee`, (err, results) => {
    if (err) return res.status(500) .json(err);
    console.table('employee');
    return res.json(employee);
  });
});
app.post('api/add-employee', (req, res) => {
  const first_name = [req.body.first_name];
  db.query(`INSERT INTO employee (first_name)  VALUES (?)`, first_name, (err, results) => {
    console.log(results);
    res.json({ status: 'ok' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})