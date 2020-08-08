DROP DATABASE IF EXISTS portfolio;

CREATE DATABASE portfolio;

USE portfolio;

/* Création des tables  */

CREATE TABLE `admin`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `project` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100),
    `title` VARCHAR(100),
    `society` VARCHAR(100),
    `description` VARCHAR(255),
    `link` VARCHAR(255),
    PRIMARY KEY (`id`)
);

/*------Voir les valeurs d'une table--------*/

select * from project;