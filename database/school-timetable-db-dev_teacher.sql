-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 34.27.217.57    Database: school-timetable-db-dev
-- ------------------------------------------------------
-- Server version	8.0.31-google

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '0ae2ccd9-bb2e-11ee-9a14-42010a400004:1-139709,
11cd8659-9f67-11ee-afa0-42010a400002:1-473106';

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO teacher (TeacherID, Prefix, Firstname, Lastname, Department, Email) VALUES
(1, 'นาย', 'พูลศักดิ์', 'พ่อบุตรดี', 'การงานอาชีพ', 'pulak@example.com'),
(2, 'นาง', 'พัชรีรัตน์', 'โวเบ้า', 'การงานอาชีพ', 'patcharee@example.com'),
(3, 'นาง', 'สุภาพรณ์', 'วงศ์ทรรศนกุล', 'ภาษาไทย', 'supaporn@example.com'),
(4, 'นาง', 'รุ่งราตรี', 'ธรรมดวงศรี', 'ภาษาไทย', 'rung@example.com'),
(5, 'นาง', 'วรารักษ์', 'สังกาชาติ', 'คณิตศาสตร์', 'wararak@example.com'),
(6, 'นาง', 'มิตรศิลป์', 'คณาบุตร', 'คณิตศาสตร์', 'mitya@example.com'),
(7, 'นาง', 'นงค์รักษ์', 'พ่อบุตรดี', 'คณิตศาสตร์', 'nongruk@example.com'),
(8, 'นางสาว', 'สุอาภา', 'วรคันทักษ์', 'คณิตศาสตร์', 'suapa@example.com'),
(9, 'นาง', 'อนัญญา', 'คูสกุล', 'วิทยาศาสตร์และเทคโนโลยี', 'ananya@example.com'),
(10, 'นาง', 'ชนัดดา', 'ตาสำโรง', 'วิทยาศาสตร์และเทคโนโลยี', 'chandada@example.com'),
(11, 'นาง', 'วิมลรัตน์', 'ศรีสำอางค์', 'วิทยาศาสตร์และเทคโนโลยี', 'wimol@example.com'),
(12, 'นางสาว', 'วรานาถ', 'กิมาลี', 'วิทยาศาสตร์และเทคโนโลยี', 'waranat@example.com'),
(13, 'นาย', 'ชัยวัฒน์', 'วังทะพันธ์', 'วิทยาศาสตร์และเทคโนโลยี', 'chaiwat@example.com'),
(14, 'นาย', 'เมธาเกียรติ', 'เดชาภัคกูลกีรติ', 'วิทยาศาสตร์และเทคโนโลยี', 'metathakit@example.com'),
(15, 'นาย', 'ณัฐกิตต์', 'ไกยะฝ่าย', 'วิทยาศาสตร์และเทคโนโลยี', 'natkitt@example.com'),
(16, 'นางสาว', 'สุภาวดี', 'จันทรสาขา', 'ภาษาต่างประเทศ', 'supawadee@example.com'),
(17, 'นาง', 'วาสนา', 'จันทะโสก', 'ภาษาต่างประเทศ', 'wasna@example.com'),
(18, 'นาย', 'สุพรรณ', 'เคนวงษา', 'ภาษาต่างประเทศ', 'supphan@example.com'),
(19, 'นางสาว', 'ศิริรักษ์', 'อินอุ่นโชติ', 'ภาษาต่างประเทศ', 'sirirak@example.com'),
(20, 'นางสาว', 'สำเนียง', 'เพ็งเวลุน', 'สังคมศึกษา ศาสนา และวัฒนธรรม', 'saming@example.com'),
(21, 'นาง', 'จินพศิกา', 'มีบุญ', 'สังคมศึกษา ศาสนา และวัฒนธรรม', 'jin@example.com'),
(22, 'นางสาว', 'สุภาณี', 'เชื้อคำเพ็ง', 'สังคมศึกษา ศาสนา และวัฒนธรรม', 'supanee@example.com'),
(23, 'นาย', 'พจน์', 'ทองยืน', 'การงานอาชีพ', 'pajorn@example.com'),
(24, 'นาย', 'วิศวะ', 'แก้วดี', 'สุขศึกษาและพลศึกษา', 'wisawat@example.com'),
(25, 'นางสาว', 'ศิริรักษ์', 'สารทอง', 'การงานอาชีพ', 'siriruk@example.com'),
(26, 'นาง', 'มนีรัตน์', 'สุขสบาย', 'ศิลปะ', 'manee@example.com'),
(27, 'นาย', 'วัชระ', 'พวงมี', 'สุขศึกษาและพลศึกษา', 'wachara@example.com');

/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-17  1:59:16
