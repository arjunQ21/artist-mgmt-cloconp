CREATE DATABASE artist_mgmt ;

use artist_mgmt ;

create table user(
    id int auto_increment primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    role enum("super_admin", 'artist_manager', 'artist'),
    email varchar(255) not null UNIQUE,
    password varchar(500) not null,
    phone varchar(20) not null,
    dob datetime,
    gender enum('m', 'f', 'o') not null,
    address varchar(255),
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ;

create table artist(
    id int auto_increment primary key,
    name varchar(255) not null,
    dob datetime,
    gender enum('m', 'f', 'o') DEFAULT 'o',
    address varchar(255),
    first_release_year year not null,
    no_of_albums_released int DEFAULT 0,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ;

create table music(
    artist_id int not null,
    title varchar(255) not null,
    album_name varchar(255) not null,
    genre enum('rnb', 'country', 'classic', 'rock', 'jazz') not null,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (artist_id) references artist(id)
);

