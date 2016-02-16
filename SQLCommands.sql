DROP DATABASE IF EXISTS hsidata;

CREATE DATABASE hsidata;

USE hsidata;

CREATE TABLE hacklist( 
	hackid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	header VARCHAR(255), context VARCHAR(255),
	target VARCHAR(255), 
	datatype VARCHAR(255),
	relation VARCHAR(255) , 
	contribution VARCHAR(255),
	motive VARCHAR(255),
	malwaretype VARCHAR(255),
	malwarename VARCHAR(255),
	systemtype VARCHAR(255),
	malwaresource VARCHAR(255),
	browsertype VARCHAR(255),
	hdate VARCHAR(255),
	notes VARCHAR(255),
	cio VARCHAR(255),
	sources VARCHAR(255) );
	
	
CREATE TABLE login(
	username varchar(50) NOT NULL PRIMARY KEY,
	password varchar(50) NOT NULL);