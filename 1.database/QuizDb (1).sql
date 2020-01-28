-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: quizdb
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `login` (
  `Wachtwoord` varchar(45) NOT NULL,
  `Gebruikersnaam` varchar(45) NOT NULL,
  PRIMARY KEY (`Gebruikersnaam`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('Gilles','Gilles'),('Lander','Lander');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `quiz` (
  `QuizId` int(11) NOT NULL AUTO_INCREMENT,
  `Naam` varchar(100) NOT NULL,
  `Gebruikersnaam` varchar(60) NOT NULL,
  PRIMARY KEY (`QuizId`),
  KEY `fk_Quiz_Login_idx` (`Gebruikersnaam`),
  CONSTRAINT `fk_Quiz_Login` FOREIGN KEY (`Gebruikersnaam`) REFERENCES `login` (`Gebruikersnaam`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (1,'Eerste','Gilles'),(2,'Eerste','Gilles'),(3,'Dierenquiz','Lander'),(4,'Landen & Geografie','Lander'),(5,'Algemene Quiz','Lander');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vraag`
--

DROP TABLE IF EXISTS `vraag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vraag` (
  `VraagId` int(11) NOT NULL AUTO_INCREMENT,
  `QuizId` int(11) NOT NULL,
  `vraaginhoud` varchar(150) NOT NULL,
  `JuistAntwoord` varchar(45) NOT NULL,
  `VerkeerdAntwoord1` varchar(45) NOT NULL,
  `VerkeerdAntwoord2` varchar(45) NOT NULL,
  `VerkeerdAntwoord3` varchar(45) NOT NULL,
  PRIMARY KEY (`VraagId`),
  KEY `fk_Vraag_Quiz1_idx` (`QuizId`),
  CONSTRAINT `fk_Vraag_Quiz1` FOREIGN KEY (`QuizId`) REFERENCES `quiz` (`QuizId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vraag`
--

LOCK TABLES `vraag` WRITE;
/*!40000 ALTER TABLE `vraag` DISABLE KEYS */;
INSERT INTO `vraag` VALUES (1,1,'Hoe heet de baby van een koe?','Kalf','Lam','Big','Koebaby'),(2,1,'test','test','test','test','test'),(3,1,'zfqzfzf','zdq','zfq','zffz','zffz'),(4,3,'Welk dier staat symbool voor het Wereld Natuur Fonds?','Panda','Uil','Aap','Muis'),(5,3,'Hoeveel bulten heeft een dromedaris?','1','6','2','0'),(6,3,'Hoeveel poten heeft een spin?','8','4','6','10'),(7,3,'Waarmee ademen vissen?','Kieuwen','Mond','Mieuwen','Armen'),(8,3,'Hoe wordt een baby kip genoemt','Kuiken','Kalf','Lam','Big'),(9,3,'Hoe heet de baby van een koe?','Kalf','Big','Lam','Kuiken'),(10,3,'Wat eten panda’s meestal?','Bamboe','Gras','Bananen','Appels'),(11,3,'Welke kleur heeft een goudvis meestal?','Oranje','Goud','Bruin','Geel'),(12,3,'Op wat voor paard rijdt Sinterklaas?','Schimmel','Boerepaard','Renpaard','Dressuurpaard'),(13,3,'Welke zoogdieren danken hun naam een hun gebrul bij zonsopgang?','Brulapen','Brulkippen','Brulkoeien','Brulschaap'),(14,3,'Waarvan is kaviaar gemaakt?','Visseneitjes','Kippe eieren','Koeienmelk','Paarde melk'),(15,3,'Welke dier legt de grootste eieren?','Struisvogel','Olifant','Ooiveaar','Kip'),(16,3,'Hoe heten kleine honden?','Puppy\'s','Kittens','Lammetjes','Kuikens'),(17,3,'Wat is het beste zintuig van een hond?','Neus','Oor','Ogen','Voelen'),(18,3,'Welk leguaanachtig dier kan van kleur veranderen?','Kameleon','Krokedil','Slang','Salamander'),(19,3,'Hoe wordt iemand die bijen houdt genoemd?','Imker','Pimper','Duivemelker','Groentenboer'),(20,3,'Op welke dag worden de dieren verwend?','Dierendag','Paasmaandag','20 april','12 februari'),(21,3,'Hoe wordt een jonge kat genoemd?','Kitten','Poes','Puppy','Hond'),(22,3,'Hoe wordt een babyschaap genoemd?','Lammetje','Kalf','Schaap','Kitten'),(23,3,'Wat is een winterkoning voor dier?','Vogel','Paard','Slang','Vis'),(24,4,'Wat is de hoofdstad van België?','Brussel','Brugge','Gent','Luik'),(25,4,'Wat is de langste rivier van Afrika?','De Nijl','Donau','Rijn','Schelde'),(26,4,'Naar welke stad leiden spreekwoordelijk meer wegen?','Rome','Berlijn','Praag','Brussel'),(27,4,'Uit hoeveel landen bestaat de Benelux?','3','5','2','4'),(28,4,'Wat is het grootste continent ter wereld?','Azië','Europa','Noord-Amerika','Zuid-Amerika'),(29,4,'Welke stad wordt the Big Appel genoemd?','New York','Parijs','Londen','Los Angeles'),(30,4,'In welke provincie ligt Gent?','Oost-Vlaanderen','West-Vlaanderen','Limburg','Antwerpen'),(31,4,'In welk land ligt Amsterdam?','Nederland','België','Duitsland','Spanje'),(32,4,'Hoe wordt een inwoner van Noorwegen genoemd?','Noor','Zweed','Belg','Jood'),(33,4,'Wat is de hoofdstad van Japan?','Tokio','Hong Kong','Peking','Seoul'),(42,4,'In welke stad staat het Atomium?','Brussel','Parijs','New York','Leuven'),(43,4,'Wat is de hoofdstad van West-Vlaanderen?','Brugge','Hasselt','Gent','Antwerpen'),(44,4,'Hoe wordt de munteenheid van de VS genoemd?','Dollar','Euro','Roebel','Yen'),(45,4,'Van waar komen de meeste kiwi\'s?','Nieuw-Zeeland','Spanje','Duitsland','Brazilië'),(46,4,'Hoe noemt de zee aan de belgische kust?','Noordzee','Zwarte zee','Zuidzee','Oostzee'),(47,4,'Waar ligt de eiffeltoren?','Parijs','Londen','Berlijn','Praag'),(48,4,'Waar woont de kerstman?','Noordpool','Zuidpool','Spanje','Polen'),(49,4,'Waar is de Europes Unie vooral gevestigd?','Brussel','New York','Parijs','Londen'),(50,4,'Wat is de hoofstad van Namen?','Namen','Luik','Genk','Bergen'),(51,4,'In welke provincie ligt Leuven?','Vlaams-Brabant','Limburg','Oost-Vlaanderen','Waals-Brabant'),(52,5,'Hoeveel zijdes heeft een dobbelsteen?','6','8','5','9'),(53,5,'In welke maand begint de herfst?','September','Oktober','Maart','Januarie'),(54,5,'Hoe heet de vriend van de pop Barbie?','Ken','Gert','Henk','Geert'),(55,5,'Op welke datum valt een schrikkeldag?','29 februarie','22 maart','1 april','31 januarie'),(56,5,'Het tegenoverstelde van groeien is?','Krimpen','Verbreden','Vermageren','Kan niet'),(57,5,'Wat heb je niet meer als je blut bent?','Geld','Water','Melk','Bier'),(58,5,'Hoeveel dagen heeft de maand augustus?','31','28','30','10'),(59,5,'Hoe lang duurt een voetbalwedstrijd?','90','45','100','80'),(60,5,'Hoe wordt een groep wielrenners genoemd?','Peleton','Elftal','Vijftal','Cluster'),(61,5,'Hoe wordt de watervariant van handbal genoemd?','Waterpolo','Zwemmen','Roeien','Surfen'),(62,5,'Hoe wordt draadloos internet genoemd?','Wifi','Bifi','Hifi','Scifi'),(68,5,'Hoeveel hoekpunten heeft een piramide?','5','10','7','3'),(69,5,'Hoe luidt de slogan van McDonald’s?','I’m Lovin’ It','Have it your way','Eat fresh','Just do it'),(70,5,'Hoe wordt een doelverdediger bij voetbal genoemd?','Keeper','Spits','Verdediger','Middenvelder'),(71,5,'In welke provincie ligt Gent?','Oost-Vlaanderen','West-Vlaanderen','Limburg','Vlaams-Brabant'),(72,5,'Hoe heten kleine honden?','Puppy\'s','Kittens','Lammetjes','Kuikens'),(73,5,'Uit hoeveel landen bestaat de Benelux?','3','5','2','10'),(74,5,'Op welke dag worden de dieren verwend?','Dierendag','Paasmaandag','20 april','12 februarie'),(75,5,'Wat is de hoofdstad van België?','Brussel','Amsterdam','Parijs','Londen'),(76,5,'Waarvan is kaviaar gemaakt?','Visseneitjes','Kippe eieren','Melk','Paarde melk');
/*!40000 ALTER TABLE `vraag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'quizdb'
--

--
-- Dumping routines for database 'quizdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-26 11:35:37
