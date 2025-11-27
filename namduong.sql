-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 167.71.192.147    Database: appointments_hospital
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.22.04.1

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('USER','ASSISTOR','DOCTOR','ADMIN') NOT NULL DEFAULT 'USER',
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `type` enum('ACCOUNT','GOOGLE') NOT NULL DEFAULT 'ACCOUNT',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKn7ihswpy07ci568w34q0oi8he` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'nguyennamduong@gmail.com','$2a$10$7FOFg5x3x4rt0mEMc4v/a.ZBBYlHa51d1fbrb./TiJyQtcBVYVm/O','ADMIN','ACTIVE','ACCOUNT'),(2,'nguyennamduong.bot@gmail.com','$2a$10$4MswW0Acmk4tQPOT9ZDEcOYZzQWAPqplwtANw9M2WpSI6FhaIL44y','USER','ACTIVE','ACCOUNT'),(3,'nguyennamduong.it@gmail.com','$2a$10$VRgBQxDiDHfEVWzlGRksr.a5msEVlBsUYv2akgFrzXjsNPByIxcuK','ASSISTOR','ACTIVE','ACCOUNT'),(4,'nguyennamduong.api@gmail.com','$2a$10$DA21cOQsmOlQRzeLO1mJf.n21OUjyQgmovKsOgZ9W1K7GQ.Z3KXQK','DOCTOR','ACTIVE','ACCOUNT');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `status` enum('PENDING','CONFIRMED','COMPLETED','CANCELLED') DEFAULT 'PENDING',
  `time` varchar(255) NOT NULL,
  `account_id` bigint DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  `doctor_id` bigint DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq7emmxjb536q0t75l59mb7kxn` (`account_id`),
  KEY `FK7s6sk12lb7298bm0j92j4cdgg` (`department_id`),
  KEY `FKtqhlks4rryxa6oo59j35ju1mm` (`doctor_id`),
  KEY `FKbsma6x4pnujct0e6xkycu9864` (`room_id`),
  CONSTRAINT `FK7s6sk12lb7298bm0j92j4cdgg` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `FKbsma6x4pnujct0e6xkycu9864` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  CONSTRAINT `FKq7emmxjb536q0t75l59mb7kxn` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FKtqhlks4rryxa6oo59j35ju1mm` FOREIGN KEY (`doctor_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'2025-11-21 05:36:01.002000','Đinh Công Chiến','Tái khám định kỳ','0965162116','PENDING','Ngày: 22/11/2025, Giờ: 09h đến 10h - Sáng',1,NULL,NULL,NULL),(2,'2025-11-21 05:36:59.245000','Trần Thanh Quy','Kiểm tra mắt (cận)','0385872250','PENDING','Ngày: 25/11/2025, Giờ: 15h đến 16h - Chiều',2,NULL,NULL,NULL);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Khoa Nội'),(2,'Khoa Ngoại'),(3,'Khoa Phụ sản'),(4,'Khoa Nhi'),(5,'Khoa Truyền nhiễm'),(6,'Khoa Cấp cứu'),(7,'Khoa Hồi sức tích cực và chống độc'),(8,'Khoa Y học cổ truyền'),(9,'Khoa Vật lý trị liệu - phục hồi chức năng'),(10,'Khoa Ung bướu'),(11,'Khám bệnh (tổng)');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_profiles`
--

DROP TABLE IF EXISTS `doctor_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_profiles` (
  `account_id` bigint NOT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` enum('MALE','FEMALE','OTHER') DEFAULT 'OTHER',
  `image` longtext,
  `phone` varchar(255) DEFAULT NULL,
  `status` enum('AVAILABLE','BUSY','OFFLINE') DEFAULT 'AVAILABLE',
  `work_day` varchar(255) DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `FKhq9x3c85kl3rpp34r1820vq4` (`department_id`),
  CONSTRAINT `FKhq9x3c85kl3rpp34r1820vq4` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `FKrdcsgvwpkyfhbmi5852d3vdi9` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_profiles`
--

LOCK TABLES `doctor_profiles` WRITE;
/*!40000 ALTER TABLE `doctor_profiles` DISABLE KEYS */;
INSERT INTO `doctor_profiles` VALUES (4,'','','','OTHER','','','AVAILABLE','',NULL);
/*!40000 ALTER TABLE `doctor_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export_ticket_items`
--

DROP TABLE IF EXISTS `export_ticket_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_ticket_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `export_ticket_id` bigint NOT NULL,
  `medicine_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2gkwocujp10gi2rhjlow36t0l` (`export_ticket_id`),
  KEY `FKilnmvtinaavuosxq15bc5nau8` (`medicine_id`),
  CONSTRAINT `FK2gkwocujp10gi2rhjlow36t0l` FOREIGN KEY (`export_ticket_id`) REFERENCES `export_tickets` (`id`),
  CONSTRAINT `FKilnmvtinaavuosxq15bc5nau8` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_ticket_items`
--

LOCK TABLES `export_ticket_items` WRITE;
/*!40000 ALTER TABLE `export_ticket_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_ticket_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export_tickets`
--

DROP TABLE IF EXISTS `export_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_tickets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `updated_at` datetime(6) NOT NULL,
  `account_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5sj9duvo4afnl87vuwmqvy2uw` (`account_id`),
  CONSTRAINT `FK5sj9duvo4afnl87vuwmqvy2uw` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_tickets`
--

LOCK TABLES `export_tickets` WRITE;
/*!40000 ALTER TABLE `export_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_ticket_items`
--

DROP TABLE IF EXISTS `import_ticket_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_ticket_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `expiry_date` date DEFAULT NULL,
  `quantity` int NOT NULL,
  `unit_price` bigint NOT NULL,
  `import_ticket_id` bigint NOT NULL,
  `medicine_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjdyq5i9uey2wct71aemuch101` (`import_ticket_id`),
  KEY `FK8w1ijcwpgag5byrjjb16c6t3n` (`medicine_id`),
  CONSTRAINT `FK8w1ijcwpgag5byrjjb16c6t3n` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`),
  CONSTRAINT `FKjdyq5i9uey2wct71aemuch101` FOREIGN KEY (`import_ticket_id`) REFERENCES `import_tickets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_ticket_items`
--

LOCK TABLES `import_ticket_items` WRITE;
/*!40000 ALTER TABLE `import_ticket_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `import_ticket_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_tickets`
--

DROP TABLE IF EXISTS `import_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_tickets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `supplier_name` varchar(255) NOT NULL,
  `total_amount` bigint NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8k9y5fohejv7urlnt6o0wk2w6` (`account_id`),
  CONSTRAINT `FK8k9y5fohejv7urlnt6o0wk2w6` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_tickets`
--

LOCK TABLES `import_tickets` WRITE;
/*!40000 ALTER TABLE `import_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `import_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_packages`
--

DROP TABLE IF EXISTS `medical_packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_packages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` bigint NOT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_packages`
--

LOCK TABLES `medical_packages` WRITE;
/*!40000 ALTER TABLE `medical_packages` DISABLE KEYS */;
INSERT INTO `medical_packages` VALUES (1,'Khám lâm sàng + đo huyết áp, cân nặng + xét nghiệm máu/ nước tiểu cơ bản.','Kiểm tra nhanh',800000,'ACTIVE'),(2,'Kiểm tra sức khoẻ theo yêu cầu doanh nghiệp: nội – ngoại, lao động, xét nghiệm cơ bản.','Khám lao động / xin việc',1200000,'ACTIVE'),(3,'Khám tổng quát cho người lớn: khám lâm sàng + vài xét nghiệm + siêu âm ổ bụng / tuyến giáp.','Khám sức khỏe cơ bản',2000000,'ACTIVE'),(4,'Gồm khám sinh sản, xét nghiệm chuyên biệt nam/nữ + kiểm tra tổng quát.','Khám trước hôn nhân',4200000,'ACTIVE'),(5,'Bao gồm các xét nghiệm chỉ điểm ung thư cơ bản + khám nội chuyên khoa.','Tầm soát ung thư nhẹ',5000000,'ACTIVE'),(6,'Nội soi dạ dày + đại tràng gây mê + xét nghiệm ung thư tiêu hóa + siêu âm.','Tầm soát ung thư đường tiêu hóa',17000000,'ACTIVE'),(7,'Kiểm tra tổng quát về mắt (khám mắt, đo mắt) và chuẩn đoán độ cận của mắt.','Kiểm tra cận',200000,'ACTIVE');
/*!40000 ALTER TABLE `medical_packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine_categories`
--

DROP TABLE IF EXISTS `medicine_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine_categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine_categories`
--

LOCK TABLES `medicine_categories` WRITE;
/*!40000 ALTER TABLE `medicine_categories` DISABLE KEYS */;
INSERT INTO `medicine_categories` VALUES (1,'Thực phẩm không thay thế thuốc chữa bệnh','Thực phẩm chức năng'),(2,'Được dùng để điều trị các bệnh nhiễm trùng do vi khuẩn, chẳng hạn như amoxicillin và azithromycin.','Thuốc kháng sinh'),(3,'Dạng viên hoặc dung dịch, dễ dàng sử dụng với nước hoặc chất lỏng khác.','Thuốc uống'),(4,'Các loại kem, gel hoặc mỡ bôi trực tiếp lên da để điều trị tại chỗ.','Thuốc bôi'),(5,'Liều lượng và dạng thuốc được điều chỉnh phù hợp với thể trạng và độ tuổi.','Thuốc dành cho trẻ em'),(6,'Chọn lựa thuốc an toàn, tránh tác động xấu đến mẹ và bé.\n','Thuốc cho phụ nữ mang thai và cho con bú'),(7,'Chú ý đến liều lượng và các loại thuốc tương tác có thể xảy ra.','Thuốc cho người cao tuổi');
/*!40000 ALTER TABLE `medicine_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicines` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `current_stock` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `max_stock` int NOT NULL,
  `min_stock` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` bigint NOT NULL,
  `status` enum('ACTIVE','INACTIVE','OUT_OF_STOCK') DEFAULT 'ACTIVE',
  `unit` varchar(255) NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKki3pw3kdp06pkcowg5rkv04qu` (`category_id`),
  CONSTRAINT `FKki3pw3kdp06pkcowg5rkv04qu` FOREIGN KEY (`category_id`) REFERENCES `medicine_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES (1,0,'Tăng đề kháng, chống oxy hóa.','DHG Pharma',200,100,'Vitamin C 500mg',85000,'ACTIVE','Hộp',1),(2,0,'Hỗ trợ tim mạch, mắt, não.','Mỹ – Nature Made',150,50,'Dầu cá Omega-3',120000,'ACTIVE','Lọ',1),(3,0,'Hỗ trợ miễn dịch, da tóc.','USP',100,20,'Viên bổ sung kẽm',100000,'ACTIVE','Lọ',1),(4,0,'Hỗ trợ xương khớp.','Nhật – DHC',150,50,'Canxi + D3',150000,'ACTIVE','Lọ',1),(5,0,'Kháng sinh phổ rộng.','Pymepharco',200,100,'Amoxicillin 500mg',45000,'ACTIVE','Hộp',2),(6,0,'Trị viêm họng, viêm phổi.','Stada VN',50,20,'Azithromycin 250mg',60000,'ACTIVE','Hộp',2),(7,0,'Trị nhiễm khuẩn hô hấp.','Imexpharm',100,50,'Cefixime 200mg',90000,'ACTIVE','Hộp',2),(8,0,'Giảm đau, hạ sốt.','DHG Pharma',150,50,'Paracetamol 500mg',25000,'ACTIVE','Hộp',3),(9,0,'Giảm ho, long đờm.','Đức – Engelhard',100,50,'Siro ho Prospan',100000,'ACTIVE','Chai',3),(10,0,'Bổ sung sắt.','US Pharma',150,100,'Sắt Ferrous',70000,'ACTIVE','Hộp',3);
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription_invoice_details`
--

DROP TABLE IF EXISTS `prescription_invoice_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_invoice_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `dosage` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `usage_instructions` text,
  `medicine_id` bigint NOT NULL,
  `prescription_invoice_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaxus35n7jlgwjr1weesdo3en1` (`medicine_id`),
  KEY `FKdid44kff31s3a9u07rgo8ecfq` (`prescription_invoice_id`),
  CONSTRAINT `FKaxus35n7jlgwjr1weesdo3en1` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`),
  CONSTRAINT `FKdid44kff31s3a9u07rgo8ecfq` FOREIGN KEY (`prescription_invoice_id`) REFERENCES `prescription_invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_invoice_details`
--

LOCK TABLES `prescription_invoice_details` WRITE;
/*!40000 ALTER TABLE `prescription_invoice_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `prescription_invoice_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription_invoices`
--

DROP TABLE IF EXISTS `prescription_invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_invoices` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `momo_ref` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `patient_phone` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','PAID','CANCELLED') DEFAULT NULL,
  `symptoms` varchar(255) DEFAULT NULL,
  `total_amount` bigint NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `vnpay_ref` varchar(255) DEFAULT NULL,
  `doctor_account_id` bigint DEFAULT NULL,
  `patient_account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4h8jjuthfaiede4g15wh0exa6` (`doctor_account_id`),
  KEY `FKmfcogb3c541hyrh7wjbm6w4j7` (`patient_account_id`),
  CONSTRAINT `FK4h8jjuthfaiede4g15wh0exa6` FOREIGN KEY (`doctor_account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FKmfcogb3c541hyrh7wjbm6w4j7` FOREIGN KEY (`patient_account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_invoices`
--

LOCK TABLES `prescription_invoices` WRITE;
/*!40000 ALTER TABLE `prescription_invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `prescription_invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` enum('EMPTY','FULL','REPAIR') NOT NULL DEFAULT 'EMPTY',
  `department_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmnnwsm0xvdd30vps6hpm92nm6` (`department_id`),
  CONSTRAINT `FKmnnwsm0xvdd30vps6hpm92nm6` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Phòng N.001','EMPTY',1),(2,'Phòng N.002','EMPTY',1),(3,'Phòng N.003','EMPTY',1),(4,'Phòng N.004','REPAIR',1),(5,'Phòng N.005','FULL',1),(6,'Phòng S.001','FULL',3),(7,'Phòng S.002','REPAIR',3),(8,'Phòng NH.001','EMPTY',4),(9,'Phòng NH.002','EMPTY',4),(10,'Phòng C.001','EMPTY',6),(11,'Phòng C.002','EMPTY',6),(12,'Phòng L.001','EMPTY',11),(13,'Phòng L.002','EMPTY',11),(14,'Phòng L.003','EMPTY',11);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_invoice_details`
--

DROP TABLE IF EXISTS `service_invoice_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_invoice_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `medical_package_id` bigint DEFAULT NULL,
  `service_invoice_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4fy0n7wh7v3qbkihmyo63vcss` (`medical_package_id`),
  KEY `FKome37lw08bkpa0j5udle834o7` (`service_invoice_id`),
  CONSTRAINT `FK4fy0n7wh7v3qbkihmyo63vcss` FOREIGN KEY (`medical_package_id`) REFERENCES `medical_packages` (`id`),
  CONSTRAINT `FKome37lw08bkpa0j5udle834o7` FOREIGN KEY (`service_invoice_id`) REFERENCES `service_invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_invoice_details`
--

LOCK TABLES `service_invoice_details` WRITE;
/*!40000 ALTER TABLE `service_invoice_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_invoice_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_invoices`
--

DROP TABLE IF EXISTS `service_invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_invoices` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `momo_ref` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `patient_phone` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','PAID','CANCELLED') DEFAULT NULL,
  `total_amount` bigint NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `vnpay_ref` varchar(255) DEFAULT NULL,
  `doctor_account_id` bigint DEFAULT NULL,
  `patient_account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnds1njb77xjjiba1kcxa8pcq6` (`doctor_account_id`),
  KEY `FKh70pi1aprcomvp7kg5lj9jn9j` (`patient_account_id`),
  CONSTRAINT `FKh70pi1aprcomvp7kg5lj9jn9j` FOREIGN KEY (`patient_account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FKnds1njb77xjjiba1kcxa8pcq6` FOREIGN KEY (`doctor_account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_invoices`
--

LOCK TABLES `service_invoices` WRITE;
/*!40000 ALTER TABLE `service_invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profiles` (
  `account_id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  CONSTRAINT `FKm9xh4i2a8u1nei2w5nlqrmb2g` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES (1,NULL,NULL,NULL,NULL),(2,'Hóc Môn, Thành phố Hồ Chí Minh','2025-11-21','Trần Thanh Quy','0385873350'),(3,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21  5:56:52
