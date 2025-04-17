-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fashion_store
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cartitem`
--

DROP TABLE IF EXISTS `cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `added_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `variant_id` (`variant_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cartitem_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitem`
--

LOCK TABLES `cartitem` WRITE;
/*!40000 ALTER TABLE `cartitem` DISABLE KEYS */;
INSERT INTO `cartitem` VALUES (28,1,39,3,1,'2025-04-06 19:21:51'),(29,1,39,30,1,'2025-04-06 19:22:38'),(30,1,86,95,1,'2025-04-06 22:14:02'),(60,13,69,54,2,'2025-04-17 17:18:32');
/*!40000 ALTER TABLE `cartitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `icon_url` varchar(255) DEFAULT 'https://resource-server/category-icon/default.png',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (17,NULL,'Men','Men\'s fashion','https://resource-server/category-icon/default.png','2025-04-05 16:45:42','2025-04-07 01:47:30'),(18,NULL,'Women','Women\'s fashion','https://resource-server/category-icon/default.png','2025-04-05 16:46:03','2025-04-05 16:46:03'),(19,NULL,'Kid','children\'s fashion','https://resource-server/category-icon/default.png','2025-04-05 16:46:58','2025-04-05 16:46:58'),(20,17,'Shirt','Men shirt','https://resource-server/category-icon/default.png','2025-04-05 16:47:12','2025-04-05 16:47:12'),(21,17,'Polo','Men polo','https://resource-server/category-icon/default.png','2025-04-05 16:47:41','2025-04-05 16:47:41'),(22,17,'Sport tank top','Men Sport tank top','https://resource-server/category-icon/default.png','2025-04-05 16:47:53','2025-04-05 16:47:53'),(23,17,'Tank top','Men Tank top','https://resource-server/category-icon/default.png','2025-04-05 16:48:11','2025-04-05 16:48:11'),(24,17,'Hoodie','Men Hoodie','https://resource-server/category-icon/default.png','2025-04-05 16:48:33','2025-04-05 16:48:33'),(25,17,'Jacket','Men Jacket','https://resource-server/category-icon/default.png','2025-04-05 16:49:04','2025-04-05 16:49:04'),(26,17,' Jeans','Men jeans','https://resource-server/category-icon/default.png','2025-04-05 16:49:50','2025-04-05 16:49:50'),(27,17,'Shorts','Men Shorts','https://resource-server/category-icon/default.png','2025-04-05 16:50:15','2025-04-05 16:50:15'),(28,18,'T-shirt','women T-shirt','https://resource-server/category-icon/default.png','2025-04-05 16:50:54','2025-04-05 16:50:54'),(29,18,'Tank top','women Tank top','https://resource-server/category-icon/default.png','2025-04-05 16:51:09','2025-04-05 16:51:09'),(30,18,'Shirt','women Shirt','https://resource-server/category-icon/default.png','2025-04-05 16:54:09','2025-04-05 16:54:09'),(31,18,'Blazers & Vests','Women Blazers & Vests','https://resource-server/category-icon/default.png','2025-04-05 16:54:26','2025-04-05 16:54:26'),(32,18,'Hoodies & Sweatshirts','Women Hoodies & Sweatshirts','https://resource-server/category-icon/default.png','2025-04-05 16:54:50','2025-04-05 16:54:50'),(33,18,'Joggers','Women Joggers','https://resource-server/category-icon/default.png','2025-04-05 16:56:25','2025-04-05 16:56:25'),(34,18,'Jeans','Women Jeans','https://resource-server/category-icon/default.png','2025-04-05 16:56:41','2025-04-05 16:56:41'),(35,18,'Shorts','Women Shorts','https://resource-server/category-icon/default.png','2025-04-05 16:56:56','2025-04-05 16:56:56'),(36,18,'Skirts','Women Skirts','https://resource-server/category-icon/default.png','2025-04-05 16:57:11','2025-04-05 16:57:11'),(37,18,'Dresses & Skirts','Women Dresses & Skirts','https://resource-server/category-icon/default.png','2025-04-05 16:57:24','2025-04-05 16:57:24'),(38,19,'T-shirt','Kid T-shirt','https://resource-server/category-icon/default.png','2025-04-05 16:57:50','2025-04-05 16:57:50'),(39,19,'Shirt','Kid Shirt','https://resource-server/category-icon/default.png','2025-04-05 16:58:05','2025-04-05 16:58:05'),(40,19,'Jumpers & Sweatshirts','Kid Jumpers & Sweatshirts','https://resource-server/category-icon/default.png','2025-04-05 16:58:38','2025-04-05 16:58:38'),(41,19,'Jackets','Kid Jackets','https://resource-server/category-icon/default.png','2025-04-05 16:58:51','2025-04-05 16:58:51'),(42,19,'Jeans','Kid Jeans','https://resource-server/category-icon/default.png','2025-04-05 16:59:07','2025-04-05 16:59:07'),(43,19,'Shorts','Kid Shorts','https://resource-server/category-icon/default.png','2025-04-05 16:59:42','2025-04-05 16:59:42'),(44,17,'T-shirt','Men T-shirt','https://resource-server/category-icon/default.png','2025-04-05 17:08:09','2025-04-05 17:08:09');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `description` text,
  `type` enum('PERCENTAGE','FIXED') DEFAULT NULL,
  `value` int DEFAULT NULL,
  `min_order_value` int DEFAULT NULL,
  `discount_limit` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon`
--

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordercoupon`
--

DROP TABLE IF EXISTS `ordercoupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordercoupon` (
  `order_id` int NOT NULL,
  `coupon_id` int NOT NULL,
  PRIMARY KEY (`order_id`,`coupon_id`),
  KEY `coupon_id` (`coupon_id`),
  CONSTRAINT `ordercoupon_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ordercoupon_ibfk_2` FOREIGN KEY (`coupon_id`) REFERENCES `coupon` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordercoupon`
--

LOCK TABLES `ordercoupon` WRITE;
/*!40000 ALTER TABLE `ordercoupon` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordercoupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `variant_id` (`variant_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orderitem_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitem`
--

LOCK TABLES `orderitem` WRITE;
/*!40000 ALTER TABLE `orderitem` DISABLE KEYS */;
INSERT INTO `orderitem` VALUES (29,15,87,13,3),(30,15,26,19,2),(31,16,26,19,1),(32,16,72,14,2),(33,17,27,4,1),(34,17,33,29,1),(35,17,42,31,1),(36,18,26,19,1),(37,19,29,30,1),(38,20,20,14,1),(39,21,22,30,1),(40,22,23,34,2),(41,23,21,4,1),(42,24,60,54,1),(43,25,23,34,1),(44,26,39,29,1),(45,26,25,4,1),(46,26,87,4,1),(47,26,29,9,1),(48,26,38,3,1),(49,26,27,3,2);
/*!40000 ALTER TABLE `orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitemreturn`
--

DROP TABLE IF EXISTS `orderitemreturn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitemreturn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_return_id` int NOT NULL,
  `order_item_id` int DEFAULT NULL,
  `quantity_returned` int DEFAULT NULL,
  `refund_amount` int DEFAULT NULL,
  `return_reason` text,
  PRIMARY KEY (`id`),
  KEY `order_return_id` (`order_return_id`),
  KEY `order_item_id` (`order_item_id`),
  CONSTRAINT `orderitemreturn_ibfk_1` FOREIGN KEY (`order_return_id`) REFERENCES `orderreturn` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orderitemreturn_ibfk_2` FOREIGN KEY (`order_item_id`) REFERENCES `orderitem` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitemreturn`
--

LOCK TABLES `orderitemreturn` WRITE;
/*!40000 ALTER TABLE `orderitemreturn` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderitemreturn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderreturn`
--

DROP TABLE IF EXISTS `orderreturn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderreturn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `total_refund` int DEFAULT NULL,
  `total_items` int DEFAULT NULL,
  `status` enum('Pending','Completed','Refunded','Rejected') DEFAULT NULL,
  `general_reason` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `processed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `orderreturn_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderreturn`
--

LOCK TABLES `orderreturn` WRITE;
/*!40000 ALTER TABLE `orderreturn` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderreturn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `shipping_info_id` int DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `final_amount` int DEFAULT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDING','PACKED','DELIVERING','DELIVERED','CANCELLED','RETURNED') DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `shipping_info_id` (`shipping_info_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`shipping_info_id`) REFERENCES `shippinginfo` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (15,9,7,2456000,2456000,'2025-04-08 11:15:31','DELIVERING','2025-04-08 11:15:31','2025-04-09 01:10:52'),(16,11,9,1496000,1496000,'2025-04-08 15:37:09','DELIVERING','2025-04-08 15:37:09','2025-04-09 01:10:57'),(17,10,9,4347000,4347000,'2025-04-09 00:49:45','DELIVERING','2025-04-09 00:49:45','2025-04-09 01:11:01'),(18,1,9,298000,298000,'2025-04-09 00:49:58','DELIVERING','2025-04-09 00:49:58','2025-04-09 01:11:24'),(19,2,9,498000,498000,'2025-04-09 00:50:11','DELIVERING','2025-04-09 00:50:11','2025-04-09 01:11:29'),(20,9,9,799000,799000,'2025-04-09 00:50:28','DELIVERED','2025-04-09 00:50:28','2025-04-17 00:57:34'),(21,10,9,749000,749000,'2025-04-09 00:50:53','DELIVERED','2025-04-09 00:50:53','2025-04-09 01:10:23'),(22,10,9,2598000,2598000,'2025-04-09 00:51:07','PENDING','2025-04-09 00:51:07','2025-04-09 00:51:07'),(23,10,9,549000,549000,'2025-04-09 00:51:19','PENDING','2025-04-09 00:51:19','2025-04-09 00:51:19'),(24,10,9,1999000,1999000,'2025-04-09 00:51:32','PENDING','2025-04-09 00:51:32','2025-04-09 00:51:32'),(25,10,9,1299000,1299000,'2025-04-09 00:52:04','PENDING','2025-04-09 00:52:04','2025-04-09 00:52:04'),(26,2,6,4813000,4813000,'2025-04-16 21:09:19','PENDING','2025-04-16 21:09:19','2025-04-16 21:09:19');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `amount` int DEFAULT NULL,
  `method` enum('CREDIT CARD','CASH ON DELIVERY','BANK TRANSFER','PAY IN STORE') DEFAULT NULL,
  `status` enum('PENDING','PAID','FAILED','CANCELLED') DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poductrating`
--

DROP TABLE IF EXISTS `poductrating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poductrating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `poductrating_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `poductrating_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poductrating`
--

LOCK TABLES `poductrating` WRITE;
/*!40000 ALTER TABLE `poductrating` DISABLE KEYS */;
/*!40000 ALTER TABLE `poductrating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `original_price` int DEFAULT NULL,
  `selling_price` int DEFAULT NULL,
  `total_rating` int DEFAULT '0',
  `rating_sum` int DEFAULT '0',
  `image_url` varchar(255) DEFAULT 'https://resource-server/product-image/default.jpg',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (19,1,'Oversized Fit','Heavyweight cotton jersey t-shirt with round neck, ribbed hem, low-cut shoulders and horizontal hem. Loose fit for a very loose baggy fit.',499000,799000,0,0,'/media/products/4.jpg','2025-04-05 17:22:20','2025-04-05 17:22:20'),(20,1,'Printed T-shirt','Soft, printed cotton jersey T-shirt with off-shoulder ruffles and a crew neck with a tapered hem. Loose fit for comfort without being baggy.',399000,799000,0,0,'/media/products/6.jpg','2025-04-05 17:25:01','2025-04-05 17:25:01'),(21,1,'Printed T-shirt Zeppelin','Heavyweight printed cotton jersey T-shirt with ribbed collar, low-cut shoulders and horizontal hem. Loose fit for comfort without being baggy.',249000,549000,0,0,'/media/products/10.jpg','2025-04-05 17:29:57','2025-04-05 17:29:57'),(22,1,'COOLMAX T-Shirt','Lightweight jersey T-shirt with a crew neck, ribbed hem and horizontal hem. Fitted for comfort and a classic look. T-shirt incorporates COOLMAX® performance fabric - a unique form of polyester that is soft, comfortable and quick-drying, wicking moisture and regulating temperature.',349000,749000,0,0,'/media/products/13.jpg','2025-04-05 17:32:24','2025-04-05 17:32:24'),(23,1,'Linen-blend polo shirt','Polo shirt made from a linen blend with a textured knit, featuring a collar, front V-opening, and short sleeves. Regular fit for comfortable wear and a classic silhouette.',899,1299000,0,0,'/media/products/19.jpg','2025-04-05 17:37:06','2025-04-05 17:37:06'),(25,1,'Open-knit polo shirt','Polo shirt made from a cotton blend with an eyelet knit, featuring a ribbed collar, upper V-opening, and ribbed cuffs. Regular fit for comfortable wear and a classic silhouette.',799000,1099000,0,0,'/media/products/22_190c7769.jpg','2025-04-05 18:57:14','2025-04-05 18:57:14'),(26,1,'Graphic T-shirt','Loose fit cotton jersey T-shirt with round neck and printed front.',249000,298000,0,0,'/media/products/139.jpg','2025-04-05 19:10:48','2025-04-05 19:10:48'),(27,2,'Cotton T-shirt','Loose fit cotton jersey T-shirt with round neck, ribbed hem and slightly off-shoulder.',199000,348000,0,0,'/media/products/143.jpg','2025-04-05 19:20:36','2025-04-05 19:20:36'),(28,1,'Fitted T-shirt','Stretchy jersey T-shirt with small trim around neck and front hem.',249000,498000,0,0,'/media/products/150.jpg','2025-04-05 19:27:02','2025-04-05 19:27:02'),(29,1,'Perforated lace-trim T-shirt','Soft perforated jersey T-shirt with deep round neck and delicate lace trim. Overlock cuffs and hem.',249000,498000,0,0,'/media/products/153.jpg','2025-04-05 19:29:35','2025-04-05 19:29:35'),(30,2,'Ribbed T-shirt','Ribbed cotton jersey T-shirt with small trim around neck and front hem.',199000,448000,0,0,'/media/products/157.jpg','2025-04-05 19:31:47','2025-04-05 19:31:47'),(32,1,'Ribbed tank top','Ribbed cotton jersey tank top.',199000,400000,0,0,'/media/products/168.jpg','2025-04-05 19:44:25','2025-04-05 19:44:25'),(33,1,'Lace-trim tank top','Soft cotton jersey short tank top with a square neckline. Small ruffles around the neck and armholes.',249000,499000,0,0,'/media/products/175.jpg','2025-04-05 19:47:11','2025-04-05 19:47:11'),(35,2,'Scalloped lace-trim tank top','Ribbed cotton jersey tank top with a deep round neckline and thin shoulder straps. Lace trim around the neck and armholes.',199000,399000,0,0,'/media/products/183.jpg','2025-04-05 19:52:25','2025-04-05 19:52:25'),(36,1,'Cotton shirt','Loose-fit lightweight woven cotton shirt with collar, button down front and box pleated shoulder pads at back. One chest pocket, low-cut shoulders and long sleeves with button cuffs.',699000,1090000,0,0,'/media/products/184.jpg','2025-04-05 19:53:14','2025-04-05 19:53:14'),(37,1,'Linen shirt','Loose-fit lightweight linen shirt with collar, button down front and double-layered shoulder pads at back. Low-cut shoulders and long sleeves with button cuffs, one chest pocket and slightly rounded hem.',799000,1100000,0,0,'/media/products/185.jpg','2025-04-05 19:54:04','2025-04-05 19:54:04'),(38,1,'Fitted satin shirt','Slim-fit stretch satin shirt with open collar and button down front. Shaped pleats at front and back and long sleeves with cuffs with slits and buttons.',499000,700000,0,0,'/media/products/190.jpg','2025-04-05 19:56:16','2025-04-05 19:56:16'),(39,2,'Denim shirt','Loose-fit stiff cotton denim shirt with collar, button down front, one chest pocket and box pleated shoulder pads at back. Forward-facing shoulder pads, low-cut shoulders and short sleeves to elbow.',799000,1200000,0,0,'/media/products/193.jpg','2025-04-05 19:57:45','2025-04-05 19:57:45'),(40,1,'Slit-cuff shirt','Loose-fit cotton woven shirt with collar and button down front. Low-cut shoulders and long sleeves with slit detail at wrist. Exposed seams at back and hem.',1199000,3500000,0,0,'/media/products/196.jpg','2025-04-05 20:00:15','2025-04-05 20:00:15'),(41,1,'Jersey fabric vest','Slim-fit vest in embossed jersey with round neck and buttons down the front.',299000,499000,0,0,'/media/products/197.jpg','2025-04-05 20:01:37','2025-04-05 20:01:37'),(42,1,'Double-breasted blazer','Slightly elongated double-breasted blazer with V-neck lapel and buttons down the front. Padded shoulders, long sleeves and flap-sealed front pockets. Lined.',999000,3500000,0,0,'/media/products/198.jpg','2025-04-05 20:05:00','2025-04-05 20:05:00'),(43,1,'Linen-blend blazer','Longline blazer in linen blend woven fabric. V-neck lapel, double-breasted front and flap-sealed front pockets. Lined.',899000,2500000,0,0,'/media/products/202.jpg','2025-04-05 20:06:27','2025-04-05 20:06:27'),(44,1,'Tailored vest','Tailor-fitted vest in viscose blend woven fabric. V-neck, buttons down the front and adjustable back belt. Lined.',899000,1500000,0,0,'/media/products/203.jpg','2025-04-05 20:07:08','2025-04-05 20:07:08'),(45,2,'Fine-knit vest','Soft, smooth knit slim-fit vest with round neck, cuffed hem, front buttons down the front and false front pockets.',799000,1500000,0,0,'/media/products/209.jpg','2025-04-05 20:09:32','2025-04-05 20:09:32'),(46,1,'Cropped zip-up hoodie','Short zip-up hoodie in fleece with soft brushed backing. Loose fit with drawstring jersey hood, zip-down front, low-cut shoulders and long sleeves. Ribbed cuffs and hem.',379000,750000,0,0,'/media/products/210.jpg','2025-04-05 20:10:13','2025-04-05 20:10:13'),(47,2,'Letter-print sweatshirt','Loose fit sweatshirt in fleece with soft brushed backing and a lettering motif at the front. Round neck, ribbed hem, zip-down shoulders and long sleeves. Ribbed cuffs and hem.',499000,568000,0,0,'/media/products/215.jpg','2025-04-05 20:14:48','2025-04-05 20:14:48'),(48,2,'Cotton sweatshirt','Loose fit sweatshirt in lightweight cotton fleece with faded style. Long sleeves, ribbed hem and ribbed hem around the neck and at the cuffs and hem.',699000,1200000,0,0,'/media/products/218.jpg','2025-04-05 20:16:07','2025-04-05 20:16:07'),(49,1,'Sports hoodie','Sporty zip-up hoodie in fleece with soft brushed backing. Fitted with hood, zip-down front and hem pocket. Low-cut shoulders and long, loose sleeves with ribbed cuffs and hem.',999000,2100000,0,0,'/media/products/219.jpg','2025-04-05 20:16:41','2025-04-05 20:16:41'),(50,2,'Collared sweatshirt','Loose fit sweatshirt in lightweight cotton fleece with embroidered lettering motif at the front. Collar, button placket and long sleeves, ribbed hem. Raw hem and ribbed cuffs and hem.',799000,1400000,0,0,'/media/products/222.jpg','2025-04-05 20:18:01','2025-04-05 20:18:01'),(51,1,'Cotton-blend joggers','Sweatpants made of soft fleece fabric with a cotton blend. High waist with covered elastic waistband and drawstring, side pockets, and elasticated cuffs. Soft brushed inside.',399000,568000,0,0,'/media/products/231.jpg','2025-04-05 20:21:23','2025-04-05 20:21:23'),(52,1,'DryMove sports joggers','Sports sweatpants made of cotton fleece with DryMove™ technology that wicks moisture away from the skin to keep you comfortable and dry while moving. Relaxed fit with a mid-rise covered elastic waistband and hidden drawstring. Side seam pockets.',799000,1290000,0,0,'/media/products/237.jpg','2025-04-05 20:24:16','2025-04-05 20:24:16'),(53,1,'Flared joggers','Slim-fit joggers made of fleece fabric with a low-rise covered elastic waistband and drawstring. Flared leg openings.',379000,567000,0,0,'/media/products/241.jpg','2025-04-05 20:25:53','2025-04-05 20:25:53'),(54,2,'Loose joggers','Wide-leg joggers made of fleece fabric with an elastic waistband with a drawstring, side seam pockets, and wide legs.',379000,690000,0,0,'/media/products/242.jpg','2025-04-05 20:26:36','2025-04-05 20:26:36'),(55,1,'High-waisted joggers','Jogger pants made of soft fleece fabric. High waist with gathered elastic waistband and drawstring, side pockets, and slightly tapered legs with gathered elastic cuffs.',499000,799000,0,0,'/media/products/246.jpg','2025-04-05 20:28:32','2025-04-05 20:28:32'),(56,1,'Wide Ultra High Jeans','5-pocket jeans made of thick cotton denim, featuring an ultra-high waist, zip fly with a button, and wide, straight legs.',749000,1200000,0,0,'/media/products/252.jpg','2025-04-05 20:30:45','2025-04-05 20:30:45'),(57,1,'Slim Mom High Ankle Jeans','5-pocket ankle-length jeans made of slightly stretchy denim, featuring an ultra-high waist, zip fly, and slightly tapered legs.',699000,1200000,0,0,'/media/products/256.jpg','2025-04-05 20:32:56','2025-04-05 20:32:56'),(58,2,'Flared High Jeans','5-pocket jeans made of slightly stretchy cotton denim for comfort. Flared legs with a fitted silhouette from the waist to the thigh and a flared shape from the knee down. High waist with a zip fly and button. Moderate length, designed to just touch the foot without bunching. A perfect fit for any season.',799000,1200000,0,0,'/media/products/259.jpg','2025-04-05 20:36:12','2025-04-05 20:36:12'),(60,1,'Tapered Jeans','5-pocket jeans made of slightly stretchy denim for comfort. High waist, zip fly with button, and tapered legs.',999000,1999000,0,0,'/media/products/263.jpg','2025-04-05 21:01:27','2025-04-05 21:01:27'),(61,1,'Linen-blend shorts','Tailored wide-leg shorts made of lightweight woven linen blend. High waist with a covered elastic back, concealed zip fly, hidden button closure, and hook fastening. Slanted side pockets, pleats at the top, and vertical pleats at the front and back.',699000,1200000,0,0,'/media/products/266.jpg','2025-04-05 21:02:27','2025-04-05 21:02:27'),(62,1,'Mom Ultra High shorts','5-pocket shorts made of slightly stretchy cotton denim for easier movement. Ultra-high waist with a zip fly and button. Folded hem.',699000,1200000,0,0,'/media/products/272.jpg','2025-04-05 21:04:13','2025-04-05 21:04:13'),(63,1,'Interlock shorts','Shorts made of heavy interlock jersey fabric with a high waist, hidden elastic waistband, and shaping pleats for a flattering fit. Faux welt pockets at the front with decorative metal buttons.',399000,699000,0,0,'/media/products/276.jpg','2025-04-05 21:05:23','2025-04-05 21:05:23'),(64,2,'Sweat shorts','Lightweight fleece shorts made of a cotton blend with a covered elastic waistband, drawstring, and side seam pockets.',299000,599000,0,0,'/media/products/277.jpg','2025-04-05 21:05:58','2025-04-05 21:05:58'),(65,1,'Skinny High shorts','Slim-fit 5-pocket denim shorts with a high waist, zip fly with button, and raw hem.',449000,749000,0,0,'/media/products/282.jpg','2025-04-05 21:07:25','2025-04-05 21:07:25'),(66,1,'Flared cotton skirt','Flared short skirt made of textured woven cotton with an elastic waistband with a drawstring and gathered tiers for extra volume. Features built-in jersey hotpants underneath.',399000,699000,0,0,'/media/products/283.jpg','2025-04-05 21:08:03','2025-04-05 21:08:03'),(67,1,'Maxi poplin skirt','Long, wide skirt made of crisp cotton poplin with a voluminous shape. High waist with a double-layer waistband and decorative drawstrings on both sides. Concealed zipper and hook closure on one side. Unlined.',799000,1200000,0,0,'/media/products/286.jpg','2025-04-05 21:09:15','2025-04-05 21:09:15'),(68,1,'Round mini skirt','Round mini skirt made of woven fabric with side seam pockets, a concealed back zipper, and a hook closure. Unlined.',1299000,2500000,0,0,'/media/products/287.jpg','2025-04-05 21:09:55','2025-04-05 21:09:55'),(69,1,'Bubble hem skirt','Calf-length woven skirt with a regular waistband, covered elastic back, and concealed rear zipper. Side seam pockets and a balloon hem for a puffy silhouette. Lined.',799000,1299000,0,0,'/media/products/288.jpg','2025-04-05 21:10:34','2025-04-05 21:10:34'),(70,2,'Chiffon skirt','Short, fitted crepe chiffon skirt with pleated ruffle trim and eyelet embroidery. Concealed side zipper and hook closure. Lined.',1499000,3499000,0,0,'/media/products/291.jpg','2025-04-05 21:11:44','2025-04-05 21:11:44'),(72,1,'Bodycon spaghetti-strap dress','Slim-fit, calf-length dress made of soft jersey with a deep round neckline and a low scoop back. Spaghetti straps threaded through small rings and tied at the back.',399000,599000,0,0,'/media/products/295.jpg','2025-04-05 21:14:01','2025-04-16 21:12:19'),(73,2,'Linen-blend blazer dress','Sleeveless short blazer dress made of woven linen blend fabric. Fitted style with double-breasted buttons, peaked lapels, padded shoulders, welt front pockets with flaps, and a removable waist tie. Lined.',1299000,3999000,0,0,'/media/products/298.jpg','2025-04-05 21:15:04','2025-04-05 21:15:04'),(74,1,'Lace-up denim dress','Loose-fit short denim dress with an open lace-up neckline at the front. Slightly dropped shoulders, elbow-length sleeves, and large chest patch pockets.',1299000,3299000,0,0,'/media/products/301.jpg','2025-04-05 21:16:16','2025-04-05 21:16:16'),(75,2,'Ruched spaghetti-strap dress','Calf-length woven dress with a straight neckline and adjustable thin straps extending down the back. Two-way front zipper, side seam pockets, and an elastic drawstring with toggles at the waist and hem for a draped effect. Unlined.',799000,1799000,0,0,'/media/products/302.jpg','2025-04-05 21:16:53','2025-04-05 21:16:53'),(76,1,'Cotton T-shirt','Oversized T-shirt in soft cotton jersey with a print. Ribbed crew neck and dropped shoulders.',249000,450000,0,0,'/media/products/305.jpg','2025-04-05 21:18:19','2025-04-05 21:18:19'),(77,2,'Turtleneck','Short top in soft jersey with a turtleneck, long sleeves, and a straight hem.',249000,450000,0,0,'/media/products/308.jpg','2025-04-05 21:19:38','2025-04-05 21:19:38'),(78,2,'Graphic print T-shirt','Oversized T-shirt in soft cotton jersey with a front print. Ribbed crew neck and dropped shoulders.',249000,500000,0,0,'/media/products/309.jpg','2025-04-05 21:20:16','2025-04-05 21:20:16'),(80,1,'Henley shirt','Square-patterned jersey shirt with ribbed trim around the neck and button placket. Dropped shoulders and long sleeves with ribbed cuffs.',399000,699000,0,0,'/media/products/313.jpg','2025-04-05 21:22:03','2025-04-05 21:22:03'),(81,2,'Cotton resort shirt','Patterned cotton-weave shirt with a resort collar, front button fastening, and an open chest pocket. Dropped shoulders and short sleeves.',449000,699000,0,0,'/media/products/314.jpg','2025-04-05 21:22:37','2025-04-05 21:22:37'),(82,1,'Linen-blend shirt','Long-sleeve shirt in soft poplin made from a cotton-linen blend. Turn-down collar, front button fastening, and back yoke. Open chest pocket, dropped shoulders, and buttoned cuffs.',499000,749000,0,0,'/media/products/317.jpg','2025-04-05 21:23:44','2025-04-05 21:23:44'),(83,2,'Flannel cotton shirt','Long-sleeve shirt in soft cotton flannel with a collar, front button fastening, and a back yoke. Buttoned chest pocket and a slightly curved hem.',449000,749000,0,0,'/media/products/320.jpg','2025-04-05 21:25:01','2025-04-05 21:25:01'),(84,1,'Overshirt','Lightweight overshirt in sturdy cotton denim with contrasting topstitching. Collar, front button fastening, dropped shoulders, and long sleeves with snap-buttoned cuffs. Patch front pockets and chest pocket with a flap.',799000,1200000,0,0,'/media/products/323.jpg','2025-04-05 21:26:28','2025-04-05 21:26:28'),(85,1,'Denim shirt','Western-inspired shirt in soft denim with flap chest pockets and snap buttons. Turn-down collar and snap-button fastening down the front and at the cuffs.',499000,749000,0,0,'/media/products/324.jpg','2025-04-05 21:27:15','2025-04-05 21:27:15'),(86,1,'Hoodie','Hoodie in cotton-blend fleece with a soft brushed interior. Double-layered crossover hood, kangaroo pocket, dropped shoulders, and long sleeves. Ribbed cuffs and hem.',399000,599000,0,0,'/media/products/325.jpg','2025-04-05 21:28:19','2025-04-05 21:28:19'),(87,1,'Cropped tank top','Ribbed cotton jersey tank top with a small trim around the neck and armholes.',249000,620000,0,0,'/media/products/163.jpg','2025-04-06 12:29:15','2025-04-06 12:29:15'),(88,1,'Flowy tank top','Jersey tank top with a boat neckline and flared front.',299000,548000,0,0,'/media/products/179.jpg','2025-04-06 12:33:01','2025-04-06 12:33:01'),(89,1,'Twill shorts','Knee-length shorts in soft twill fabric. Loose fit with an elastic waistband and hidden drawstring. Front pleats, side pockets, and one patch back pocket.',599000,899000,0,0,'/media/products/360.jpg','2025-04-08 11:09:54','2025-04-08 11:09:54'),(93,1,'Loose Fit Jeans','5-pocket jeans in wide-leg cotton denim with a faded wash. Adjustable elastic waistband, zip fly with button, and straight legs.',499000,799000,0,0,'/media/products\\341.jpg','2025-04-17 16:59:32','2025-04-17 16:59:32');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productcategory`
--

DROP TABLE IF EXISTS `productcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productcategory` (
  `product_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `productcategory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `productcategory_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productcategory`
--

LOCK TABLES `productcategory` WRITE;
/*!40000 ALTER TABLE `productcategory` DISABLE KEYS */;
INSERT INTO `productcategory` VALUES (19,17),(20,17),(21,17),(22,17),(23,17),(25,17),(26,18),(27,18),(28,18),(29,18),(30,18),(32,18),(33,18),(35,18),(36,18),(37,18),(38,18),(39,18),(40,18),(41,18),(42,18),(43,18),(44,18),(45,18),(46,18),(47,18),(48,18),(49,18),(50,18),(51,18),(52,18),(53,18),(54,18),(55,18),(56,18),(57,18),(58,18),(60,18),(61,18),(62,18),(63,18),(64,18),(65,18),(66,18),(67,18),(68,18),(69,18),(70,18),(72,18),(73,18),(74,18),(75,18),(87,18),(88,18),(76,19),(77,19),(78,19),(80,19),(81,19),(82,19),(83,19),(84,19),(85,19),(86,19),(89,19),(93,19),(23,21),(25,21),(26,28),(27,28),(28,28),(29,28),(30,28),(32,29),(33,29),(35,29),(87,29),(88,29),(36,30),(37,30),(38,30),(39,30),(40,30),(41,31),(42,31),(43,31),(44,31),(45,31),(46,32),(47,32),(48,32),(49,32),(50,32),(51,33),(52,33),(53,33),(54,33),(55,33),(56,34),(57,34),(58,34),(60,34),(61,35),(62,35),(63,35),(64,35),(65,35),(66,36),(67,36),(68,36),(69,36),(70,36),(72,37),(73,37),(74,37),(75,37),(76,38),(77,38),(78,38),(80,38),(81,39),(82,39),(83,39),(84,39),(85,39),(86,40),(93,42),(89,43),(19,44),(20,44),(21,44),(22,44);
/*!40000 ALTER TABLE `productcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productvariant`
--

DROP TABLE IF EXISTS `productvariant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productvariant` (
  `product_id` int NOT NULL,
  `variant_id` int NOT NULL,
  `stock_quantity` int DEFAULT '0',
  `image_url` varchar(255) DEFAULT 'https://resource-server/product-image/default_variant.jpg',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`,`variant_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `productvariant_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `productvariant_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productvariant`
--

LOCK TABLES `productvariant` WRITE;
/*!40000 ALTER TABLE `productvariant` DISABLE KEYS */;
INSERT INTO `productvariant` VALUES (19,12,10,'/media/variants/5.jpg','2025-04-05 17:23:43','2025-04-05 17:23:43'),(19,13,10,'/media/variants/5.jpg','2025-04-05 17:23:43','2025-04-05 17:23:43'),(19,14,10,'/media/variants/5.jpg','2025-04-05 17:23:43','2025-04-05 17:23:43'),(19,15,10,'/media/variants/5.jpg','2025-04-05 17:23:43','2025-04-05 17:23:43'),(20,2,10,'/media/variants/9.jpg','2025-04-05 17:25:41','2025-04-05 17:25:41'),(20,3,10,'/media/variants/9.jpg','2025-04-05 17:25:41','2025-04-05 17:25:41'),(20,4,10,'/media/variants/9.jpg','2025-04-05 17:25:41','2025-04-05 17:25:41'),(20,5,10,'/media/variants/9.jpg','2025-04-05 17:25:41','2025-04-05 17:25:41'),(20,6,10,'/media/variants/9.jpg','2025-04-05 17:25:41','2025-04-05 17:25:41'),(20,12,10,'/media/variants/8.jpg','2025-04-05 17:26:14','2025-04-05 17:26:14'),(20,13,10,'/media/variants/8.jpg','2025-04-05 17:26:14','2025-04-05 17:26:14'),(20,14,10,'/media/variants/8.jpg','2025-04-05 17:26:14','2025-04-05 17:26:14'),(20,15,10,'/media/variants/8.jpg','2025-04-05 17:26:14','2025-04-05 17:26:14'),(20,16,10,'/media/variants/8.jpg','2025-04-05 17:26:14','2025-04-05 17:26:14'),(20,17,10,'/media/variants/7.jpg','2025-04-05 17:27:43','2025-04-05 17:27:43'),(20,18,10,'/media/variants/7.jpg','2025-04-05 17:27:43','2025-04-05 17:27:43'),(20,19,10,'/media/variants/7.jpg','2025-04-05 17:27:43','2025-04-05 17:27:43'),(20,20,10,'/media/variants/7.jpg','2025-04-05 17:27:43','2025-04-05 17:27:43'),(20,21,10,'/media/variants/7.jpg','2025-04-05 17:27:43','2025-04-05 17:27:43'),(21,2,10,'/media/variants/11.jpg','2025-04-05 17:30:34','2025-04-05 17:30:34'),(21,3,10,'/media/variants/11.jpg','2025-04-05 17:30:34','2025-04-05 17:30:34'),(21,4,10,'/media/variants/11.jpg','2025-04-05 17:30:34','2025-04-05 17:30:34'),(21,5,10,'/media/variants/11.jpg','2025-04-05 17:30:34','2025-04-05 17:30:35'),(21,6,10,'/media/variants/11.jpg','2025-04-05 17:30:35','2025-04-05 17:30:35'),(21,22,10,'/media/variants/12.jpg','2025-04-05 17:31:23','2025-04-05 17:31:23'),(21,23,10,'/media/variants/12.jpg','2025-04-05 17:31:23','2025-04-05 17:31:23'),(21,24,10,'/media/variants/12.jpg','2025-04-05 17:31:23','2025-04-05 17:31:23'),(21,25,10,'/media/variants/12.jpg','2025-04-05 17:31:23','2025-04-05 17:31:23'),(21,26,10,'/media/variants/12.jpg','2025-04-05 17:31:23','2025-04-05 17:31:23'),(22,2,10,'/media/variants/15.jpg','2025-04-05 17:33:47','2025-04-05 17:33:47'),(22,3,10,'/media/variants/15.jpg','2025-04-05 17:33:47','2025-04-05 17:33:47'),(22,4,10,'/media/variants/15.jpg','2025-04-05 17:33:47','2025-04-05 17:33:47'),(22,5,10,'/media/variants/15.jpg','2025-04-05 17:33:47','2025-04-05 17:33:47'),(22,6,10,'/media/variants/15.jpg','2025-04-05 17:33:47','2025-04-05 17:33:47'),(22,7,10,'/media/variants/14.jpg','2025-04-05 17:34:20','2025-04-05 17:34:20'),(22,8,10,'/media/variants/14.jpg','2025-04-05 17:34:20','2025-04-05 17:34:20'),(22,9,10,'/media/variants/14.jpg','2025-04-05 17:34:20','2025-04-05 17:34:20'),(22,10,10,'/media/variants/14.jpg','2025-04-05 17:34:20','2025-04-05 17:34:20'),(22,11,10,'/media/variants/14.jpg','2025-04-05 17:34:20','2025-04-05 17:34:20'),(22,12,10,'/media/variants/16.jpg','2025-04-05 17:35:08','2025-04-05 17:35:08'),(22,13,10,'/media/variants/16.jpg','2025-04-05 17:35:08','2025-04-05 17:35:08'),(22,14,10,'/media/variants/16.jpg','2025-04-05 17:35:08','2025-04-05 17:35:08'),(22,15,10,'/media/variants/16.jpg','2025-04-05 17:35:08','2025-04-05 17:35:08'),(22,16,10,'/media/variants/16.jpg','2025-04-05 17:35:08','2025-04-05 17:35:08'),(22,22,10,'/media/variants/17.jpg','2025-04-05 17:35:44','2025-04-05 17:35:44'),(22,23,10,'/media/variants/17.jpg','2025-04-05 17:35:44','2025-04-05 17:35:44'),(22,24,10,'/media/variants/17.jpg','2025-04-05 17:35:44','2025-04-05 17:35:44'),(22,25,10,'/media/variants/17.jpg','2025-04-05 17:35:44','2025-04-05 17:35:44'),(22,26,10,'/media/variants/17.jpg','2025-04-05 17:35:44','2025-04-05 17:35:44'),(22,27,10,'/media/variants/18.jpg','2025-04-05 17:33:08','2025-04-05 17:33:08'),(22,28,10,'/media/variants/18.jpg','2025-04-05 17:33:08','2025-04-05 17:33:08'),(22,29,10,'/media/variants/18.jpg','2025-04-05 17:33:08','2025-04-05 17:33:08'),(22,30,10,'/media/variants/18.jpg','2025-04-05 17:33:08','2025-04-05 17:33:08'),(22,31,10,'/media/variants/18.jpg','2025-04-05 17:33:08','2025-04-05 17:33:08'),(23,23,10,'/media/variants/20.jpg','2025-04-05 17:38:32','2025-04-05 17:38:32'),(23,24,10,'/media/variants/20.jpg','2025-04-05 17:38:32','2025-04-05 17:38:32'),(23,25,10,'/media/variants/20.jpg','2025-04-05 17:38:32','2025-04-05 17:38:32'),(23,26,10,'/media/variants/20.jpg','2025-04-05 17:38:32','2025-04-05 17:38:32'),(23,32,10,'/media/variants/21.jpg','2025-04-05 17:37:55','2025-04-05 17:37:55'),(23,33,10,'/media/variants/21.jpg','2025-04-05 17:37:55','2025-04-05 17:37:55'),(23,34,10,'/media/variants/21.jpg','2025-04-05 17:37:55','2025-04-05 17:37:56'),(23,35,10,'/media/variants/21.jpg','2025-04-05 17:37:56','2025-04-05 17:37:56'),(25,3,10,'/media/variants/23_880fc191.jpg','2025-04-05 18:58:08','2025-04-05 18:58:09'),(25,4,10,'/media/variants/23_880fc191.jpg','2025-04-05 18:58:09','2025-04-05 18:58:09'),(25,5,10,'/media/variants/23_880fc191.jpg','2025-04-05 18:58:09','2025-04-05 18:58:09'),(25,6,10,'/media/variants/23_880fc191.jpg','2025-04-05 18:58:09','2025-04-05 18:58:09'),(25,12,10,'/media/variants/24_2404dc49.jpg','2025-04-05 18:59:02','2025-04-05 18:59:02'),(25,13,10,'/media/variants/24_2404dc49.jpg','2025-04-05 18:59:02','2025-04-05 18:59:02'),(25,14,10,'/media/variants/24_2404dc49.jpg','2025-04-05 18:59:02','2025-04-05 18:59:02'),(25,15,10,'/media/variants/24_2404dc49.jpg','2025-04-05 18:59:02','2025-04-05 18:59:02'),(26,2,95,'/media/variants/140.jpg','2025-04-05 19:11:47','2025-04-05 19:11:48'),(26,3,95,'/media/variants/140.jpg','2025-04-05 19:11:48','2025-04-05 19:11:48'),(26,4,95,'/media/variants/140.jpg','2025-04-05 19:11:48','2025-04-05 19:11:48'),(26,5,95,'/media/variants/140.jpg','2025-04-05 19:11:48','2025-04-05 19:11:48'),(26,6,95,'/media/variants/140.jpg','2025-04-05 19:11:48','2025-04-05 19:11:48'),(26,17,97,'/media/variants/141.jpg','2025-04-05 19:12:36','2025-04-05 19:12:36'),(26,18,97,'/media/variants/141.jpg','2025-04-05 19:12:36','2025-04-05 19:12:36'),(26,19,97,'/media/variants/141.jpg','2025-04-05 19:12:36','2025-04-05 19:12:36'),(26,20,97,'/media/variants/141.jpg','2025-04-05 19:12:36','2025-04-05 19:12:36'),(26,21,97,'/media/variants/141.jpg','2025-04-05 19:12:36','2025-04-05 19:12:36'),(26,27,92,'/media/variants/142.jpg','2025-04-05 19:11:19','2025-04-05 19:11:19'),(26,28,92,'/media/variants/142.jpg','2025-04-05 19:11:19','2025-04-05 19:11:19'),(26,29,92,'/media/variants/142.jpg','2025-04-05 19:11:19','2025-04-05 19:11:19'),(26,30,92,'/media/variants/142.jpg','2025-04-05 19:11:19','2025-04-05 19:11:19'),(26,31,92,'/media/variants/142.jpg','2025-04-05 19:11:19','2025-04-05 19:11:19'),(27,2,120,'/media/variants/148.jpg','2025-04-05 19:22:33','2025-04-05 19:22:33'),(27,3,120,'/media/variants/148.jpg','2025-04-05 19:22:33','2025-04-05 19:22:33'),(27,4,120,'/media/variants/148.jpg','2025-04-05 19:22:33','2025-04-05 19:22:33'),(27,5,120,'/media/variants/148.jpg','2025-04-05 19:22:33','2025-04-05 19:22:33'),(27,6,120,'/media/variants/148.jpg','2025-04-05 19:22:33','2025-04-05 19:22:33'),(27,7,136,'/media/variants/147.jpg','2025-04-05 19:22:58','2025-04-05 19:22:58'),(27,8,136,'/media/variants/147.jpg','2025-04-05 19:22:58','2025-04-05 19:22:58'),(27,9,136,'/media/variants/147.jpg','2025-04-05 19:22:58','2025-04-05 19:22:58'),(27,10,136,'/media/variants/147.jpg','2025-04-05 19:22:58','2025-04-05 19:22:58'),(27,11,136,'/media/variants/147.jpg','2025-04-05 19:22:58','2025-04-05 19:22:58'),(27,12,120,'/media/variants/144.jpg','2025-04-05 19:23:23','2025-04-05 19:23:23'),(27,13,120,'/media/variants/144.jpg','2025-04-05 19:23:23','2025-04-05 19:23:23'),(27,14,120,'/media/variants/144.jpg','2025-04-05 19:23:23','2025-04-05 19:23:23'),(27,15,120,'/media/variants/144.jpg','2025-04-05 19:23:23','2025-04-05 19:23:23'),(27,16,120,'/media/variants/144.jpg','2025-04-05 19:23:23','2025-04-05 19:23:23'),(27,22,145,'/media/variants/145.jpg','2025-04-05 19:23:44','2025-04-05 19:23:44'),(27,23,145,'/media/variants/145.jpg','2025-04-05 19:23:44','2025-04-05 19:23:44'),(27,24,145,'/media/variants/145.jpg','2025-04-05 19:23:44','2025-04-05 19:23:44'),(27,25,145,'/media/variants/145.jpg','2025-04-05 19:23:44','2025-04-05 19:23:44'),(27,26,145,'/media/variants/145.jpg','2025-04-05 19:23:44','2025-04-05 19:23:44'),(27,27,95,'/media/variants/149.jpg','2025-04-05 19:20:57','2025-04-05 19:20:57'),(27,28,95,'/media/variants/149.jpg','2025-04-05 19:20:57','2025-04-05 19:20:57'),(27,29,95,'/media/variants/149.jpg','2025-04-05 19:20:57','2025-04-05 19:20:57'),(27,30,95,'/media/variants/149.jpg','2025-04-05 19:20:57','2025-04-05 19:20:57'),(27,31,95,'/media/variants/149.jpg','2025-04-05 19:20:57','2025-04-05 19:20:57'),(27,32,103,'/media/variants/146.jpg','2025-04-05 19:22:04','2025-04-05 19:22:04'),(27,33,103,'/media/variants/146.jpg','2025-04-05 19:22:04','2025-04-05 19:22:04'),(27,34,103,'/media/variants/146.jpg','2025-04-05 19:22:04','2025-04-05 19:22:04'),(27,35,103,'/media/variants/146.jpg','2025-04-05 19:22:04','2025-04-05 19:22:04'),(27,36,103,'/media/variants/146.jpg','2025-04-05 19:22:04','2025-04-05 19:22:04'),(28,27,103,'/media/variants/151.jpg','2025-04-05 19:27:45','2025-04-05 19:27:45'),(28,28,103,'/media/variants/151.jpg','2025-04-05 19:27:45','2025-04-05 19:27:45'),(28,29,103,'/media/variants/151.jpg','2025-04-05 19:27:45','2025-04-05 19:27:45'),(28,30,103,'/media/variants/151.jpg','2025-04-05 19:27:45','2025-04-05 19:27:45'),(28,31,103,'/media/variants/151.jpg','2025-04-05 19:27:45','2025-04-05 19:27:45'),(28,32,120,'/media/variants/152.jpg','2025-04-05 19:28:29','2025-04-05 19:28:29'),(28,33,120,'/media/variants/152.jpg','2025-04-05 19:28:29','2025-04-05 19:28:29'),(28,34,120,'/media/variants/152.jpg','2025-04-05 19:28:29','2025-04-05 19:28:29'),(28,35,120,'/media/variants/152.jpg','2025-04-05 19:28:29','2025-04-05 19:28:29'),(28,36,120,'/media/variants/152.jpg','2025-04-05 19:28:29','2025-04-05 19:28:29'),(28,37,103,'/media/variants/151.jpg','2025-04-05 19:27:45','2025-04-05 19:27:45'),(28,38,120,'/media/variants/152.jpg','2025-04-05 19:28:29','2025-04-05 19:28:29'),(29,2,155,'/media/variants/155.jpg','2025-04-05 19:30:25','2025-04-05 19:30:25'),(29,3,155,'/media/variants/155.jpg','2025-04-05 19:30:25','2025-04-05 19:30:25'),(29,4,155,'/media/variants/155.jpg','2025-04-05 19:30:25','2025-04-05 19:30:25'),(29,5,155,'/media/variants/155.jpg','2025-04-05 19:30:25','2025-04-05 19:30:25'),(29,6,155,'/media/variants/155.jpg','2025-04-05 19:30:25','2025-04-05 19:30:25'),(29,7,136,'/media/variants/156.jpg','2025-04-05 19:30:47','2025-04-05 19:30:47'),(29,8,136,'/media/variants/156.jpg','2025-04-05 19:30:47','2025-04-05 19:30:47'),(29,9,136,'/media/variants/156.jpg','2025-04-05 19:30:47','2025-04-05 19:30:47'),(29,10,136,'/media/variants/156.jpg','2025-04-05 19:30:47','2025-04-05 19:30:47'),(29,11,136,'/media/variants/156.jpg','2025-04-05 19:30:47','2025-04-05 19:30:47'),(29,27,97,'/media/variants/154.jpg','2025-04-05 19:29:58','2025-04-05 19:29:58'),(29,28,97,'/media/variants/154.jpg','2025-04-05 19:29:58','2025-04-05 19:29:58'),(29,29,97,'/media/variants/154.jpg','2025-04-05 19:29:58','2025-04-05 19:29:58'),(29,30,97,'/media/variants/154.jpg','2025-04-05 19:29:58','2025-04-05 19:29:58'),(29,31,97,'/media/variants/154.jpg','2025-04-05 19:29:58','2025-04-05 19:29:58'),(30,2,123,'/media/variants/159.jpg','2025-04-05 19:32:33','2025-04-05 19:32:33'),(30,3,123,'/media/variants/159.jpg','2025-04-05 19:32:33','2025-04-05 19:32:33'),(30,4,123,'/media/variants/159.jpg','2025-04-05 19:32:33','2025-04-05 19:32:34'),(30,5,123,'/media/variants/159.jpg','2025-04-05 19:32:34','2025-04-05 19:32:34'),(30,6,123,'/media/variants/159.jpg','2025-04-05 19:32:34','2025-04-05 19:32:34'),(30,7,155,'/media/variants/160.jpg','2025-04-05 19:32:50','2025-04-05 19:32:50'),(30,8,155,'/media/variants/160.jpg','2025-04-05 19:32:50','2025-04-05 19:32:50'),(30,9,155,'/media/variants/160.jpg','2025-04-05 19:32:50','2025-04-05 19:32:50'),(30,10,155,'/media/variants/160.jpg','2025-04-05 19:32:50','2025-04-05 19:32:50'),(30,11,155,'/media/variants/160.jpg','2025-04-05 19:32:50','2025-04-05 19:32:50'),(30,12,178,'/media/variants/158.jpg','2025-04-05 19:33:12','2025-04-05 19:33:12'),(30,13,178,'/media/variants/158.jpg','2025-04-05 19:33:12','2025-04-05 19:33:12'),(30,14,178,'/media/variants/158.jpg','2025-04-05 19:33:12','2025-04-05 19:33:12'),(30,15,178,'/media/variants/158.jpg','2025-04-05 19:33:12','2025-04-05 19:33:12'),(30,16,178,'/media/variants/158.jpg','2025-04-05 19:33:12','2025-04-05 19:33:12'),(30,22,161,'/media/variants/161.jpeg','2025-04-05 19:33:57','2025-04-05 19:33:57'),(30,23,161,'/media/variants/161.jpeg','2025-04-05 19:33:57','2025-04-05 19:33:58'),(30,24,161,'/media/variants/161.jpeg','2025-04-05 19:33:58','2025-04-05 19:33:58'),(30,25,161,'/media/variants/161.jpeg','2025-04-05 19:33:58','2025-04-05 19:33:58'),(30,26,161,'/media/variants/161.jpeg','2025-04-05 19:33:58','2025-04-05 19:33:58'),(30,27,97,'/media/variants/162.jpg','2025-04-05 19:32:06','2025-04-05 19:32:06'),(30,28,97,'/media/variants/162.jpg','2025-04-05 19:32:06','2025-04-05 19:32:06'),(30,29,97,'/media/variants/162.jpg','2025-04-05 19:32:06','2025-04-05 19:32:06'),(30,30,97,'/media/variants/162.jpg','2025-04-05 19:32:06','2025-04-05 19:32:06'),(30,31,97,'/media/variants/162.jpg','2025-04-05 19:32:06','2025-04-05 19:32:06'),(32,2,120,'/media/variants/172.jpg','2025-04-05 19:45:34','2025-04-05 19:45:34'),(32,3,120,'/media/variants/172.jpg','2025-04-05 19:45:34','2025-04-05 19:45:34'),(32,4,120,'/media/variants/172.jpg','2025-04-05 19:45:34','2025-04-05 19:45:34'),(32,5,120,'/media/variants/172.jpg','2025-04-05 19:45:34','2025-04-05 19:45:34'),(32,6,120,'/media/variants/172.jpg','2025-04-05 19:45:34','2025-04-05 19:45:34'),(32,7,83,'/media/variants/171.jpg','2025-04-05 19:45:51','2025-04-05 19:45:51'),(32,8,83,'/media/variants/171.jpg','2025-04-05 19:45:51','2025-04-05 19:45:51'),(32,9,83,'/media/variants/171.jpg','2025-04-05 19:45:51','2025-04-05 19:45:51'),(32,10,83,'/media/variants/171.jpg','2025-04-05 19:45:51','2025-04-05 19:45:51'),(32,11,83,'/media/variants/171.jpg','2025-04-05 19:45:51','2025-04-05 19:45:51'),(32,12,44,'/media/variants/170.jpg','2025-04-05 19:46:08','2025-04-05 19:46:08'),(32,13,44,'/media/variants/170.jpg','2025-04-05 19:46:08','2025-04-05 19:46:08'),(32,14,44,'/media/variants/170.jpg','2025-04-05 19:46:08','2025-04-05 19:46:08'),(32,15,44,'/media/variants/170.jpg','2025-04-05 19:46:08','2025-04-05 19:46:08'),(32,16,44,'/media/variants/170.jpg','2025-04-05 19:46:08','2025-04-05 19:46:08'),(32,22,94,'/media/variants/174.jpg','2025-04-05 19:46:23','2025-04-05 19:46:23'),(32,23,94,'/media/variants/174.jpg','2025-04-05 19:46:23','2025-04-05 19:46:23'),(32,24,94,'/media/variants/174.jpg','2025-04-05 19:46:23','2025-04-05 19:46:23'),(32,25,94,'/media/variants/174.jpg','2025-04-05 19:46:23','2025-04-05 19:46:23'),(32,26,94,'/media/variants/174.jpg','2025-04-05 19:46:23','2025-04-05 19:46:23'),(32,32,183,'/media/variants/173.jpg','2025-04-05 19:44:41','2025-04-05 19:44:41'),(32,33,183,'/media/variants/173.jpg','2025-04-05 19:44:41','2025-04-05 19:44:41'),(32,34,183,'/media/variants/173.jpg','2025-04-05 19:44:41','2025-04-05 19:44:41'),(32,35,183,'/media/variants/173.jpg','2025-04-05 19:44:41','2025-04-05 19:44:41'),(32,36,183,'/media/variants/173.jpg','2025-04-05 19:44:41','2025-04-05 19:44:41'),(32,39,293,'/media/variants/169.jpg','2025-04-05 19:45:08','2025-04-05 19:45:08'),(32,40,293,'/media/variants/169.jpg','2025-04-05 19:45:08','2025-04-05 19:45:08'),(32,41,293,'/media/variants/169.jpg','2025-04-05 19:45:08','2025-04-05 19:45:08'),(32,42,293,'/media/variants/169.jpg','2025-04-05 19:45:08','2025-04-05 19:45:08'),(32,43,293,'/media/variants/169.jpg','2025-04-05 19:45:08','2025-04-05 19:45:08'),(33,2,92,'/media/variants/178.jpg','2025-04-05 19:48:09','2025-04-05 19:48:09'),(33,3,92,'/media/variants/178.jpg','2025-04-05 19:48:09','2025-04-05 19:48:09'),(33,4,92,'/media/variants/178.jpg','2025-04-05 19:48:09','2025-04-05 19:48:09'),(33,5,92,'/media/variants/178.jpg','2025-04-05 19:48:09','2025-04-05 19:48:10'),(33,6,92,'/media/variants/178.jpg','2025-04-05 19:48:10','2025-04-05 19:48:10'),(33,12,156,'/media/variants/176.jpg','2025-04-05 19:48:27','2025-04-05 19:48:27'),(33,13,156,'/media/variants/176.jpg','2025-04-05 19:48:27','2025-04-05 19:48:27'),(33,14,156,'/media/variants/176.jpg','2025-04-05 19:48:27','2025-04-05 19:48:27'),(33,15,156,'/media/variants/176.jpg','2025-04-05 19:48:27','2025-04-05 19:48:27'),(33,16,156,'/media/variants/176.jpg','2025-04-05 19:48:27','2025-04-05 19:48:27'),(33,27,188,'/media/variants/177.jpg','2025-04-05 19:47:41','2025-04-05 19:47:41'),(33,28,188,'/media/variants/177.jpg','2025-04-05 19:47:41','2025-04-05 19:47:41'),(33,29,188,'/media/variants/177.jpg','2025-04-05 19:47:41','2025-04-05 19:47:41'),(33,30,188,'/media/variants/177.jpg','2025-04-05 19:47:41','2025-04-05 19:47:41'),(33,31,188,'/media/variants/177.jpg','2025-04-05 19:47:41','2025-04-05 19:47:41'),(37,22,293,'/media/variants/187.jpg','2025-04-05 19:55:07','2025-04-05 19:55:07'),(37,23,293,'/media/variants/187.jpg','2025-04-05 19:55:07','2025-04-05 19:55:07'),(37,24,293,'/media/variants/187.jpg','2025-04-05 19:55:07','2025-04-05 19:55:07'),(37,25,293,'/media/variants/187.jpg','2025-04-05 19:55:07','2025-04-05 19:55:07'),(37,26,293,'/media/variants/187.jpg','2025-04-05 19:55:07','2025-04-05 19:55:07'),(37,27,97,'/media/variants/186.jpg','2025-04-05 19:54:20','2025-04-05 19:54:20'),(37,28,97,'/media/variants/186.jpg','2025-04-05 19:54:20','2025-04-05 19:54:20'),(37,29,97,'/media/variants/186.jpg','2025-04-05 19:54:20','2025-04-05 19:54:20'),(37,30,97,'/media/variants/186.jpg','2025-04-05 19:54:20','2025-04-05 19:54:20'),(37,31,97,'/media/variants/186.jpg','2025-04-05 19:54:20','2025-04-05 19:54:20'),(37,39,92,'/media/variants/189.jpg','2025-04-05 19:54:45','2025-04-05 19:54:45'),(37,40,92,'/media/variants/189.jpg','2025-04-05 19:54:45','2025-04-05 19:54:45'),(37,41,92,'/media/variants/189.jpg','2025-04-05 19:54:45','2025-04-05 19:54:45'),(37,42,92,'/media/variants/189.jpg','2025-04-05 19:54:45','2025-04-05 19:54:45'),(37,43,92,'/media/variants/189.jpg','2025-04-05 19:54:45','2025-04-05 19:54:45'),(37,44,239,'/media/variants/188.jpg','2025-04-05 19:55:35','2025-04-05 19:55:35'),(37,45,239,'/media/variants/188.jpg','2025-04-05 19:55:35','2025-04-05 19:55:35'),(37,46,239,'/media/variants/188.jpg','2025-04-05 19:55:35','2025-04-05 19:55:35'),(37,47,239,'/media/variants/188.jpg','2025-04-05 19:55:35','2025-04-05 19:55:35'),(37,48,239,'/media/variants/188.jpg','2025-04-05 19:55:35','2025-04-05 19:55:35'),(38,2,94,'/media/variants/191.jpg','2025-04-05 19:56:37','2025-04-05 19:56:37'),(38,3,94,'/media/variants/191.jpg','2025-04-05 19:56:37','2025-04-05 19:56:37'),(38,4,94,'/media/variants/191.jpg','2025-04-05 19:56:37','2025-04-05 19:56:37'),(38,5,94,'/media/variants/191.jpg','2025-04-05 19:56:37','2025-04-05 19:56:37'),(38,6,94,'/media/variants/191.jpg','2025-04-05 19:56:37','2025-04-05 19:56:37'),(38,12,395,'/media/variants/192.jpg','2025-04-05 19:56:55','2025-04-05 19:56:55'),(38,13,395,'/media/variants/192.jpg','2025-04-05 19:56:55','2025-04-05 19:56:55'),(38,14,395,'/media/variants/192.jpg','2025-04-05 19:56:55','2025-04-05 19:56:55'),(38,15,395,'/media/variants/192.jpg','2025-04-05 19:56:55','2025-04-05 19:56:55'),(38,16,395,'/media/variants/192.jpg','2025-04-05 19:56:55','2025-04-05 19:56:55'),(39,2,294,'/media/variants/194.jpg','2025-04-05 19:58:43','2025-04-05 19:58:43'),(39,3,294,'/media/variants/194.jpg','2025-04-05 19:58:43','2025-04-05 19:58:43'),(39,4,294,'/media/variants/194.jpg','2025-04-05 19:58:43','2025-04-05 19:58:43'),(39,5,294,'/media/variants/194.jpg','2025-04-05 19:58:43','2025-04-05 19:58:43'),(39,6,294,'/media/variants/194.jpg','2025-04-05 19:58:43','2025-04-05 19:58:43'),(39,27,329,'/media/variants/195.jpg','2025-04-05 19:58:07','2025-04-05 19:58:07'),(39,28,329,'/media/variants/195.jpg','2025-04-05 19:58:07','2025-04-05 19:58:07'),(39,29,329,'/media/variants/195.jpg','2025-04-05 19:58:07','2025-04-05 19:58:07'),(39,30,329,'/media/variants/195.jpg','2025-04-05 19:58:07','2025-04-05 19:58:07'),(39,31,329,'/media/variants/195.jpg','2025-04-05 19:58:07','2025-04-05 19:58:07'),(42,2,382,'/media/variants/199.jpg','2025-04-05 20:05:35','2025-04-05 20:05:35'),(42,3,382,'/media/variants/199.jpg','2025-04-05 20:05:35','2025-04-05 20:05:35'),(42,4,382,'/media/variants/199.jpg','2025-04-05 20:05:35','2025-04-05 20:05:35'),(42,5,382,'/media/variants/199.jpg','2025-04-05 20:05:35','2025-04-05 20:05:35'),(42,6,382,'/media/variants/199.jpg','2025-04-05 20:05:35','2025-04-05 20:05:35'),(42,22,294,'/media/variants/200.jpg','2025-04-05 20:05:52','2025-04-05 20:05:52'),(42,23,294,'/media/variants/200.jpg','2025-04-05 20:05:52','2025-04-05 20:05:53'),(42,24,294,'/media/variants/200.jpg','2025-04-05 20:05:53','2025-04-05 20:05:53'),(42,25,294,'/media/variants/200.jpg','2025-04-05 20:05:53','2025-04-05 20:05:53'),(42,26,294,'/media/variants/200.jpg','2025-04-05 20:05:53','2025-04-05 20:05:53'),(42,27,97,'/media/variants/201.jpg','2025-04-05 20:05:16','2025-04-05 20:05:17'),(42,28,97,'/media/variants/201.jpg','2025-04-05 20:05:17','2025-04-05 20:05:17'),(42,29,97,'/media/variants/201.jpg','2025-04-05 20:05:17','2025-04-05 20:05:17'),(42,30,97,'/media/variants/201.jpg','2025-04-05 20:05:17','2025-04-05 20:05:17'),(42,31,97,'/media/variants/201.jpg','2025-04-05 20:05:17','2025-04-05 20:05:17'),(44,2,39,'/media/variants/206.jpg','2025-04-05 20:07:49','2025-04-05 20:07:49'),(44,3,39,'/media/variants/206.jpg','2025-04-05 20:07:49','2025-04-05 20:07:49'),(44,4,39,'/media/variants/206.jpg','2025-04-05 20:07:49','2025-04-05 20:07:49'),(44,5,39,'/media/variants/206.jpg','2025-04-05 20:07:49','2025-04-05 20:07:49'),(44,6,39,'/media/variants/206.jpg','2025-04-05 20:07:49','2025-04-05 20:07:49'),(44,7,76,'/media/variants/208.jpg','2025-04-05 20:08:11','2025-04-05 20:08:11'),(44,8,76,'/media/variants/208.jpg','2025-04-05 20:08:11','2025-04-05 20:08:11'),(44,9,76,'/media/variants/208.jpg','2025-04-05 20:08:11','2025-04-05 20:08:11'),(44,10,76,'/media/variants/208.jpg','2025-04-05 20:08:11','2025-04-05 20:08:11'),(44,11,76,'/media/variants/208.jpg','2025-04-05 20:08:11','2025-04-05 20:08:11'),(44,12,75,'/media/variants/207.jpg','2025-04-05 20:08:34','2025-04-05 20:08:34'),(44,13,75,'/media/variants/207.jpg','2025-04-05 20:08:34','2025-04-05 20:08:34'),(44,14,75,'/media/variants/207.jpg','2025-04-05 20:08:34','2025-04-05 20:08:34'),(44,15,75,'/media/variants/207.jpg','2025-04-05 20:08:34','2025-04-05 20:08:34'),(44,16,75,'/media/variants/207.jpg','2025-04-05 20:08:34','2025-04-05 20:08:34'),(44,22,76,'/media/variants/203.jpg','2025-04-05 20:08:47','2025-04-05 20:08:47'),(44,23,76,'/media/variants/203.jpg','2025-04-05 20:08:47','2025-04-05 20:08:47'),(44,24,76,'/media/variants/203.jpg','2025-04-05 20:08:47','2025-04-05 20:08:47'),(44,25,76,'/media/variants/203.jpg','2025-04-05 20:08:47','2025-04-05 20:08:47'),(44,26,76,'/media/variants/203.jpg','2025-04-05 20:08:47','2025-04-05 20:08:47'),(44,32,49,'/media/variants/205.jpg','2025-04-05 20:07:31','2025-04-05 20:07:31'),(44,33,49,'/media/variants/205.jpg','2025-04-05 20:07:31','2025-04-05 20:07:31'),(44,34,49,'/media/variants/205.jpg','2025-04-05 20:07:31','2025-04-05 20:07:31'),(44,35,49,'/media/variants/205.jpg','2025-04-05 20:07:31','2025-04-05 20:07:31'),(44,36,49,'/media/variants/205.jpg','2025-04-05 20:07:31','2025-04-05 20:07:31'),(46,2,85,'/media/variants/211.jpg','2025-04-05 20:13:39','2025-04-05 20:13:39'),(46,3,85,'/media/variants/211.jpg','2025-04-05 20:13:39','2025-04-05 20:13:39'),(46,4,85,'/media/variants/211.jpg','2025-04-05 20:13:39','2025-04-05 20:13:39'),(46,5,85,'/media/variants/211.jpg','2025-04-05 20:13:39','2025-04-05 20:13:39'),(46,6,85,'/media/variants/211.jpg','2025-04-05 20:13:39','2025-04-05 20:13:39'),(46,7,120,'/media/variants/213.jpg','2025-04-05 20:13:59','2025-04-05 20:13:59'),(46,8,120,'/media/variants/213.jpg','2025-04-05 20:13:59','2025-04-05 20:13:59'),(46,9,120,'/media/variants/213.jpg','2025-04-05 20:13:59','2025-04-05 20:13:59'),(46,10,120,'/media/variants/213.jpg','2025-04-05 20:13:59','2025-04-05 20:13:59'),(46,11,120,'/media/variants/213.jpg','2025-04-05 20:13:59','2025-04-05 20:13:59'),(46,12,97,'/media/variants/212.jpg','2025-04-05 20:14:14','2025-04-05 20:14:14'),(46,13,97,'/media/variants/212.jpg','2025-04-05 20:14:14','2025-04-05 20:14:15'),(46,14,97,'/media/variants/212.jpg','2025-04-05 20:14:15','2025-04-05 20:14:15'),(46,15,97,'/media/variants/212.jpg','2025-04-05 20:14:15','2025-04-05 20:14:15'),(46,16,97,'/media/variants/212.jpg','2025-04-05 20:14:14','2025-04-05 20:14:14'),(46,27,95,'/media/variants/214.jpg','2025-04-05 20:10:28','2025-04-05 20:10:28'),(46,28,95,'/media/variants/214.jpg','2025-04-05 20:10:28','2025-04-05 20:10:28'),(46,29,95,'/media/variants/214.jpg','2025-04-05 20:10:28','2025-04-05 20:10:28'),(46,30,95,'/media/variants/214.jpg','2025-04-05 20:10:28','2025-04-05 20:10:28'),(46,31,95,'/media/variants/214.jpg','2025-04-05 20:10:28','2025-04-05 20:10:28'),(46,37,95,'/media/variants/214.jpg','2025-04-05 20:10:28','2025-04-05 20:10:28'),(46,49,85,'/media/variants/211.jpg','2025-04-05 20:13:39','2025-04-05 20:13:39'),(46,50,120,'/media/variants/213.jpg','2025-04-05 20:13:59','2025-04-05 20:13:59'),(46,51,97,'/media/variants/212.jpg','2025-04-05 20:14:14','2025-04-05 20:14:14'),(47,12,120,'/media/variants/217.jpg','2025-04-05 20:15:07','2025-04-05 20:15:07'),(47,13,120,'/media/variants/217.jpg','2025-04-05 20:15:07','2025-04-05 20:15:07'),(47,14,120,'/media/variants/217.jpg','2025-04-05 20:15:07','2025-04-05 20:15:07'),(47,15,120,'/media/variants/217.jpg','2025-04-05 20:15:07','2025-04-05 20:15:07'),(47,16,120,'/media/variants/217.jpg','2025-04-05 20:15:07','2025-04-05 20:15:07'),(47,17,48,'/media/variants/216.jpg','2025-04-05 20:15:27','2025-04-05 20:15:27'),(47,18,48,'/media/variants/216.jpg','2025-04-05 20:15:27','2025-04-05 20:15:27'),(47,19,48,'/media/variants/216.jpg','2025-04-05 20:15:27','2025-04-05 20:15:27'),(47,20,48,'/media/variants/216.jpg','2025-04-05 20:15:27','2025-04-05 20:15:27'),(47,21,48,'/media/variants/216.jpg','2025-04-05 20:15:27','2025-04-05 20:15:27'),(49,7,97,'/media/variants/221.jpg','2025-04-05 20:17:04','2025-04-05 20:17:04'),(49,8,97,'/media/variants/221.jpg','2025-04-05 20:17:04','2025-04-05 20:17:04'),(49,9,97,'/media/variants/221.jpg','2025-04-05 20:17:04','2025-04-05 20:17:04'),(49,10,97,'/media/variants/221.jpg','2025-04-05 20:17:04','2025-04-05 20:17:04'),(49,11,97,'/media/variants/221.jpg','2025-04-05 20:17:04','2025-04-05 20:17:04'),(49,12,47,'/media/variants/220.jpg','2025-04-05 20:17:18','2025-04-05 20:17:18'),(49,13,47,'/media/variants/220.jpg','2025-04-05 20:17:18','2025-04-05 20:17:18'),(49,14,47,'/media/variants/220.jpg','2025-04-05 20:17:18','2025-04-05 20:17:18'),(49,15,47,'/media/variants/220.jpg','2025-04-05 20:17:18','2025-04-05 20:17:18'),(49,16,47,'/media/variants/220.jpg','2025-04-05 20:17:18','2025-04-05 20:17:18'),(51,2,92,'/media/variants/234.jpg','2025-04-05 20:22:20','2025-04-05 20:22:20'),(51,3,92,'/media/variants/234.jpg','2025-04-05 20:22:20','2025-04-05 20:22:20'),(51,4,92,'/media/variants/234.jpg','2025-04-05 20:22:20','2025-04-05 20:22:20'),(51,5,92,'/media/variants/234.jpg','2025-04-05 20:22:20','2025-04-05 20:22:20'),(51,6,92,'/media/variants/234.jpg','2025-04-05 20:22:20','2025-04-05 20:22:20'),(51,12,57,'/media/variants/233.jpg','2025-04-05 20:22:36','2025-04-05 20:22:36'),(51,13,57,'/media/variants/233.jpg','2025-04-05 20:22:36','2025-04-05 20:22:36'),(51,14,57,'/media/variants/233.jpg','2025-04-05 20:22:36','2025-04-05 20:22:36'),(51,15,57,'/media/variants/233.jpg','2025-04-05 20:22:36','2025-04-05 20:22:36'),(51,16,57,'/media/variants/233.jpg','2025-04-05 20:22:36','2025-04-05 20:22:36'),(51,22,78,'/media/variants/234_c0d9e8d0.jpg','2025-04-05 20:22:53','2025-04-05 20:22:53'),(51,23,78,'/media/variants/234_c0d9e8d0.jpg','2025-04-05 20:22:53','2025-04-05 20:22:53'),(51,24,78,'/media/variants/234_c0d9e8d0.jpg','2025-04-05 20:22:53','2025-04-05 20:22:53'),(51,25,78,'/media/variants/234_c0d9e8d0.jpg','2025-04-05 20:22:53','2025-04-05 20:22:54'),(51,26,78,'/media/variants/234_c0d9e8d0.jpg','2025-04-05 20:22:54','2025-04-05 20:22:54'),(51,27,95,'/media/variants/235.jpg','2025-04-05 20:21:55','2025-04-05 20:21:55'),(51,28,95,'/media/variants/235.jpg','2025-04-05 20:21:55','2025-04-05 20:21:55'),(51,29,95,'/media/variants/235.jpg','2025-04-05 20:21:55','2025-04-05 20:21:55'),(51,30,95,'/media/variants/235.jpg','2025-04-05 20:21:55','2025-04-05 20:21:55'),(51,31,95,'/media/variants/235.jpg','2025-04-05 20:21:55','2025-04-05 20:21:55'),(52,7,85,'/media/variants/238.jpg','2025-04-05 20:25:02','2025-04-05 20:25:02'),(52,8,85,'/media/variants/238.jpg','2025-04-05 20:25:02','2025-04-05 20:25:02'),(52,9,85,'/media/variants/238.jpg','2025-04-05 20:25:02','2025-04-05 20:25:02'),(52,10,85,'/media/variants/238.jpg','2025-04-05 20:25:02','2025-04-05 20:25:02'),(52,11,85,'/media/variants/238.jpg','2025-04-05 20:25:02','2025-04-05 20:25:02'),(52,12,58,'/media/variants/239.jpg','2025-04-05 20:25:21','2025-04-05 20:25:21'),(52,13,58,'/media/variants/239.jpg','2025-04-05 20:25:21','2025-04-05 20:25:21'),(52,14,58,'/media/variants/239.jpg','2025-04-05 20:25:21','2025-04-05 20:25:21'),(52,15,58,'/media/variants/239.jpg','2025-04-05 20:25:21','2025-04-05 20:25:21'),(52,16,58,'/media/variants/239.jpg','2025-04-05 20:25:21','2025-04-05 20:25:21'),(52,39,69,'/media/variants/240.jpg','2025-04-05 20:24:42','2025-04-05 20:24:42'),(52,40,69,'/media/variants/240.jpg','2025-04-05 20:24:42','2025-04-05 20:24:42'),(52,41,69,'/media/variants/240.jpg','2025-04-05 20:24:42','2025-04-05 20:24:42'),(52,42,69,'/media/variants/240.jpg','2025-04-05 20:24:42','2025-04-05 20:24:42'),(52,43,69,'/media/variants/240.jpg','2025-04-05 20:24:42','2025-04-05 20:24:42'),(54,7,49,'/media/variants/243.jpg','2025-04-05 20:27:06','2025-04-05 20:27:06'),(54,8,49,'/media/variants/243.jpg','2025-04-05 20:27:06','2025-04-05 20:27:06'),(54,9,49,'/media/variants/243.jpg','2025-04-05 20:27:06','2025-04-05 20:27:06'),(54,10,49,'/media/variants/243.jpg','2025-04-05 20:27:06','2025-04-05 20:27:06'),(54,11,49,'/media/variants/243.jpg','2025-04-05 20:27:06','2025-04-05 20:27:06'),(54,12,77,'/media/variants/244.jpg','2025-04-05 20:27:19','2025-04-05 20:27:19'),(54,13,77,'/media/variants/244.jpg','2025-04-05 20:27:19','2025-04-05 20:27:19'),(54,14,77,'/media/variants/244.jpg','2025-04-05 20:27:19','2025-04-05 20:27:19'),(54,15,77,'/media/variants/244.jpg','2025-04-05 20:27:19','2025-04-05 20:27:19'),(54,16,77,'/media/variants/244.jpg','2025-04-05 20:27:19','2025-04-05 20:27:19'),(54,27,67,'/media/variants/245.jpg','2025-04-05 20:26:50','2025-04-05 20:26:50'),(54,28,67,'/media/variants/245.jpg','2025-04-05 20:26:50','2025-04-05 20:26:50'),(54,29,67,'/media/variants/245.jpg','2025-04-05 20:26:50','2025-04-05 20:26:50'),(54,30,67,'/media/variants/245.jpg','2025-04-05 20:26:50','2025-04-05 20:26:50'),(54,31,67,'/media/variants/245.jpg','2025-04-05 20:26:50','2025-04-05 20:26:50'),(54,37,67,'/media/variants/245.jpg','2025-04-05 20:26:50','2025-04-05 20:26:50'),(54,50,49,'/media/variants/243.jpg','2025-04-05 20:27:05','2025-04-05 20:27:06'),(54,51,77,'/media/variants/244.jpg','2025-04-05 20:27:19','2025-04-05 20:27:19'),(55,2,97,'/media/variants/248.jpg','2025-04-05 20:29:19','2025-04-05 20:29:19'),(55,3,97,'/media/variants/248.jpg','2025-04-05 20:29:19','2025-04-05 20:29:19'),(55,4,97,'/media/variants/248.jpg','2025-04-05 20:29:19','2025-04-05 20:29:19'),(55,5,97,'/media/variants/248.jpg','2025-04-05 20:29:19','2025-04-05 20:29:19'),(55,6,97,'/media/variants/248.jpg','2025-04-05 20:29:19','2025-04-05 20:29:19'),(55,7,66,'/media/variants/249.jpg','2025-04-05 20:29:40','2025-04-05 20:29:40'),(55,8,66,'/media/variants/249.jpg','2025-04-05 20:29:40','2025-04-05 20:29:40'),(55,9,66,'/media/variants/249.jpg','2025-04-05 20:29:40','2025-04-05 20:29:40'),(55,10,66,'/media/variants/249.jpg','2025-04-05 20:29:40','2025-04-05 20:29:40'),(55,11,66,'/media/variants/249.jpg','2025-04-05 20:29:40','2025-04-05 20:29:41'),(55,12,56,'/media/variants/247.jpg','2025-04-05 20:29:52','2025-04-05 20:29:52'),(55,13,56,'/media/variants/247.jpg','2025-04-05 20:29:52','2025-04-05 20:29:52'),(55,14,56,'/media/variants/247.jpg','2025-04-05 20:29:52','2025-04-05 20:29:52'),(55,15,56,'/media/variants/247.jpg','2025-04-05 20:29:52','2025-04-05 20:29:52'),(55,16,56,'/media/variants/247.jpg','2025-04-05 20:29:52','2025-04-05 20:29:52'),(55,22,44,'/media/variants/250.jpg','2025-04-05 20:30:04','2025-04-05 20:30:04'),(55,23,44,'/media/variants/250.jpg','2025-04-05 20:30:04','2025-04-05 20:30:04'),(55,24,44,'/media/variants/250.jpg','2025-04-05 20:30:04','2025-04-05 20:30:04'),(55,25,44,'/media/variants/250.jpg','2025-04-05 20:30:04','2025-04-05 20:30:04'),(55,26,44,'/media/variants/250.jpg','2025-04-05 20:30:04','2025-04-05 20:30:04'),(55,32,86,'/media/variants/251.jpg','2025-04-05 20:28:58','2025-04-05 20:28:58'),(55,33,86,'/media/variants/251.jpg','2025-04-05 20:28:58','2025-04-05 20:28:58'),(55,34,86,'/media/variants/251.jpg','2025-04-05 20:28:58','2025-04-05 20:28:58'),(55,35,86,'/media/variants/251.jpg','2025-04-05 20:28:58','2025-04-05 20:28:58'),(55,36,86,'/media/variants/251.jpg','2025-04-05 20:28:58','2025-04-05 20:28:58'),(55,38,86,'/media/variants/251.jpg','2025-04-05 20:28:58','2025-04-05 20:28:58'),(55,49,97,'/media/variants/248.jpg','2025-04-05 20:29:19','2025-04-05 20:29:19'),(55,50,66,'/media/variants/249.jpg','2025-04-05 20:29:40','2025-04-05 20:29:40'),(55,51,56,'/media/variants/247.jpg','2025-04-05 20:29:52','2025-04-05 20:29:52'),(55,52,44,'/media/variants/250.jpg','2025-04-05 20:30:04','2025-04-05 20:30:04'),(56,53,92,'/media/variants/253.jpg','2025-04-05 20:31:17','2025-04-05 20:31:17'),(56,54,92,'/media/variants/253.jpg','2025-04-05 20:31:17','2025-04-05 20:31:17'),(56,55,92,'/media/variants/253.jpg','2025-04-05 20:31:17','2025-04-05 20:31:17'),(56,56,92,'/media/variants/253.jpg','2025-04-05 20:31:17','2025-04-05 20:31:17'),(56,57,92,'/media/variants/253.jpg','2025-04-05 20:31:17','2025-04-05 20:31:17'),(56,58,92,'/media/variants/253.jpg','2025-04-05 20:31:17','2025-04-05 20:31:17'),(56,59,103,'/media/variants/254.jpg','2025-04-05 20:31:39','2025-04-05 20:31:39'),(56,60,103,'/media/variants/254.jpg','2025-04-05 20:31:39','2025-04-05 20:31:39'),(56,61,103,'/media/variants/254.jpg','2025-04-05 20:31:39','2025-04-05 20:31:39'),(56,62,103,'/media/variants/254.jpg','2025-04-05 20:31:39','2025-04-05 20:31:39'),(56,63,103,'/media/variants/254.jpg','2025-04-05 20:31:39','2025-04-05 20:31:39'),(56,64,103,'/media/variants/254.jpg','2025-04-05 20:31:39','2025-04-05 20:31:39'),(56,65,96,'/media/variants/255.jpg','2025-04-05 20:31:52','2025-04-05 20:31:52'),(56,66,96,'/media/variants/255.jpg','2025-04-05 20:31:52','2025-04-05 20:31:52'),(56,67,96,'/media/variants/255.jpg','2025-04-05 20:31:52','2025-04-05 20:31:52'),(56,68,96,'/media/variants/255.jpg','2025-04-05 20:31:52','2025-04-05 20:31:52'),(56,69,96,'/media/variants/255.jpg','2025-04-05 20:31:52','2025-04-05 20:31:52'),(56,70,96,'/media/variants/255.jpg','2025-04-05 20:31:52','2025-04-05 20:31:52'),(57,53,97,'/media/variants/257.jpg','2025-04-05 20:33:13','2025-04-05 20:33:13'),(57,54,97,'/media/variants/257.jpg','2025-04-05 20:33:13','2025-04-05 20:33:13'),(57,55,97,'/media/variants/257.jpg','2025-04-05 20:33:13','2025-04-05 20:33:13'),(57,56,97,'/media/variants/257.jpg','2025-04-05 20:33:13','2025-04-05 20:33:13'),(57,57,97,'/media/variants/257.jpg','2025-04-05 20:33:13','2025-04-05 20:33:13'),(57,58,97,'/media/variants/257.jpg','2025-04-05 20:33:13','2025-04-05 20:33:13'),(57,71,56,'/media/variants/258_9aa5d047.jpg','2025-04-05 20:33:56','2025-04-05 20:33:56'),(57,72,56,'/media/variants/258_9aa5d047.jpg','2025-04-05 20:33:56','2025-04-05 20:33:56'),(57,73,56,'/media/variants/258_9aa5d047.jpg','2025-04-05 20:33:56','2025-04-05 20:33:56'),(57,74,56,'/media/variants/258_9aa5d047.jpg','2025-04-05 20:33:56','2025-04-05 20:33:56'),(57,75,56,'/media/variants/258_9aa5d047.jpg','2025-04-05 20:33:56','2025-04-05 20:33:56'),(57,76,56,'/media/variants/258_9aa5d047.jpg','2025-04-05 20:33:56','2025-04-05 20:33:56'),(60,53,120,'/media/variants/264.jpg','2025-04-05 21:01:41','2025-04-05 21:01:41'),(60,54,120,'/media/variants/264.jpg','2025-04-05 21:01:41','2025-04-05 21:01:41'),(60,55,120,'/media/variants/264.jpg','2025-04-05 21:01:41','2025-04-05 21:01:41'),(60,56,120,'/media/variants/264.jpg','2025-04-05 21:01:41','2025-04-05 21:01:41'),(60,57,120,'/media/variants/264.jpg','2025-04-05 21:01:41','2025-04-05 21:01:41'),(60,58,120,'/media/variants/264.jpg','2025-04-05 21:01:41','2025-04-05 21:01:41'),(60,71,85,'/media/variants/265.jpg','2025-04-05 21:01:54','2025-04-05 21:01:54'),(60,72,85,'/media/variants/265.jpg','2025-04-05 21:01:54','2025-04-05 21:01:54'),(60,73,85,'/media/variants/265.jpg','2025-04-05 21:01:54','2025-04-05 21:01:54'),(60,74,85,'/media/variants/265.jpg','2025-04-05 21:01:54','2025-04-05 21:01:54'),(60,75,85,'/media/variants/265.jpg','2025-04-05 21:01:54','2025-04-05 21:01:54'),(60,76,85,'/media/variants/265.jpg','2025-04-05 21:01:54','2025-04-05 21:01:54'),(61,53,44,'/media/variants/270.jpg','2025-04-05 21:02:37','2025-04-05 21:02:37'),(61,54,44,'/media/variants/270.jpg','2025-04-05 21:02:37','2025-04-05 21:02:38'),(61,55,44,'/media/variants/270.jpg','2025-04-05 21:02:38','2025-04-05 21:02:38'),(61,56,44,'/media/variants/270.jpg','2025-04-05 21:02:38','2025-04-05 21:02:38'),(61,57,44,'/media/variants/270.jpg','2025-04-05 21:02:38','2025-04-05 21:02:38'),(61,58,44,'/media/variants/270.jpg','2025-04-05 21:02:38','2025-04-05 21:02:38'),(61,65,55,'/media/variants/269.jpg','2025-04-05 21:03:19','2025-04-05 21:03:19'),(61,66,55,'/media/variants/269.jpg','2025-04-05 21:03:19','2025-04-05 21:03:19'),(61,67,55,'/media/variants/269.jpg','2025-04-05 21:03:19','2025-04-05 21:03:19'),(61,68,55,'/media/variants/269.jpg','2025-04-05 21:03:19','2025-04-05 21:03:19'),(61,69,55,'/media/variants/269.jpg','2025-04-05 21:03:19','2025-04-05 21:03:19'),(61,70,55,'/media/variants/269.jpg','2025-04-05 21:03:19','2025-04-05 21:03:19'),(61,71,64,'/media/variants/268.jpg','2025-04-05 21:03:07','2025-04-05 21:03:07'),(61,72,64,'/media/variants/268.jpg','2025-04-05 21:03:07','2025-04-05 21:03:07'),(61,73,64,'/media/variants/268.jpg','2025-04-05 21:03:07','2025-04-05 21:03:07'),(61,74,64,'/media/variants/268.jpg','2025-04-05 21:03:07','2025-04-05 21:03:07'),(61,75,64,'/media/variants/268.jpg','2025-04-05 21:03:07','2025-04-05 21:03:07'),(61,76,64,'/media/variants/268.jpg','2025-04-05 21:03:07','2025-04-05 21:03:07'),(61,77,45,'/media/variants/267.jpg','2025-04-05 21:02:52','2025-04-05 21:02:52'),(61,78,45,'/media/variants/267.jpg','2025-04-05 21:02:52','2025-04-05 21:02:52'),(61,79,45,'/media/variants/267.jpg','2025-04-05 21:02:52','2025-04-05 21:02:52'),(61,80,45,'/media/variants/267.jpg','2025-04-05 21:02:52','2025-04-05 21:02:52'),(61,81,45,'/media/variants/267.jpg','2025-04-05 21:02:52','2025-04-05 21:02:52'),(61,82,45,'/media/variants/267.jpg','2025-04-05 21:02:52','2025-04-05 21:02:52'),(61,83,85,'/media/variants/271.jpg','2025-04-05 21:03:30','2025-04-05 21:03:30'),(61,84,85,'/media/variants/271.jpg','2025-04-05 21:03:30','2025-04-05 21:03:30'),(61,85,85,'/media/variants/271.jpg','2025-04-05 21:03:30','2025-04-05 21:03:30'),(61,86,85,'/media/variants/271.jpg','2025-04-05 21:03:30','2025-04-05 21:03:30'),(61,87,85,'/media/variants/271.jpg','2025-04-05 21:03:30','2025-04-05 21:03:30'),(61,88,85,'/media/variants/271.jpg','2025-04-05 21:03:30','2025-04-05 21:03:30'),(62,53,82,'/media/variants/275.jpg','2025-04-05 21:04:24','2025-04-05 21:04:24'),(62,54,82,'/media/variants/275.jpg','2025-04-05 21:04:24','2025-04-05 21:04:25'),(62,55,82,'/media/variants/275.jpg','2025-04-05 21:04:25','2025-04-05 21:04:25'),(62,56,82,'/media/variants/275.jpg','2025-04-05 21:04:25','2025-04-05 21:04:25'),(62,57,82,'/media/variants/275.jpg','2025-04-05 21:04:25','2025-04-05 21:04:25'),(62,58,82,'/media/variants/275.jpg','2025-04-05 21:04:25','2025-04-05 21:04:25'),(62,71,44,'/media/variants/274.jpg','2025-04-05 21:04:49','2025-04-05 21:04:49'),(62,72,44,'/media/variants/274.jpg','2025-04-05 21:04:49','2025-04-05 21:04:49'),(62,73,44,'/media/variants/274.jpg','2025-04-05 21:04:49','2025-04-05 21:04:49'),(62,74,44,'/media/variants/274.jpg','2025-04-05 21:04:49','2025-04-05 21:04:49'),(62,75,44,'/media/variants/274.jpg','2025-04-05 21:04:49','2025-04-05 21:04:49'),(62,76,44,'/media/variants/274.jpg','2025-04-05 21:04:49','2025-04-05 21:04:49'),(62,77,42,'/media/variants/273.jpg','2025-04-05 21:04:38','2025-04-05 21:04:38'),(62,78,42,'/media/variants/273.jpg','2025-04-05 21:04:38','2025-04-05 21:04:38'),(62,79,42,'/media/variants/273.jpg','2025-04-05 21:04:38','2025-04-05 21:04:38'),(62,80,42,'/media/variants/273.jpg','2025-04-05 21:04:38','2025-04-05 21:04:38'),(62,81,42,'/media/variants/273.jpg','2025-04-05 21:04:38','2025-04-05 21:04:38'),(62,82,42,'/media/variants/273.jpg','2025-04-05 21:04:38','2025-04-05 21:04:38'),(64,65,54,'/media/variants/278.jpg','2025-04-05 21:06:37','2025-04-05 21:06:37'),(64,66,54,'/media/variants/278.jpg','2025-04-05 21:06:37','2025-04-05 21:06:37'),(64,67,54,'/media/variants/278.jpg','2025-04-05 21:06:37','2025-04-05 21:06:37'),(64,68,54,'/media/variants/278.jpg','2025-04-05 21:06:37','2025-04-05 21:06:38'),(64,69,54,'/media/variants/278.jpg','2025-04-05 21:06:38','2025-04-05 21:06:38'),(64,70,54,'/media/variants/278.jpg','2025-04-05 21:06:38','2025-04-05 21:06:38'),(64,71,84,'/media/variants/279.jpg','2025-04-05 21:06:25','2025-04-05 21:06:26'),(64,72,84,'/media/variants/279.jpg','2025-04-05 21:06:26','2025-04-05 21:06:26'),(64,73,84,'/media/variants/279.jpg','2025-04-05 21:06:26','2025-04-05 21:06:26'),(64,74,84,'/media/variants/279.jpg','2025-04-05 21:06:26','2025-04-05 21:06:26'),(64,75,84,'/media/variants/279.jpg','2025-04-05 21:06:26','2025-04-05 21:06:26'),(64,76,84,'/media/variants/279.jpg','2025-04-05 21:06:26','2025-04-05 21:06:26'),(64,77,95,'/media/variants/280.jpg','2025-04-05 21:06:11','2025-04-05 21:06:11'),(64,78,95,'/media/variants/280.jpg','2025-04-05 21:06:11','2025-04-05 21:06:11'),(64,79,95,'/media/variants/280.jpg','2025-04-05 21:06:11','2025-04-05 21:06:11'),(64,80,95,'/media/variants/280.jpg','2025-04-05 21:06:11','2025-04-05 21:06:11'),(64,81,95,'/media/variants/280.jpg','2025-04-05 21:06:11','2025-04-05 21:06:11'),(64,82,95,'/media/variants/280.jpg','2025-04-05 21:06:11','2025-04-05 21:06:11'),(64,83,85,'/media/variants/281.jpg','2025-04-05 21:06:48','2025-04-05 21:06:48'),(64,84,85,'/media/variants/281.jpg','2025-04-05 21:06:48','2025-04-05 21:06:48'),(64,85,85,'/media/variants/281.jpg','2025-04-05 21:06:48','2025-04-05 21:06:48'),(64,86,85,'/media/variants/281.jpg','2025-04-05 21:06:48','2025-04-05 21:06:48'),(64,87,85,'/media/variants/281.jpg','2025-04-05 21:06:48','2025-04-05 21:06:48'),(64,88,85,'/media/variants/281.jpg','2025-04-05 21:06:48','2025-04-05 21:06:48'),(66,2,95,'/media/variants/284.jpg','2025-04-05 21:08:26','2025-04-05 21:08:26'),(66,3,95,'/media/variants/284.jpg','2025-04-05 21:08:26','2025-04-05 21:08:26'),(66,4,95,'/media/variants/284.jpg','2025-04-05 21:08:26','2025-04-05 21:08:26'),(66,5,95,'/media/variants/284.jpg','2025-04-05 21:08:26','2025-04-05 21:08:26'),(66,6,95,'/media/variants/284.jpg','2025-04-05 21:08:26','2025-04-05 21:08:26'),(66,12,95,'/media/variants/285.jpg','2025-04-05 21:08:37','2025-04-05 21:08:37'),(66,13,95,'/media/variants/285.jpg','2025-04-05 21:08:37','2025-04-05 21:08:37'),(66,14,95,'/media/variants/285.jpg','2025-04-05 21:08:37','2025-04-05 21:08:37'),(66,15,95,'/media/variants/285.jpg','2025-04-05 21:08:37','2025-04-05 21:08:37'),(66,16,95,'/media/variants/285.jpg','2025-04-05 21:08:37','2025-04-05 21:08:37'),(66,49,95,'/media/variants/284.jpg','2025-04-05 21:08:26','2025-04-05 21:08:26'),(66,51,95,'/media/variants/285.jpg','2025-04-05 21:08:37','2025-04-05 21:08:37'),(69,53,58,'/media/variants/289.jpg','2025-04-05 21:10:48','2025-04-05 21:10:48'),(69,54,58,'/media/variants/289.jpg','2025-04-05 21:10:48','2025-04-05 21:10:48'),(69,55,58,'/media/variants/289.jpg','2025-04-05 21:10:48','2025-04-05 21:10:48'),(69,56,58,'/media/variants/289.jpg','2025-04-05 21:10:48','2025-04-05 21:10:48'),(69,57,58,'/media/variants/289.jpg','2025-04-05 21:10:48','2025-04-05 21:10:48'),(69,58,58,'/media/variants/289.jpg','2025-04-05 21:10:48','2025-04-05 21:10:49'),(69,71,95,'/media/variants/290.jpg','2025-04-05 21:11:04','2025-04-05 21:11:04'),(69,72,95,'/media/variants/290.jpg','2025-04-05 21:11:04','2025-04-05 21:11:04'),(69,73,95,'/media/variants/290.jpg','2025-04-05 21:11:04','2025-04-05 21:11:04'),(69,74,95,'/media/variants/290.jpg','2025-04-05 21:11:04','2025-04-05 21:11:04'),(69,75,95,'/media/variants/290.jpg','2025-04-05 21:11:04','2025-04-05 21:11:04'),(69,76,95,'/media/variants/290.jpg','2025-04-05 21:11:04','2025-04-05 21:11:04'),(69,89,58,'/media/variants/289.jpg','2025-04-05 21:10:49','2025-04-05 21:10:49'),(69,90,95,'/media/variants/290.jpg','2025-04-05 21:11:04','2025-04-05 21:11:04'),(72,3,45,'/media/variants/296.jpg','2025-04-05 21:14:11','2025-04-05 21:14:11'),(72,4,45,'/media/variants/296.jpg','2025-04-05 21:14:11','2025-04-05 21:14:11'),(72,5,45,'/media/variants/296.jpg','2025-04-05 21:14:11','2025-04-05 21:14:11'),(72,6,45,'/media/variants/296.jpg','2025-04-05 21:14:11','2025-04-05 21:14:11'),(72,12,55,'/media/variants/297.jpg','2025-04-05 21:14:24','2025-04-05 21:14:24'),(72,13,55,'/media/variants/297.jpg','2025-04-05 21:14:24','2025-04-05 21:14:24'),(72,14,55,'/media/variants/297.jpg','2025-04-05 21:14:24','2025-04-05 21:14:24'),(72,15,55,'/media/variants/297.jpg','2025-04-05 21:14:24','2025-04-05 21:14:24'),(72,16,55,'/media/variants/297.jpg','2025-04-05 21:14:24','2025-04-05 21:14:24'),(72,49,45,'/media/variants/296.jpg','2025-04-05 21:14:11','2025-04-05 21:14:11'),(72,51,55,'/media/variants/297.jpg','2025-04-05 21:14:24','2025-04-05 21:14:24'),(73,2,94,'/media/variants/299.jpg','2025-04-05 21:15:23','2025-04-05 21:15:23'),(73,3,94,'/media/variants/299.jpg','2025-04-05 21:15:23','2025-04-05 21:15:23'),(73,4,94,'/media/variants/299.jpg','2025-04-05 21:15:23','2025-04-05 21:15:23'),(73,5,94,'/media/variants/299.jpg','2025-04-05 21:15:23','2025-04-05 21:15:23'),(73,6,94,'/media/variants/299.jpg','2025-04-05 21:15:23','2025-04-05 21:15:23'),(73,22,98,'/media/variants/300.jpg','2025-04-05 21:15:41','2025-04-05 21:15:41'),(73,23,98,'/media/variants/300.jpg','2025-04-05 21:15:41','2025-04-05 21:15:41'),(73,24,98,'/media/variants/300.jpg','2025-04-05 21:15:41','2025-04-05 21:15:41'),(73,25,98,'/media/variants/300.jpg','2025-04-05 21:15:41','2025-04-05 21:15:41'),(73,26,98,'/media/variants/300.jpg','2025-04-05 21:15:41','2025-04-05 21:15:41'),(75,7,98,'/media/variants/303.jpg','2025-04-05 21:17:13','2025-04-05 21:17:13'),(75,8,98,'/media/variants/303.jpg','2025-04-05 21:17:13','2025-04-05 21:17:13'),(75,9,98,'/media/variants/303.jpg','2025-04-05 21:17:13','2025-04-05 21:17:13'),(75,10,98,'/media/variants/303.jpg','2025-04-05 21:17:13','2025-04-05 21:17:13'),(75,11,98,'/media/variants/303.jpg','2025-04-05 21:17:13','2025-04-05 21:17:14'),(75,12,93,'/media/variants/304.jpg','2025-04-05 21:17:30','2025-04-05 21:17:30'),(75,13,93,'/media/variants/304.jpg','2025-04-05 21:17:30','2025-04-05 21:17:30'),(75,14,93,'/media/variants/304.jpg','2025-04-05 21:17:30','2025-04-05 21:17:30'),(75,15,93,'/media/variants/304.jpg','2025-04-05 21:17:30','2025-04-05 21:17:30'),(76,91,85,'/media/variants/307.jpg','2025-04-05 21:18:49','2025-04-05 21:18:49'),(76,92,85,'/media/variants/307.jpg','2025-04-05 21:18:49','2025-04-05 21:18:49'),(76,93,85,'/media/variants/307.jpg','2025-04-05 21:18:49','2025-04-05 21:18:49'),(76,94,95,'/media/variants/306.jpg','2025-04-05 21:19:02','2025-04-05 21:19:02'),(76,95,95,'/media/variants/306.jpg','2025-04-05 21:19:02','2025-04-05 21:19:02'),(76,96,95,'/media/variants/306.jpg','2025-04-05 21:19:02','2025-04-05 21:19:02'),(78,94,84,'/media/variants/311.jpg','2025-04-05 21:20:29','2025-04-05 21:20:29'),(78,95,84,'/media/variants/311.jpg','2025-04-05 21:20:29','2025-04-05 21:20:29'),(78,96,84,'/media/variants/311.jpg','2025-04-05 21:20:29','2025-04-05 21:20:29'),(78,97,84,'/media/variants/310.jpg','2025-04-05 21:20:43','2025-04-05 21:20:43'),(78,98,84,'/media/variants/310.jpg','2025-04-05 21:20:43','2025-04-05 21:20:43'),(78,99,84,'/media/variants/310.jpg','2025-04-05 21:20:43','2025-04-05 21:20:43'),(81,100,83,'/media/variants/315.jpg','2025-04-05 21:22:51','2025-04-05 21:22:51'),(81,101,83,'/media/variants/315.jpg','2025-04-05 21:22:51','2025-04-05 21:22:51'),(81,102,83,'/media/variants/315.jpg','2025-04-05 21:22:51','2025-04-05 21:22:51'),(81,103,98,'/media/variants/316.jpg','2025-04-05 21:23:09','2025-04-05 21:23:09'),(81,104,98,'/media/variants/316.jpg','2025-04-05 21:23:09','2025-04-05 21:23:09'),(81,105,98,'/media/variants/316.jpg','2025-04-05 21:23:09','2025-04-05 21:23:09'),(82,94,29,'/media/variants/318.jpg','2025-04-05 21:24:23','2025-04-05 21:24:23'),(82,95,29,'/media/variants/318.jpg','2025-04-05 21:24:23','2025-04-05 21:24:23'),(82,96,29,'/media/variants/318.jpg','2025-04-05 21:24:23','2025-04-05 21:24:23'),(82,100,37,'/media/variants/319.jpg','2025-04-05 21:24:05','2025-04-05 21:24:05'),(82,101,37,'/media/variants/319.jpg','2025-04-05 21:24:05','2025-04-05 21:24:05'),(82,102,37,'/media/variants/319.jpg','2025-04-05 21:24:05','2025-04-05 21:24:05'),(83,94,84,'/media/variants/322.jpg','2025-04-05 21:25:53','2025-04-05 21:25:53'),(83,95,84,'/media/variants/322.jpg','2025-04-05 21:25:53','2025-04-05 21:25:53'),(83,96,84,'/media/variants/322.jpg','2025-04-05 21:25:53','2025-04-05 21:25:53'),(83,100,92,'/media/variants/321.jpg','2025-04-05 21:25:18','2025-04-05 21:25:18'),(83,101,92,'/media/variants/321.jpg','2025-04-05 21:25:18','2025-04-05 21:25:18'),(83,102,92,'/media/variants/321.jpg','2025-04-05 21:25:18','2025-04-05 21:25:18'),(86,94,84,'/media/variants/326.jpg','2025-04-05 21:28:56','2025-04-05 21:28:56'),(86,95,84,'/media/variants/326.jpg','2025-04-05 21:28:56','2025-04-05 21:28:56'),(86,96,84,'/media/variants/326.jpg','2025-04-05 21:28:56','2025-04-05 21:28:56'),(86,97,98,'/media/variants/327.jpg','2025-04-05 21:29:10','2025-04-05 21:29:10'),(86,98,98,'/media/variants/327.jpg','2025-04-05 21:29:10','2025-04-05 21:29:10'),(86,99,98,'/media/variants/327.jpg','2025-04-05 21:29:10','2025-04-05 21:29:10'),(86,100,120,'/media/variants/328.jpg','2025-04-05 21:28:38','2025-04-05 21:28:38'),(86,101,120,'/media/variants/328.jpg','2025-04-05 21:28:38','2025-04-05 21:28:38'),(86,102,120,'/media/variants/328.jpg','2025-04-05 21:28:38','2025-04-05 21:28:38'),(86,103,95,'/media/variants/330.jpg','2025-04-05 21:29:25','2025-04-05 21:29:25'),(86,104,95,'/media/variants/330.jpg','2025-04-05 21:29:25','2025-04-05 21:29:25'),(86,105,95,'/media/variants/330.jpg','2025-04-05 21:29:25','2025-04-05 21:29:25'),(86,106,94,'/media/variants/329.jpg','2025-04-05 21:29:47','2025-04-05 21:29:47'),(86,107,94,'/media/variants/329.jpg','2025-04-05 21:29:47','2025-04-05 21:29:47'),(86,108,94,'/media/variants/329.jpg','2025-04-05 21:29:47','2025-04-05 21:29:47'),(87,2,84,'/media/variants/165_1dbee048.jpg','2025-04-06 12:31:04','2025-04-06 12:31:04'),(87,3,84,'/media/variants/165_1dbee048.jpg','2025-04-06 12:31:04','2025-04-06 12:31:04'),(87,4,84,'/media/variants/165_1dbee048.jpg','2025-04-06 12:31:04','2025-04-06 12:31:04'),(87,5,84,'/media/variants/165_1dbee048.jpg','2025-04-06 12:31:04','2025-04-06 12:31:04'),(87,6,84,'/media/variants/165_1dbee048.jpg','2025-04-06 12:31:04','2025-04-06 12:31:04'),(87,12,84,'/media/variants/164_bde06d9f.jpg','2025-04-06 12:31:19','2025-04-06 12:31:19'),(87,13,84,'/media/variants/164_bde06d9f.jpg','2025-04-06 12:31:19','2025-04-06 12:31:19'),(87,14,84,'/media/variants/164_bde06d9f.jpg','2025-04-06 12:31:19','2025-04-06 12:31:19'),(87,15,84,'/media/variants/164_bde06d9f.jpg','2025-04-06 12:31:19','2025-04-06 12:31:19'),(87,16,84,'/media/variants/164_bde06d9f.jpg','2025-04-06 12:31:19','2025-04-06 12:31:19'),(87,22,86,'/media/variants/166_811e6568.jpg','2025-04-06 12:31:40','2025-04-06 12:31:40'),(87,23,86,'/media/variants/166_811e6568.jpg','2025-04-06 12:31:40','2025-04-06 12:31:40'),(87,24,86,'/media/variants/166_811e6568.jpg','2025-04-06 12:31:40','2025-04-06 12:31:40'),(87,25,86,'/media/variants/166_811e6568.jpg','2025-04-06 12:31:40','2025-04-06 12:31:40'),(87,26,86,'/media/variants/166_811e6568.jpg','2025-04-06 12:31:40','2025-04-06 12:31:40'),(87,32,53,'/media/variants/167_2e5ae497.jpg','2025-04-06 12:30:19','2025-04-06 12:30:19'),(87,33,53,'/media/variants/167_2e5ae497.jpg','2025-04-06 12:30:19','2025-04-06 12:30:19'),(87,34,53,'/media/variants/167_2e5ae497.jpg','2025-04-06 12:30:19','2025-04-06 12:30:19'),(87,35,53,'/media/variants/167_2e5ae497.jpg','2025-04-06 12:30:19','2025-04-06 12:30:19'),(87,36,53,'/media/variants/167_2e5ae497.jpg','2025-04-06 12:30:19','2025-04-06 12:30:19'),(88,2,92,'/media/variants/181_0568d27a.jpg','2025-04-06 12:33:14','2025-04-06 12:33:14'),(88,3,92,'/media/variants/181_0568d27a.jpg','2025-04-06 12:33:14','2025-04-06 12:33:14'),(88,4,92,'/media/variants/181_0568d27a.jpg','2025-04-06 12:33:14','2025-04-06 12:33:14'),(88,5,92,'/media/variants/181_0568d27a.jpg','2025-04-06 12:33:14','2025-04-06 12:33:14'),(88,6,92,'/media/variants/181_0568d27a.jpg','2025-04-06 12:33:14','2025-04-06 12:33:14'),(88,12,104,'/media/variants/182_bc45ae40.jpg','2025-04-06 12:33:26','2025-04-06 12:33:26'),(88,13,104,'/media/variants/182_bc45ae40.jpg','2025-04-06 12:33:26','2025-04-06 12:33:26'),(88,14,104,'/media/variants/182_bc45ae40.jpg','2025-04-06 12:33:26','2025-04-06 12:33:26'),(88,15,104,'/media/variants/182_bc45ae40.jpg','2025-04-06 12:33:26','2025-04-06 12:33:26'),(88,16,104,'/media/variants/182_bc45ae40.jpg','2025-04-06 12:33:26','2025-04-06 12:33:26'),(88,22,201,'/media/variants/180_2884de3e.jpg','2025-04-06 12:33:44','2025-04-06 12:33:44'),(88,23,201,'/media/variants/180_2884de3e.jpg','2025-04-06 12:33:44','2025-04-06 12:33:44'),(88,24,201,'/media/variants/180_2884de3e.jpg','2025-04-06 12:33:44','2025-04-06 12:33:44'),(88,25,201,'/media/variants/180_2884de3e.jpg','2025-04-06 12:33:44','2025-04-06 12:33:44'),(88,26,201,'/media/variants/180_2884de3e.jpg','2025-04-06 12:33:44','2025-04-06 12:33:44');
/*!40000 ALTER TABLE `productvariant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'CUSTOMER',NULL),(2,'ADMIN',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `type` enum('PERCENTAGE','FIXED') NOT NULL,
  `value` int NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salecategory`
--

DROP TABLE IF EXISTS `salecategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salecategory` (
  `sale_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`sale_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `salecategory_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`) ON DELETE CASCADE,
  CONSTRAINT `salecategory_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salecategory`
--

LOCK TABLES `salecategory` WRITE;
/*!40000 ALTER TABLE `salecategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `salecategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saleproduct`
--

DROP TABLE IF EXISTS `saleproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saleproduct` (
  `sale_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`sale_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `saleproduct_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`) ON DELETE CASCADE,
  CONSTRAINT `saleproduct_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saleproduct`
--

LOCK TABLES `saleproduct` WRITE;
/*!40000 ALTER TABLE `saleproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `saleproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippinginfo`
--

DROP TABLE IF EXISTS `shippinginfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippinginfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `recipient_name` varchar(50) DEFAULT NULL,
  `province_city` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `ward_commune` varchar(255) DEFAULT NULL,
  `specific_address` text,
  `phone_number` varchar(20) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `shippinginfo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippinginfo`
--

LOCK TABLES `shippinginfo` WRITE;
/*!40000 ALTER TABLE `shippinginfo` DISABLE KEYS */;
INSERT INTO `shippinginfo` VALUES (1,1,'Tran Van Diep','Ho Chi Minh','Quan 5','Phuong 4','227, nguyen van cu','0385320575',0,'2025-04-05 02:41:02','2025-04-05 02:41:55'),(2,1,'Tran Van Diep','Lam Dong','Lam Ha','Dan Phuong','thon dan ha','0385320575',1,'2025-04-05 02:41:55','2025-04-06 14:42:30'),(3,1,'Tran Van Diep','Ho Chi Ming','quan 5','phuong 4','227, nguyen van cu','0385320575',0,'2025-04-06 10:25:49','2025-04-06 10:25:49'),(4,1,'Tran Van Diep','Ho Chi Ming','quan 5','phuong 4','227, nguyen van cu','0385320575',0,'2025-04-06 10:25:51','2025-04-06 10:25:51'),(5,1,'Trần Văn Điệp','Hồ Chí Minh','Quận 7','phường 2','1 đường abc','0385320575',0,'2025-04-06 11:44:00','2025-04-06 11:44:00'),(6,2,'Trần Văn Điệp','Hồ Chí Minh','Quận 5','Phường 7','227, nguyễn văn cừ','0385320575',1,'2025-04-06 16:02:04','2025-04-06 16:02:04'),(7,9,'Trần Văn Điệp','Hồ Chí Minh','Quận 5','Phường 7','227, nguyễn văn cừ','0385320575',1,'2025-04-08 11:15:25','2025-04-08 11:15:25'),(9,10,'Trần Văn Điệp','Hồ Chí Minh','Quận 5','Phường 7','227, nguyễn văn cừ','0385320575',1,'2025-04-08 15:37:06','2025-04-08 15:37:07');
/*!40000 ALTER TABLE `shippinginfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text,
  `tax_id` varchar(20) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  `started_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_name` (`company_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'TSUN','Nguyen Van A','nguenvana@gmail.com','0123456789','227, nguyen van cu, phuong 4, quan 5, tp hcm','DH012','tsun.com','ACTIVE','2025-04-05 03:00:00','2025-04-05 10:01:00','2025-04-05 10:01:00'),(2,'DEGREY','Nguyen Van B','nguenvanB@gmail.com','0123456789','227, nguyen van cu, phuong 4, quan 5, tp hcm','DH012','degrey.com','ACTIVE','2025-04-05 03:00:00','2025-04-05 10:01:30','2025-04-05 10:01:30');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@gmail.com','scrypt:32768:8:1$kwtQL7xpFSZXMVxi$d1f6ea8359f51e7384a258ddeb5e445d857f755f2337bef8b527555f8082251bbd207865f65cd8dc2b07f1d63bb7d70078f8ba3265dc7a57a5ecdece2b31191e','0123456789',1,'2025-04-05 01:28:30','2025-04-05 01:28:30'),(2,'Trần Văn Điệp','tranvandiepp2105@gmail.com','scrypt:32768:8:1$BUaKOU3kRsMkDJOH$ef07b90e1272f98fa40b432dc4179bda8576ea48f09a25ba90074c6fe7404f826674af615fa5f4a747b8be6aeed1c46dc3347e3185df7b8ee9942440f86f7402','0385320575',1,'2025-04-06 15:09:16','2025-04-06 15:09:16'),(9,'Điệp','diep@gmail.com','scrypt:32768:8:1$OqJFDszhhTF82Apj$3000460b9d17a6ee9846e08ca21ecd47042b159ad3107326aff8ff3f057532bf6ab5531431580fe8c98b9f9b804ad8695a52c90e1df2e90eee3333216b7fc8db','0385320599',1,'2025-04-08 11:14:31','2025-04-08 11:14:31'),(10,'Hong Quoc Bao','hongquocbao@gmail.com','scrypt:32768:8:1$JccE4ryDbTHjg1YG$042b4cddf857d563759d3522ff6728066fad43413f94b78f4ad6832dbf3894100c36fdfdecf5c0b4493a5845d6a094221d0ec22a884dcb61f910d904159c7f9e','023456789',1,'2025-04-08 12:39:16','2025-04-08 12:39:16'),(11,'le bao gia hoang','lebaogiahoang@gmail.com','scrypt:32768:8:1$LT5s8eUBiLIDWOMz$413e4184cf7ff54fe8d6cdf1b7c0e56abe05f881bbad7e4a0eae06057007287411ba21b617d916cace2d23dcf9fe49b8dc5446690e40c9c35fecaff7135db343','0123456788',1,'2025-04-08 12:39:50','2025-04-08 12:39:50'),(13,'staff1','staff1@gmail.com','scrypt:32768:8:1$7MXt5EoYNB2jR7IL$e18ab7fb963aa9727fe9fbe8d37b92d55f4f0d7dac8253fcdaa94185d23c62ec97f1d35fedf7cd4a4efbfc6d94f20418021f2af64f5c1cb4deb92eb78f1980d8','0385320555',1,'2025-04-16 23:21:04','2025-04-16 23:21:04');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
INSERT INTO `userrole` VALUES (1,1),(2,1),(9,1),(10,1),(11,1),(13,2);
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(20) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `color` (`color`,`size`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` VALUES (104,'BEIGE','10Y. 12Y'),(105,'BEIGE','14Y'),(65,'BEIGE','32'),(66,'BEIGE','34'),(67,'BEIGE','36'),(68,'BEIGE','38'),(69,'BEIGE','40'),(70,'BEIGE','42'),(103,'BEIGE','8Y'),(25,'BEIGE','L'),(24,'BEIGE','M'),(23,'BEIGE','S'),(26,'BEIGE','XL'),(22,'BEIGE','XS'),(52,'BEIGE','XXS'),(98,'BLACK','10Y. 12Y'),(99,'BLACK','14Y'),(71,'BLACK','32'),(72,'BLACK','34'),(73,'BLACK','36'),(74,'BLACK','38'),(75,'BLACK','40'),(76,'BLACK','42'),(90,'BLACK','44'),(97,'BLACK','8Y'),(14,'BLACK','L'),(13,'BLACK','M'),(12,'BLACK','S'),(15,'BLACK','XL'),(16,'BLACK','XS'),(51,'BLACK','XXS'),(101,'BLUE','10Y. 12Y'),(102,'BLUE','14Y'),(53,'BLUE','32'),(54,'BLUE','34'),(55,'BLUE','36'),(56,'BLUE','38'),(57,'BLUE','40'),(58,'BLUE','42'),(89,'BLUE','44'),(100,'BLUE','8Y'),(30,'BLUE','L'),(29,'BLUE','M'),(28,'BLUE','S'),(31,'BLUE','XL'),(27,'BLUE','XS'),(37,'BLUE','XXS'),(107,'BROWN','10Y. 12Y'),(108,'BROWN','14Y'),(83,'BROWN','32'),(84,'BROWN','34'),(85,'BROWN','36'),(86,'BROWN','38'),(87,'BROWN','40'),(88,'BROWN','42'),(106,'BROWN','8Y'),(47,'BROWN','L'),(46,'BROWN','M'),(45,'BROWN','S'),(48,'BROWN','XL'),(44,'BROWN','XS'),(20,'CREAM','L'),(19,'CREAM','M'),(18,'CREAM','S'),(21,'CREAM','XL'),(17,'CREAM','XS'),(59,'GRAY','32'),(60,'GRAY','34'),(61,'GRAY','36'),(62,'GRAY','38'),(63,'GRAY','40'),(64,'GRAY','42'),(10,'GRAY','L'),(9,'GRAY','M'),(8,'GRAY','S'),(11,'GRAY','XL'),(7,'GRAY','XS'),(50,'GRAY','XXS'),(34,'GREEN','L'),(33,'GREEN','M'),(32,'GREEN','S'),(35,'GREEN','XL'),(36,'GREEN','XS'),(38,'GREEN','XXS'),(92,'PINK','10Y. 12Y'),(93,'PINK','14Y'),(91,'PINK','8Y'),(42,'PINK','L'),(41,'PINK','M'),(40,'PINK','S'),(43,'PINK','XL'),(39,'PINK','XS'),(1,'RED','S'),(95,'WHITE','10Y. 12Y'),(96,'WHITE','14Y'),(77,'WHITE','32'),(78,'WHITE','34'),(79,'WHITE','36'),(80,'WHITE','38'),(81,'WHITE','40'),(82,'WHITE','42'),(94,'WHITE','8Y'),(5,'WHITE','L'),(4,'WHITE','M'),(3,'WHITE','S'),(6,'WHITE','XL'),(2,'WHITE','XS'),(49,'WHITE','XXS');
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-17 19:11:18
