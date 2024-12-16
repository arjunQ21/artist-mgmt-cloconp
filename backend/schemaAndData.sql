-- MySQL dump 10.13  Distrib 5.7.44, for osx10.19 (x86_64)
--
-- Host: localhost    Database: artist_mgmt
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dob` datetime DEFAULT NULL,
  `gender` enum('m','f','o') DEFAULT 'o',
  `address` varchar(255) DEFAULT NULL,
  `first_release_year` year(4) NOT NULL,
  `no_of_albums_released` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'Eminem: Marshall Mathers','1995-06-17 00:00:00','m','USA',1996,43,'2024-12-16 17:20:31','2024-12-16 17:20:31'),(2,'Shreya Ghosal','1982-02-01 00:00:00','f','India',1994,68,'2024-12-16 17:21:06','2024-12-16 17:21:06'),(3,'Arijit Singh','1978-05-14 00:00:00','m','India',1984,23,'2024-12-16 17:21:46','2024-12-16 17:21:46');
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `music`
--

DROP TABLE IF EXISTS `music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `music` (
  `artist_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `album_name` varchar(255) NOT NULL,
  `genre` enum('rnb','country','classic','rock','jazz') NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `music_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `music`
--

LOCK TABLES `music` WRITE;
/*!40000 ALTER TABLE `music` DISABLE KEYS */;
INSERT INTO `music` VALUES (3,1,'Jhoom Jhoom Ta Hun Main','Film Version','classic','2024-12-16 17:22:56','2024-12-16 17:22:56'),(3,2,'Kehte hain khuda ne','Rabta','classic','2024-12-16 17:23:17','2024-12-16 17:23:17'),(3,3,'Night in a Motel','Rabta','classic','2024-12-16 17:23:46','2024-12-16 17:23:46'),(2,4,'Aaguner','Pushpa 2','rock','2024-12-16 17:24:31','2024-12-16 17:24:31'),(2,5,'Dhaago se Baandha','Raskha Bandhan','classic','2024-12-16 17:25:02','2024-12-16 17:25:02'),(2,6,'Zaalima','Zaalima','classic','2024-12-16 17:25:19','2024-12-16 17:25:19'),(1,7,'Not Afraid','Recovery','rock','2024-12-16 17:26:13','2024-12-16 17:26:13'),(1,8,'Space Bound','Recovery','classic','2024-12-16 17:26:25','2024-12-16 17:26:25'),(1,9,'Cinderella man','Recovery','classic','2024-12-16 17:26:37','2024-12-16 17:26:37');
/*!40000 ALTER TABLE `music` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `role` enum('super_admin','artist_manager','artist') DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(500) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `dob` datetime DEFAULT NULL,
  `gender` enum('m','f','o') NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','Account','super_admin','admin@gmail.com','$2b$10$fs3TgMzOdPejy1K5v2NIdelMLuKoLZA8ekwm8dPYjSwD4HLXld9Dm','9866008814','2024-12-06 00:00:00','m','GANDAKI, KASKI','2024-12-16 17:17:40','2024-12-16 17:19:13'),(2,'Manager','Account','artist_manager','manager@gmail.com','$2b$10$aTNY7si0xBwK14pq6lMlnO6hhO5kKRvH/qjTJcwXd7d/ydfCYYJB2','5565656565','2024-12-02 00:00:00','m','GANDAKI, KASKI','2024-12-16 17:18:20','2024-12-16 17:18:20'),(3,'Artist','Account','artist','artist@gmail.com','$2b$10$OWWoAI7EbGIYXwLmMvgqregFfY57nkUXSlA1j0jJdrjrRKwr4XsE6','2323232323','2024-12-13 00:00:00','f','GANDAKI, KASKI','2024-12-16 17:18:49','2024-12-16 17:18:49');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-16 17:45:39
