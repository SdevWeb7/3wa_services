-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 30 mai 2024 à 14:16
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
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Informatique'),
(2, 'Bricolage'),
(3, 'Divers'),
(4, 'Jardinage'),
(5, 'Prêts');

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
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `from_user_id` (`from_user_id`),
  KEY `messagerie_ibfk_2` (`to_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `messagerie`
--

INSERT INTO `messagerie` (`id`, `from_user_id`, `to_user_id`, `subject`, `content`, `created_at`) VALUES
(11, 72, 68, 'Bonjour', 'Ceci est un test', '2024-05-30 16:14:19'),
(12, 68, 72, 'reponse au test', 'Ceci est une réponse au test', '2024-05-30 16:15:28');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `from_user_id` int UNSIGNED NOT NULL,
  `to_user_id` int UNSIGNED NOT NULL,
  `service_id` int UNSIGNED NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `start_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `from_user_id` (`from_user_id`),
  KEY `service_id` (`service_id`),
  KEY `to_user_id` (`to_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `from_user_id`, `to_user_id`, `service_id`, `status`, `created_at`, `start_date`) VALUES
(34, 72, 66, 63, 'En cours', '2024-05-30 16:14:01', '2024-05-26 14:13:00'),
(35, 72, 68, 61, 'En cours', '2024-05-30 16:14:08', '2024-05-26 14:14:00'),
(36, 68, 72, 67, 'En cours', '2024-05-30 16:14:54', '2024-06-02 14:14:00'),
(37, 68, 66, 62, 'En cours', '2024-05-30 16:15:00', '2024-05-26 14:14:00');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cost` int UNSIGNED NOT NULL,
  `duration` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL,
  `img_src` varchar(100) NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_ibfk_1` (`user_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `title`, `description`, `cost`, `duration`, `category_id`, `created_at`, `img_src`, `user_id`) VALUES
(58, 'Monter meuble', 'Je vous propose de monter vos meubles', 150, 2, 2, '2024-05-30 16:02:31', '720b75b4-d183-49df-aa9b-5ecf17095bf7', 69),
(59, 'Peinture', 'Je vous propose de repeindre votre maison.', 200, 2, 2, '2024-05-30 16:04:07', '861c1eaa-0b87-481e-9a41-bedcc7eac2cd', 69),
(60, 'Cours de Javascript', 'Je vous propose des cours de javascript passionnant.', 150, 2, 1, '2024-05-30 16:05:33', '23759933-28e7-4e4a-bb28-db8a64930f28', 68),
(61, 'Testeur d\'application', 'Je suis disponible pour tester vos applications web ou mobile.', 150, 2, 1, '2024-05-30 16:06:43', 'ff6fcfdf-f124-4c14-834d-71fd21de24b3', 68),
(62, 'Arrosage plantes', 'Bonjour je peux arroser vos plantes', 150, 2, 4, '2024-05-30 16:08:10', 'f84dfe61-4e8d-4ff9-8d1f-08ade39b1fb2', 66),
(63, 'Planter des arbres', 'Bonjour je peux planter vos arbres.', 200, 2, 1, '2024-05-30 16:09:06', 'c44850a8-4fda-4dd3-88f2-f2d7f55fd86c', 66),
(64, 'Balade', 'Bonjour je peux promenez vos animaux.', 100, 1, 3, '2024-05-30 16:10:32', '4a9d7d26-8360-40ad-a800-384df1c967c7', 72),
(67, 'Jouets pour animaux', 'Bonjour je peux vous preter pleins de jouets pour animaux.', 100, 7, 3, '2024-05-30 16:13:18', '9da3ece8-c250-43c5-8e26-412d2d26907c', 72);

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
('CqaDkRSsxRovvyEvoELGIVAhRfqkX4Dn', 1717683334, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2024-06-06T14:14:43.869Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":68,\"email\":\"testeur@dev.fr\",\"pseudonyme\":\"testeur\",\"isBanned\":0,\"sold\":1050,\"services_rendered\":1,\"created_at\":\"2024-05-30T10:01:35.000Z\"}}');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` char(60) NOT NULL,
  `pseudonyme` varchar(50) NOT NULL,
  `sold` int NOT NULL DEFAULT '1000',
  `services_rendered` int UNSIGNED NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `isBanned` tinyint UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `pseudonyme` (`pseudonyme`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `pseudonyme`, `sold`, `services_rendered`, `created_at`, `isBanned`) VALUES
(66, 'jardinier@plantes.fr', '$2b$10$lju4Zm3H60FzWBsifl9yIeW.8oFA5.v5F2edIyhb88Kj0vN5QRrTu', 'jardinier', 950, 1, '2024-05-22 10:12:16', 0),
(68, 'testeur@dev.fr', '$2b$10$EjdKW.kUt7zh9mzx.3PuxONvETY1L2weqNtkdYuzY5f5bu02BNZc2', 'testeur', 1050, 1, '2024-05-30 12:01:35', 0),
(69, 'bricoleur@brico.fr', '$2b$10$LGULpp2hXAzo64q7oYylA.L1m81C51C3laYp8EPz91cFZgJ108XFm', 'bricoleur', 1000, 0, '2024-05-30 15:56:52', 0),
(72, 'promeneur@tour.fr', '$2b$10$oZ6XRXg9FM1KNsB0J/uF7u/q5JYsCNX34oXDDFCmgRar/fGA/NfbC', 'promeneur', 1000, 0, '2024-05-30 16:09:45', 0);

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
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `service_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
