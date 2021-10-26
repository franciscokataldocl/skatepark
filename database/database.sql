
-- CREATE DATABASE SKATEPARK
CREATE DATABASE skatepark
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;


-- CREATE TABLE SKATERS
CREATE TABLE skaters (id SERIAL, email VARCHAR(50) NOT NULL, nombre
VARCHAR(25) NOT NULL, password VARCHAR(25) NOT NULL, anos_experiencia
INT NOT NULL, especialidad VARCHAR(50) NOT NULL, foto VARCHAR(255) NOT
NULL, estado BOOLEAN NOT NULL, role INT NOT NULL);

-- INSERT REGISTER
INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto,estado, role) 
values ('admin@admin.cl', 'admin skatepark', 'adminskatepark', 0, 'admin', 'admin.jpg', true,1);

-- INSERT REGISTER
INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto,estado, role) 
values ('jose@pepe.cl', 'jose pepe', '123456789', 12, 'loop', 'jose.jpg', false, 0);

-- INSERT REGISTER
INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto,estado, role) 
values ('alejandro@test.cl', 'alejandro contreras', '123456789', 3, 'manual', 'alejandro.jpg', true, 0);