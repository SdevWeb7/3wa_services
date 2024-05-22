-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 22 mai 2024 à 09:00
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `3wa_services`
--

-- --------------------------------------------------------

--
-- Structure de la table `messagerie`
--

DROP TABLE IF EXISTS `messagerie`;
CREATE TABLE IF NOT EXISTS `messagerie` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `from_user_id` int UNSIGNED NOT NULL,
  `to_user_id` int UNSIGNED NOT NULL,
  `subject` varchar(50) NOT NULL,
  `content` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `from_user_id` (`from_user_id`),
  KEY `messagerie_ibfk_2` (`to_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `cost` int UNSIGNED NOT NULL,
  `duration` int UNSIGNED NOT NULL,
  `category` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_ibfk_1` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `title`, `description`, `cost`, `duration`, `category`, `created_at`, `user_id`) VALUES
(22, 'Cours de Javascript', 'Bonjour je vous propose des cours de vanilla javascript.', 200, 2, 'Informatique', '2024-05-22 10:10:49', 65),
(23, 'Cours de Next.js', 'Bonjour je vous propose des cours de Next.js.', 300, 2, 'Informatique', '2024-05-22 10:11:09', 65),
(24, 'Cours de Symfony', 'Bonjour je vous propose des cours de Symfony.', 150, 2, 'Informatique', '2024-05-22 10:11:27', 65),
(25, 'Cours de HTML/CSS', 'Bonjour je vous propose des cours de HTML/CSS.', 150, 2, 'Informatique', '2024-05-22 10:11:41', 65),
(26, 'Taille de haies', 'Bonjour je vous propose de venir tailler vos haies.', 200, 1, 'Jardinage', '2024-05-22 10:13:15', 66),
(27, 'Pose et coupe de gazon', 'Bonjour je vous propose de venir poser et couper votre gazon.', 200, 1, 'Jardinage', '2024-05-22 10:13:43', 66),
(28, 'Plante d\'arbre', 'Bonjour je vous propose de venir planter un ou des arbres.', 250, 1, 'Jardinage', '2024-05-22 10:14:11', 66),
(29, 'Pose de carrelage', 'Bonjour je propose de venir poser votre carrelage.', 300, 2, 'Bricolage', '2024-05-22 10:17:38', 67),
(30, 'Création de meubles', 'Bonjour je propose de venir créer des meubles sur mesure.', 300, 2, 'Bricolage', '2024-05-22 10:18:03', 67);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('WYzBKSVK_gWDOwxOCZnSPNTKc9fbmEEz', 1716973079, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2024-05-29T08:50:11.630Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":65,\"email\":\"test@test.fr\",\"sold\":1000,\"services_rendered\":0,\"created_at\":\"2024-05-22T08:08:20.000Z\"}}');

-- --------------------------------------------------------

--
-- Structure de la table `transaction_status`
--

DROP TABLE IF EXISTS `transaction_status`;
CREATE TABLE IF NOT EXISTS `transaction_status` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `from_user_id` int UNSIGNED NOT NULL,
  `service_id` int UNSIGNED NOT NULL,
  `to_user_id` int UNSIGNED NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `start_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `from_user_id` (`from_user_id`),
  KEY `service_id` (`service_id`),
  KEY `to_user_id` (`to_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `transaction_status`
--

INSERT INTO `transaction_status` (`id`, `from_user_id`, `service_id`, `to_user_id`, `status`, `created_at`, `start_date`) VALUES
(8, 67, 29, 67, 'En cours', '2024-05-22 10:30:10', '2024-05-19 08:30:00'),
(9, 67, 22, 65, 'En cours', '2024-05-22 10:30:17', '2024-05-09 08:30:00'),
(10, 65, 29, 67, 'En cours', '2024-05-22 10:40:20', '2024-05-12 08:40:00'),
(11, 65, 25, 65, 'Finalisée', '2024-05-22 10:40:30', '2024-05-26 08:40:00');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` char(60) NOT NULL,
  `sold` int NOT NULL DEFAULT '1000',
  `services_rendered` int UNSIGNED NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `sold`, `services_rendered`, `created_at`) VALUES
(65, 'test@test.fr', '$2b$10$Epw2kvlShQ2sNtgjecC6heWYuuUitgNLHMtAVzN2297ulgsQDcf7K', 1000, 0, '2024-05-22 10:08:20'),
(66, 'jardinier@plantes.fr', '$2b$10$lju4Zm3H60FzWBsifl9yIeW.8oFA5.v5F2edIyhb88Kj0vN5QRrTu', 1000, 0, '2024-05-22 10:12:16'),
(67, 'bricoleur@brico.fr', '$2b$10$GHbUOi3fTKoRgjCZ5G9rb.pHLYSmZXd0b.JcTcTEvZFjfwCevjh7u', 1000, 0, '2024-05-22 10:16:49');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `messagerie`
--
ALTER TABLE `messagerie`
  ADD CONSTRAINT `messagerie_ibfk_1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messagerie_ibfk_2` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `transaction_status`
--
ALTER TABLE `transaction_status`
  ADD CONSTRAINT `transaction_status_ibfk_1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_status_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_status_ibfk_4` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
