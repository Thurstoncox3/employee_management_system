INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Thurston','Cox', 1),
       ('Adam','Miller', 1),
       ('Sara','Adams', 2),
       ('Taylor','Burke', 1),
       ('Josh','Williams', 3),
       ('Derrick','Yellock', 3),
       ('Oliver','Keyes', 2),
       ('Kennedy','Morehead', 4),
       ('Rhonda','Roads', 1),
       ('Joel','Green', 1);


INSERT INTO role (title, salary, department_id)
VALUES ("JavaScript", 65000.00, 1),
       ("Data Science Engineer", 67000.00, 3),
       ("Linear Algebra Teacher", 35000.00, 4),
       ("Internet Explorer Analyst", 55000.00, 5),
       ("Machine Learning Engineer", 60000.00, 3),
       ("Graphic Design", 45000.00, 1),
       ("Cloud Development", 70000.00, 2),
       ("Cloud Development", 70000.00, 2),
       ("Cloud Development", 70000.00, 2),
       ("Intern", 22000.00, 5);

INSERT INTO department (name)
VALUES ('Frontend Developement'),
       ('Software Engineer'),
       ('Backend Developement'),
       ('Education'),
       ('Basic Developement');

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;