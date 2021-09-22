INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Thurston','Cox', 1, NULL),
       ('Adam','Miller', 2, NULL),
       ('Sara','Adams', 3, NULL),
       ('Taylor','Burke', 4, NULL),
       ('Josh','Williams', 5, NULL),
       ('Derrick','Yellock', 6,NULL),
       ('Oliver','Keyes', 7, NULL),
       ('Kennedy','Morehead', 8, NULL),
       ('Rhonda','Roads', 9,NULL),
       ('Joel','Green', 10,NULL);

INSERT INTO role (title, salary, department_id)
VALUES ("JavaScript", 65000.00, 306),
       ("Data Science Engineer", 67000.00, 306),
       ("Linear Algebra Teacher", 35000.00, 309),
       ("Internet Explorer Analyst", 55000.00, 306),
       ("Machine Learning Engineer", 60000.00, 308),
       ("Graphic Design", 45000.00, 312),
       ("Cloud Development", 70000.00, 300),
       ("Cloud Development", 70000.00, 300),
       ("Cloud Development", 70000.00, 300),
       ("Intern", 22000.00, 101);

INSERT INTO department (name)
VALUES ('Frontend Developement'),
       ('Software Engineer'),
       ('Backend Developement'),
       ('Education'),
       ('Basic Developement');

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;