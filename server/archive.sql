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
    `title` VARCHAR(100),
    `description` VARCHAR(100),
    `previewImage` LONGBLOB NOT NULL,
    PRIMARY KEY (`id`)
);

/*------ insertions--------*/

