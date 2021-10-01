/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 10.4.21-MariaDB : Database - mecanicos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mecanicos` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `mecanicos`;

/*Table structure for table `autos` */

DROP TABLE IF EXISTS `autos`;

CREATE TABLE `autos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_propietario` mediumint(9) unsigned NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `anio` smallint(4) unsigned NOT NULL,
  `patente` varchar(9) NOT NULL,
  `color` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Data for the table `autos` */

insert  into `autos`(`id`,`id_propietario`,`marca`,`modelo`,`anio`,`patente`,`color`) values (2,2,'Chevrolet','Tracker',2021,'AD-123-AB','Gris'),(3,2,'Chevrolet','Tracker',2021,'AD-123-CC','Amarillo'),(5,2,'Chevrolet','Tracker',2021,'AD-123-CC','Gris--'),(6,2,'Chevrolet','Tracker',2021,'AD-123-CC','Gris');

/*Table structure for table `propietarios` */

DROP TABLE IF EXISTS `propietarios`;

CREATE TABLE `propietarios` (
  `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `propietarios` */

insert  into `propietarios`(`id`,`nombre`,`apellido`) values (2,'Criwstian','Lescano');

/*Table structure for table `servicios` */

DROP TABLE IF EXISTS `servicios`;

CREATE TABLE `servicios` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `costo` float(6,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `servicios` */

insert  into `servicios`(`id`,`nombre`,`costo`) values (1,'Cambio de Aceite',10.00),(2,'Cambio de Filtro',100.00),(3,'Cambio de Correa',80.00),(5,'Revisión General',300.00),(6,'Otro',600.00);

/*Table structure for table `transaccion` */

DROP TABLE IF EXISTS `transaccion`;

CREATE TABLE `transaccion` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `id_auto` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `transaccion` */

insert  into `transaccion`(`id`,`fecha`,`id_auto`) values (1,'2021-10-01',2),(3,'2021-10-01',2),(4,'2021-10-01',2),(5,'2021-10-01',2),(6,'2021-10-01',2);

/*Table structure for table `transaccion_detalle` */

DROP TABLE IF EXISTS `transaccion_detalle`;

CREATE TABLE `transaccion_detalle` (
  `id_transaccion` int(11) unsigned NOT NULL,
  `id_servicio` tinyint(3) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `transaccion_detalle` */

insert  into `transaccion_detalle`(`id_transaccion`,`id_servicio`) values (1,1),(1,3),(3,2),(3,2),(3,2),(3,2),(4,2),(4,2),(4,2),(4,2),(6,1),(6,2),(6,3),(6,4);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
