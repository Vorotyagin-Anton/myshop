-- MySQL dump 10.13  Distrib 5.7.32, for Linux (x86_64)
--
-- Host: localhost    Database: myshop
-- ------------------------------------------------------
-- Server version	5.7.32-0ubuntu0.16.04.1

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
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'id бренда',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Название бренда',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблица брендов';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Brand1'),(2,'Brand2'),(3,'Brand3');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'id категории',
  `leftIndex` int(5) NOT NULL COMMENT 'левый индекс "Nested Set"',
  `rightIndex` int(5) NOT NULL COMMENT 'правый индекс "Nested Set"',
  `level` int(1) NOT NULL COMMENT 'Уровень вложенности',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Название категории',
  `hotDeal` int(1) NOT NULL DEFAULT '0' COMMENT 'Есть товары "Hot Deal"',
  `featured` int(1) NOT NULL DEFAULT '0' COMMENT 'Есть товары "Featured"',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Категории товаров';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (27,0,59,0,'Root',0,0),(28,1,16,1,'Man',1,1),(29,2,9,2,'ManCat1',1,1),(30,3,8,3,'Hoodies',0,1),(31,4,7,3,'Sweatshirts',0,1),(32,5,6,3,'Coats',1,1),(33,10,15,2,'ManCat2',0,1),(34,11,14,3,'Shoes',0,1),(35,12,13,3,'Shorts',0,1),(36,17,54,1,'Women',1,1),(37,18,37,2,'WomenCat1',1,1),(38,19,36,3,'Dresses',1,1),(39,20,35,3,'Tops',1,1),(40,21,34,3,'Sweaters',1,1),(41,22,33,3,'Jackets',1,0),(42,23,32,3,'Blazers',0,0),(43,24,31,3,'Denim',0,0),(44,25,30,3,'Leggings',0,1),(45,26,29,3,'Skirts',1,0),(46,27,28,3,'Accesories',0,0),(47,38,45,2,'WomenCat2',1,1),(48,39,44,3,'Denim',0,1),(49,40,43,3,'Jackets',0,1),(50,41,42,3,'T-Shirts',1,0),(51,46,53,2,'WomenCat3',1,0),(52,47,52,3,'Denim',0,0),(53,48,51,3,'Jackets',1,0),(54,49,50,3,'T-Shirts',1,0),(55,55,56,1,'Kids',0,0),(56,57,58,1,'Accesories',0,0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designers`
--

DROP TABLE IF EXISTS `designers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `designers` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id дизайнера',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Полное имя дизайнера',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Адрес дизайнера',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Путь на сервере к фото дизайнера',
  `quotation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Цитата дизайнера',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Сведения о дизайнерах одежды';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designers`
--

LOCK TABLES `designers` WRITE;
/*!40000 ALTER TABLE `designers` DISABLE KEYS */;
INSERT INTO `designers` VALUES (1,'Bin Burhan','Dhaka, Bd','img/designers/Bin_Burhan.jpg','“Vestibulum quis porttitor dui! Quisque viverra nunc mi, a pulvinar purus condimentum a. Aliquam condimentum mattis neque sed pretium”'),(2,'Anton V','Krasnodar, Russia','img/designers/Anton_V.jpeg','“Терпение и труд всё перетрут”'),(3,'Albert Einstein','Ulm, Germany','img/designers/Albert_Einstein.jpg','“Логика может привести Вас от пункта А к пункту Б, а воображение — куда угодно.”');
/*!40000 ALTER TABLE `designers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goodbrands`
--

DROP TABLE IF EXISTS `goodbrands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goodbrands` (
  `goodID` int(10) NOT NULL COMMENT 'id товара',
  `brandID` int(5) NOT NULL COMMENT 'id бренда',
  PRIMARY KEY (`goodID`,`brandID`),
  KEY `fk_goodbrands_brands` (`brandID`),
  CONSTRAINT `fk_goodbrands_brands` FOREIGN KEY (`brandID`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_goodbrands_goods` FOREIGN KEY (`goodID`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Соответствие товаров брендам';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goodbrands`
--

LOCK TABLES `goodbrands` WRITE;
/*!40000 ALTER TABLE `goodbrands` DISABLE KEYS */;
INSERT INTO `goodbrands` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(18,1),(8,2),(9,2),(10,2),(11,2),(12,2),(13,2),(22,2),(14,3),(15,3),(16,3),(17,3),(18,3);
/*!40000 ALTER TABLE `goodbrands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goodcategories`
--

DROP TABLE IF EXISTS `goodcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goodcategories` (
  `goodID` int(10) NOT NULL COMMENT 'id товара',
  `categoryID` int(10) NOT NULL COMMENT 'id категории',
  PRIMARY KEY (`goodID`,`categoryID`),
  KEY `fk_goodCategories_categories` (`categoryID`),
  CONSTRAINT `fk_goodCategories_categories` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_goodCategories_goods` FOREIGN KEY (`goodID`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Соответствие товаров категориям';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goodcategories`
--

LOCK TABLES `goodcategories` WRITE;
/*!40000 ALTER TABLE `goodcategories` DISABLE KEYS */;
INSERT INTO `goodcategories` VALUES (4,28),(5,28),(6,28),(7,28),(8,28),(9,28),(10,28),(11,28),(12,28),(13,28),(14,28),(16,28),(17,28),(18,28),(22,28),(4,29),(5,29),(6,29),(10,29),(11,29),(4,30),(10,30),(5,31),(11,31),(6,32),(7,33),(8,33),(9,33),(12,33),(13,33),(14,33),(16,33),(17,33),(18,33),(22,33),(7,34),(9,34),(12,34),(22,34),(8,35),(13,35),(14,35),(16,35),(17,35),(18,35),(1,36),(2,36),(3,36),(15,36),(18,36),(1,37),(15,37),(1,38),(15,39),(2,47),(2,48),(3,51),(18,51),(3,52),(18,52);
/*!40000 ALTER TABLE `goodcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gooddesigners`
--

DROP TABLE IF EXISTS `gooddesigners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gooddesigners` (
  `goodID` int(10) NOT NULL COMMENT 'id товара',
  `designerID` int(5) NOT NULL COMMENT 'id дизайнера',
  PRIMARY KEY (`goodID`,`designerID`),
  KEY `fk_gooddesigners_designers` (`designerID`),
  CONSTRAINT `fk_gooddesigners_designers` FOREIGN KEY (`designerID`) REFERENCES `designers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_gooddesigners_goods` FOREIGN KEY (`goodID`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Соответствие товаров дизайнерам';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gooddesigners`
--

LOCK TABLES `gooddesigners` WRITE;
/*!40000 ALTER TABLE `gooddesigners` DISABLE KEYS */;
INSERT INTO `gooddesigners` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(18,1),(22,1),(9,2),(10,2),(11,2),(12,2),(13,2),(14,3),(15,3),(16,3),(17,3),(18,3);
/*!40000 ALTER TABLE `gooddesigners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'id товара',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'название товара',
  `price` decimal(10,2) NOT NULL COMMENT 'цена товара',
  `mainImgID` int(20) NOT NULL COMMENT 'id главного изображения товара',
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'мужской или женский ',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'описание товара',
  `sold` int(10) DEFAULT NULL COMMENT 'число проданных единиц товара',
  `hotDeal` int(1) DEFAULT NULL COMMENT 'Товар "Hot Deal"',
  `featured` int(1) DEFAULT NULL COMMENT 'Товар "Featured"',
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'цвет товара',
  PRIMARY KEY (`id`),
  KEY `fk_goods_images` (`mainImgID`),
  CONSTRAINT `fk_goods_images` FOREIGN KEY (`mainImgID`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Сведения о товарах';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,'1 MANGO PEOPLE T-shirt',52.00,1,'female','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,1,1,'green'),(2,'2 MANGO PEOPLE T-shirt',52.00,2,'female','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,1,'green'),(3,'3 MANGO PEOPLE T-shirt',52.00,3,'female','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,1,'green'),(4,'4 MANGO PEOPLE T-shirt',52.00,4,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,1,'green'),(5,'5 MANGO PEOPLE T-shirt',52.00,5,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,1,'green'),(6,'6 MANGO PEOPLE T-shirt',52.00,6,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,1,'green'),(7,'7 MANGO PEOPLE T-shirt',52.00,7,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,1,'yellow'),(8,'8 MANGO PEOPLE T-shirt',52.00,8,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',1,0,1,'green'),(9,'9 MANGO PEOPLE T-shirt test',52.00,8,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',3,0,1,'yellow'),(10,'A MANGO PEOPLE T-shirt',42.00,1,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,0,'yellow'),(11,'B MANGO PEOPLE T-shirt',50.99,2,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,0,'yellow'),(12,'C MANGO PEOPLE T-shirt',53.15,3,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,0,'yellow'),(13,'D MANGO PEOPLE T-shirt',5.00,4,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,0,'white'),(14,'E MANGO PEOPLE T-shirt',32.50,5,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,0,'white'),(15,'F MANGO PEOPLE T-shirt',37.99,6,'female','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,0,'white'),(16,'Б MANGO PEOPLE T-shirt',14.00,7,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',0,0,0,'white'),(17,'Г MANGO PEOPLE T-shirt',29.00,8,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',1,0,0,'red'),(18,'Д MANGO PEOPLE T-shirt test',24.00,8,'male','Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.',3,0,0,'red'),(22,'new good',15.00,17,'male','You are running Vue in development mode.\r\nMake sure to turn on production mode when deploying for production.',NULL,NULL,NULL,'green');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goodsizes`
--

DROP TABLE IF EXISTS `goodsizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goodsizes` (
  `goodID` int(10) NOT NULL COMMENT 'id товара',
  `sizeID` int(2) NOT NULL COMMENT 'id размера',
  PRIMARY KEY (`goodID`,`sizeID`),
  KEY `fk_goodSizes_sizes` (`sizeID`),
  CONSTRAINT `fk_goodSizes_goods` FOREIGN KEY (`goodID`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_goodSizes_sizes` FOREIGN KEY (`sizeID`) REFERENCES `sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблица соответствия товаров и размеров';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goodsizes`
--

LOCK TABLES `goodsizes` WRITE;
/*!40000 ALTER TABLE `goodsizes` DISABLE KEYS */;
INSERT INTO `goodsizes` VALUES (1,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(12,1),(13,1),(14,1),(15,1),(22,1),(1,2),(3,2),(5,2),(6,2),(7,2),(9,2),(10,2),(12,2),(13,2),(14,2),(15,2),(22,2),(1,3),(3,3),(5,3),(6,3),(7,3),(9,3),(10,3),(12,3),(13,3),(14,3),(15,3),(18,3),(22,3),(1,4),(2,4),(3,4),(5,4),(6,4),(7,4),(8,4),(9,4),(10,4),(11,4),(12,4),(13,4),(14,4),(15,4),(18,4),(22,4),(2,5),(3,5),(5,5),(6,5),(7,5),(8,5),(9,5),(11,5),(12,5),(13,5),(14,5),(15,5),(18,5),(2,6),(3,6),(5,6),(6,6),(7,6),(8,6),(9,6),(11,6),(12,6),(13,6),(14,6),(15,6),(2,7),(3,7),(5,7),(6,7),(7,7),(8,7),(9,7),(11,7),(12,7),(13,7),(14,7),(15,7),(16,7);
/*!40000 ALTER TABLE `goodsizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'id изображения',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'путь на сервере к файлу изображения',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Изображения товаров';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'img/products/product-1.jpeg'),(2,'img/products/product-2.jpeg'),(3,'img/products/product-3.jpeg'),(4,'img/products/product-4.jpeg'),(5,'img/products/product-5.jpeg'),(6,'img/products/product-6.jpeg'),(7,'img/products/product-7.jpeg'),(8,'img/products/product-8.jpeg'),(17,'img/products/1419764251_b_david-luis-i-tjago-silva.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id заказа',
  `userID` int(10) NOT NULL COMMENT 'id пользователя, сделавшего заказ',
  `tel` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'номер телефона для связи с клиентом',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'адрес доставки',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'электронный адрес',
  `goodsPrice` decimal(10,2) NOT NULL COMMENT 'Стоимость товаров в заказе',
  `shippingPrice` decimal(10,2) NOT NULL COMMENT 'Стоимость доставки',
  `discountPrice` decimal(10,2) NOT NULL COMMENT 'Размер скидки',
  `cost` decimal(10,2) NOT NULL COMMENT 'сумма заказа',
  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'логин пользователя',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'статус заказа',
  PRIMARY KEY (`id`),
  KEY `fk_orders_users` (`userID`),
  CONSTRAINT `fk_orders_users` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблица заказов';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (15,4,'87773334455','Планета Земля','test@test.com',303.96,5.00,60.79,248.17,'testtest','В работе'),(16,1,'87773334455','The Earth','test@test.com',194.97,5.00,0.00,199.97,'default','Доставлено'),(17,1,'87773334455','test','test@test.com',154.99,5.00,0.00,159.99,'default','В работе'),(18,13,'87773334455','test','user@user.com',172.98,5.00,0.00,177.98,'user','В службе доставки'),(19,13,'87773334455','test','user@user.com',265.75,15.00,132.88,147.87,'user','В работе'),(20,1,'123','america','a@a.a',245.96,8.00,49.19,204.77,'default','Доставлено'),(21,1,'87773334455','Russia','test@test.com',341.14,5.00,0.00,346.14,'default','В службе доставки'),(22,2,'87773334455','Планета Земля','admin@admin.com',261.29,5.00,0.00,266.29,'admin','Заказ оформлен'),(23,4,'87773334455','Планета Земля','test@test.com',260.00,5.00,0.00,265.00,'testtest','Заказ оформлен'),(24,4,'87773334455','Планета Земля','test@test.com',52.00,5.00,0.00,57.00,'testtest','Заказ оформлен'),(25,15,'test','test','test777@test.com',52.00,5.00,0.00,57.00,'test777','Заказ оформлен'),(26,16,'test888','test888','test888@test.com',156.00,8.00,15.60,148.40,'test888','Заказ оформлен');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_products`
--

DROP TABLE IF EXISTS `orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_products` (
  `orderID` int(10) NOT NULL COMMENT 'id заказа',
  `goodID` int(10) NOT NULL COMMENT 'id товара',
  `count` int(6) NOT NULL COMMENT 'число товаров в заказе',
  PRIMARY KEY (`orderID`,`goodID`),
  KEY `fk_orders_products_products` (`goodID`),
  CONSTRAINT `fk_orders_products_orders` FOREIGN KEY (`orderID`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_products_products` FOREIGN KEY (`goodID`) REFERENCES `goods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблица соответствия товаров и заказов';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_products`
--

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` VALUES (15,10,1),(15,11,4),(15,17,2),(16,10,1),(16,11,3),(17,8,2),(17,11,1),(18,10,1),(18,11,2),(18,17,1),(19,12,5),(20,10,1),(20,11,4),(21,3,3),(21,5,1),(21,10,1),(21,12,1),(21,15,1),(22,4,2),(22,11,1),(22,12,2),(23,1,2),(23,3,1),(23,4,1),(23,8,1),(24,9,1),(25,1,1),(26,2,3);
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sizes` (
  `id` int(2) NOT NULL AUTO_INCREMENT COMMENT 'id размера',
  `name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Название размера',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблица размеров одежды';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'xxs'),(2,'xs'),(3,'s'),(4,'m'),(5,'l'),(6,'xl'),(7,'xxl');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscribers` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'id подписчика',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'email подписчика',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Подписчики на рекламную рассылку';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribers`
--

LOCK TABLES `subscribers` WRITE;
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
INSERT INTO `subscribers` VALUES (26,'test@test.ru'),(27,'t@12.ru'),(28,'121@123.com'),(29,'test@tt.rr'),(30,'ee@okj.def'),(32,'ere@dsfs.we'),(33,'app@test.ru'),(34,'admin@admin.com'),(35,'test@test.com');
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id пользователя',
  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'логин пользователя',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'пароль пользователя',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'электронная почта пользователя',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'адрес доставки',
  `isAdmin` int(1) DEFAULT NULL COMMENT 'Признак администратора',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблица пользователей';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'default','default','default@default.com','default',0),(2,'admin','$2y$10$eCQj8L/F0bzkFVQDLVm9au/Fl7exOrb5.DmDufr/WJCMxd/jadVUC','admin@admin.com','Планета Земля',1),(3,'test','$2y$10$65i.vP6lHSYrVumGuFa.COiRofwGGOS0xJJxaFSndm9kyecoa4ZGC','admin@test.com','Планета Земля',0),(4,'testtest','$2y$10$hJCha0Br.iYwGFs28EuS9ONqbGmhQ6vcAUzHt3RU44OPYOafYhBMe','test@test.com','Планета Земля',0),(13,'user','$2y$10$yt7PR88xivCeBGfYwrv5Aee23suXTGb7tdRsHBHWctpmWvI64UEUC','user@user.com',NULL,0),(14,'test1','$2y$10$5s4fPQd6sTmAmG6S3tapBu47Sg/czIPLRkX6aontCriezojfZxlhq','test1@test1.com',NULL,0),(15,'test777','$2y$10$ksWgBEEeUrI.ftxGZTaMReFQBM.BDE24GjMoLCag2gS1MnnBdvzDy','test777@test.com',NULL,0),(16,'test888','$2y$10$UjZiCgl0ogrLwhe.N2MTdeDu0LsdipKh30g1UlZPpqCLTn7XC5w42','test888@test.com',NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-16 17:32:18
