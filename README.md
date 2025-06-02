
# Calculator API Backend

## Environment
- PHP 8.1+
- Laravel 10.x
- MySQL

## Setup Instructions

1. **Clone the repository** and navigate to the backend directory:

   ```bash
   git clone <repository-url>
   cd backend

## MySql setup on mysql workbench
# Step 1: Set Up MySQL Database in MySQL Workbench
Open MySQL Workbench:

Launch MySQL Workbench on your computer.
Create a New Connection:

Click on the + icon next to "MySQL Connections" to create a new connection.
Enter a name for your connection (e.g., "LaravelDB").
Fill in the connection details:
Hostname: localhost (or the IP address of your MySQL server)
Port: 3306 (default MySQL port)
Username: Your MySQL username (e.g., root)
Password: Click on "Store in Vault..." to enter your password.
Test the Connection:

Click on the "Test Connection" button to ensure that the connection is successful. If it is, click "OK" to save the connection.
Create a New Database:

In the left sidebar, right-click on "Schemas" and select "Create Schema".
Enter a name for your database (e.g., laravel_db) and click "Apply".
Review the SQL statement and click "Apply" again to create the database.
Create Tables:

You can create tables directly in MySQL Workbench by right-clicking on your new database schema and selecting "Create Table".
Define the table structure (e.g., columns, data types) and click "Apply" to create the table.

# Step 2: crete the table in the database
To create the calculations table in MySQL Workbench using a SQL script, you can translate the Laravel migration code into a standard SQL CREATE TABLE statement. Below is the SQL script that corresponds to the Laravel migration you provided:

CREATE TABLE 'laravel_db'.'calculations' (
    id INT AUTO_INCREMENT PRIMARY KEY,
    a DECIMAL(10, 2) NOT NULL,
    b DECIMAL(10, 2) NOT NULL,
    operation VARCHAR(255) NOT NULL,
    result DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# Step 3: Configure Laravel to Connect to MySQL
Open the .env file located in the root of your Laravel project.
Update the database connection settings to match your MySQL database configuration:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=root        # Replace with your MySQL username
DB_PASSWORD=your_password  # Replace with your MySQL password

# Step 4: How to run the application

cmd command: php artisan serve