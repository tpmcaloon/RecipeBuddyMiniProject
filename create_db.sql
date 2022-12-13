CREATE DATABASE recipeBuddy;
USE recipeBuddy;
CREATE TABLE foods (FoodID INT AUTO_INCREMENT, FoodName VARCHAR(255), TypicalValuesPer int, Carbs DECIMAL(6, 2), Fat DECIMAL(6, 2), Protein DECIMAL(6, 2), Salt DECIMAL(6, 2), Sugar DECIMAL(6, 2), PRIMARY KEY(FoodID));
INSERT INTO foods (FoodName, TypicalValuesPer, Carbs, Fat, Protein, Salt, Sugar)VALUES('Flour', 100, 81, 1.4, 9.1, 0.01, 0.6) ;
CREATE TABLE users (UserID INT AUTO_INCREMENT, Username VARCHAR(255), FirstName VARCHAR(255), LastName VARCHAR(255), Email VARCHAR(255), Username HashedPassword(255), PRIMARY KEY(UserID));
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';
GRANT ALL PRIVILEGES ON recipeBuddy.* TO 'appuser'@'localhost';