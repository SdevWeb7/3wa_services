-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 26 mai 2024 à 19:01
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `messagerie`
--

INSERT INTO `messagerie` (`id`, `from_user_id`, `to_user_id`, `subject`, `content`, `created_at`) VALUES
(4, 65, 66, 'Bonjour', 'J\'aimerais avoir plus de précisions svp', '2024-05-22 11:04:16'),
(5, 65, 67, 'precision svp', 'votre service n est pas clair please', '2024-05-22 11:04:34'),
(6, 65, 67, 'bonjour', 'ceci est un test', '2024-05-24 23:46:40'),
(7, 66, 65, 'Bonjour', 'avec plaisir je vous répondrais', '2024-05-25 14:45:10');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `from_user_id`, `service_id`, `to_user_id`, `status`, `created_at`, `start_date`) VALUES
(25, 66, 37, 67, 'En cours', '2024-05-25 14:44:45', '2024-05-12 12:44:00'),
(26, 65, 41, 66, 'En cours', '2024-05-25 14:45:33', '2024-05-12 12:45:00'),
(27, 65, 38, 67, 'En cours', '2024-05-25 14:45:37', '2024-05-30 12:45:00'),
(28, 67, 40, 66, 'En cours', '2024-05-25 14:46:10', '2024-05-18 12:46:00'),
(29, 67, 41, 66, 'En cours', '2024-05-25 14:46:13', '2024-06-02 12:46:00');

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
  `img_src` varchar(100) NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_ibfk_1` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `title`, `description`, `cost`, `duration`, `category`, `created_at`, `img_src`, `user_id`) VALUES
(31, 'Cours de Javascript', 'J\'ai le plaisir de vous proposer des cours de javascript', 200, 2, 'Informatique', '2024-05-25 13:54:00', '', 65),
(32, 'Cours HTML CSS', 'J\'ai le plaisir de vous proposer des cours HTML CSS', 200, 2, 'Informatique', '2024-05-25 13:54:15', '', 65),
(33, 'Cours Nextjs', 'J\'ai le plaisir de vous proposer des cours Nextjs', 200, 2, 'Informatique', '2024-05-25 13:54:27', '', 65),
(36, 'Pose de carrelage', 'J\'ai le plaisir de vous proposer de poser cotre carrelage.', 150, 2, 'Bricolage', '2024-05-25 13:56:12', '', 67),
(37, 'Service de bricolage', 'Je peux briocoler pour vous ce que vous voulez', 300, 3, 'Bricolage', '2024-05-25 14:41:43', '', 67),
(38, 'Monter meuble', 'Je peux monter vos meubles.', 100, 1, 'Bricolage', '2024-05-25 14:42:13', '', 67),
(39, 'Tailler haies', 'Je vous propose de tailler vos haies', 150, 1, 'Jardinage', '2024-05-25 14:43:39', '', 66),
(40, 'Planter arbre', 'Je vous propose de planter l\'arbre que vous voulez', 150, 1, 'Jardinage', '2024-05-25 14:43:52', '', 66),
(41, 'Tondre gazon', 'Je vous propose de tondre votre gazon', 150, 1, 'Jardinage', '2024-05-25 14:44:07', '', 66),
(43, 'Full-stack dev', 'Devenir full stack en 1h par jour :)', 200, 2, 'Informatique', '2024-05-26 17:39:19', 'fullstackDevSkills.jpg', 65),
(48, 'Tuto ViteJS', 'Comment démarrer rapidement avec ViteJS', 200, 2, 'Informatique', '2024-05-26 18:10:44', 'vite.svg', 67);

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
('0rxxJBTsF0DJH6s6IqNoD8SST2jPajNJ', 1717338958, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2024-06-02T14:35:58.295Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":65,\"email\":\"test@test.fr\",\"sold\":850,\"services_rendered\":2,\"created_at\":\"2024-05-22T08:08:20.000Z\"}}');

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
(65, 'test@test.fr', '$2b$10$Epw2kvlShQ2sNtgjecC6heWYuuUitgNLHMtAVzN2297ulgsQDcf7K', 850, 2, '2024-05-22 10:08:20'),
(66, 'jardinier@plantes.fr', '$2b$10$lju4Zm3H60FzWBsifl9yIeW.8oFA5.v5F2edIyhb88Kj0vN5QRrTu', 1000, 0, '2024-05-22 10:12:16'),
(67, 'bricoleur@brico.fr', '$2b$10$GHbUOi3fTKoRgjCZ5G9rb.pHLYSmZXd0b.JcTcTEvZFjfwCevjh7u', 1150, 3, '2024-05-22 10:16:49');

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
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
