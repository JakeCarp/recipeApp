-- Accounts Table
CREATE TABLE IF NOT EXISTS accounts(
  id VARCHAR(255) NOT NULL primary key COMMENT 'primary key',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  name varchar(255) COMMENT 'User Name',
  email varchar(255) COMMENT 'User Email',
  picture varchar(255) COMMENT 'User Picture'
) default charset utf8 COMMENT '';
--Recipe table will have an account ID to establish relationship to creator
CREATE TABLE IF NOT EXISTS recipes(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY COMMENT 'primary key',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  title TEXT NOT NULL,
  description TEXT,
  creatorId VARCHAR(255) NOT NULL COMMENT 'Creator id',
  FOREIGN KEY (creatorId) REFERENCES accounts(id) ON DELETE CASCADE
) default charset utf8;
--NOTE "order" is a reserved word, using "stepOrder" instead
CREATE TABLE IF NOT EXISTS steps(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY COMMENT 'primary key',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  stepOrder INT NOT NULL COMMENT 'Used to order the steps in the recipe',
  description TEXT NOT NULL,
  recipeId int NOT NULL COMMENT 'Id of the recipe',
  creatorId VARCHAR(255) not null,
  FOREIGN KEY (recipeId) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (creatorId) REFERENCES accounts(id) ON DELETE CASCADE
) default charset utf8;
CREATE TABLE IF NOT EXISTS ingredients(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY COMMENT 'primary key',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  name TEXT NOT NULL,
  amount TEXT NOT NULL COMMENT 'string value representing the amount of an ingredient needed',
  recipeId INT NOT NULL COMMENT 'Id of the recipe',
  creatorId VARCHAR(255) NOT NULL,
  FOREIGN KEY (recipeId) REFERENCES recipes(id) ON DELETE CASCADE
) default charset utf8;