DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS departments;

CREATE TABLE products (item_id INT NOT NULL AUTO_INCREMENT, 
                      product VARCHAR(255) NOT NULL, 
                      department VARCHAR(255) DEFAULT "General", 
                      price DECIMAL(11, 2) NOT NULL DEFAULT 1.00,
                      quantity INT NOT NULL DEFAULT 1,
                      product_sales DECIMAL(11, 2) NOT NULL DEFAULT 0, 
                      PRIMARY KEY(item_id));

CREATE TABLE departments (department_id INT NOT NULL AUTO_INCREMENT, 
                          department_name VARCHAR(255) NOT NULL,
                          over_head_costs DECIMAL(11, 2) NOT NULL, PRIMARY KEY(department_id));

INSERT INTO products (product, department, price, quantity, product_sales) 
VALUES ("Gibson p.44", " Electric Guitars", 1250, 2, 4), 
       ("Parker Fly", "Electric Guitars", 2200, 1, 0), 
       ("Takamine Cut-away", "Acoustic Guitars", 300, 4, 8), 
       ("Fender Strat", "Electric Guitars", 400, 8, 47), 
       ("Taylor Series", "Acoustic Guitars", 2000, 3, 20), 
       ("Martin", "Acoustic Guitars", 1500, 5, 20), 
       ("Schecter", "Electric Guitars", 2350, 1, 600), 
       ("Epiphone", "Acoustic Guitars", 100, 18, 250), 
       ("Hyburn", "Acoustic Guitars", 220, 12, 25), 
       ("Les Paul", "Electric Guitars", 240, 6, 30);

INSERT INTO departments(department_name, over_head_costs) 
VALUES ("Electric Guitars", 1500), 
       ("Acoustic Guitars", 2000);