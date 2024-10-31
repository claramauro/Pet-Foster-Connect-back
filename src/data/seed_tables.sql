-- Démarrage de la transaction
BEGIN;

-- seed pour la table department
INSERT INTO "department" ("id", "code", "name") VALUES
(1, '01', 'Ain'),
(2, '02', 'Aisne'),
(3, '03', 'Allier'),
(5, '05', 'Hautes-Alpes'),
(4, '04', 'Alpes-de-Haute-Provence'),
(6, '06', 'Alpes-Maritimes'),
(7, '07', 'Ardèche'),
(8, '08', 'Ardennes'),
(9, '09', 'Ariège'),
(10, '10', 'Aube'),
(11, '11', 'Aude'),
(12, '12', 'Aveyron'),
(13, '13', 'Bouches-du-Rhône'),
(14, '14', 'Calvados'),
(15, '15', 'Cantal'),
(16, '16', 'Charente'),
(17, '17', 'Charente-Maritime'),
(18, '18', 'Cher'),
(19, '19', 'Corrèze'),
(20, '2a', 'Corse-du-sud'),
(21, '2b', 'Haute-corse'),
(22, '21', 'Côte-d''or'),
(23, '22', 'Côtes-d''armor'),
(24, '23', 'Creuse'),
(25, '24', 'Dordogne'),
(26, '25', 'Doubs'),
(27, '26', 'Drôme'),
(28, '27', 'Eure'),
(29, '28', 'Eure-et-Loir'),
(30, '29', 'Finistère'),
(31, '30', 'Gard'),
(32, '31', 'Haute-Garonne'),
(33, '32', 'Gers'),
(34, '33', 'Gironde'),
(35, '34', 'Hérault'),
(36, '35', 'Ile-et-Vilaine'),
(37, '36', 'Indre'),
(38, '37', 'Indre-et-Loire'),
(39, '38', 'Isère'),
(40, '39', 'Jura'),
(41, '40', 'Landes'),
(42, '41', 'Loir-et-Cher'),
(43, '42', 'Loire'),
(44, '43', 'Haute-Loire'),
(45, '44', 'Loire-Atlantique'),
(46, '45', 'Loiret'),
(47, '46', 'Lot'),
(48, '47', 'Lot-et-Garonne'),
(49, '48', 'Lozère'),
(50, '49', 'Maine-et-Loire'),
(51, '50', 'Manche'),
(52, '51', 'Marne'),
(53, '52', 'Haute-Marne'),
(54, '53', 'Mayenne'),
(55, '54', 'Meurthe-et-Moselle'),
(56, '55', 'Meuse'),
(57, '56', 'Morbihan'),
(58, '57', 'Moselle'),
(59, '58', 'Nièvre'),
(60, '59', 'Nord'),
(61, '60', 'Oise'),
(62, '61', 'Orne'),
(63, '62', 'Pas-de-Calais'),
(64, '63', 'Puy-de-Dôme'),
(65, '64', 'Pyrénées-Atlantiques'),
(66, '65', 'Hautes-Pyrénées'),
(67, '66', 'Pyrénées-Orientales'),
(68, '67', 'Bas-Rhin'),
(69, '68', 'Haut-Rhin'),
(70, '69', 'Rhône'),
(71, '70', 'Haute-Saône'),
(72, '71', 'Saône-et-Loire'),
(73, '72', 'Sarthe'),
(74, '73', 'Savoie'),
(75, '74', 'Haute-Savoie'),
(76, '75', 'Paris'),
(77, '76', 'Seine-Maritime'),
(78, '77', 'Seine-et-Marne'),
(79, '78', 'Yvelines'),
(80, '79', 'Deux-Sèvres'),
(81, '80', 'Somme'),
(82, '81', 'Tarn'),
(83, '82', 'Tarn-et-Garonne'),
(84, '83', 'Var'),
(85, '84', 'Vaucluse'),
(86, '85', 'Vendée'),
(87, '86', 'Vienne'),
(88, '87', 'Haute-Vienne'),
(89, '88', 'Vosges'),
(90, '89', 'Yonne'),
(91, '90', 'Territoire de Belfort'),
(92, '91', 'Essonne'),
(93, '92', 'Hauts-de-Seine'),
(94, '93', 'Seine-Saint-Denis'),
(95, '94', 'Val-de-Marne'),
(96, '95', 'Val-d''oise'),
(97, '976', 'Mayotte'),
(98, '971', 'Guadeloupe'),
(99, '973', 'Guyane'),
(100, '972', 'Martinique'),
(101, '974', 'Réunion');

-- Seed pour la table association
INSERT INTO "association" ("name", "address", "zip_code", "city", "department_id", "phone_number", "description", "url_image")
VALUES 
('Animal Rescue', '123 Rue de la Liberté', '75001', 'Paris', 76, '0123456789', 'Organisation dédiée au sauvetage des animaux', '/images/associations/Animal-Rescue-1.webp'),
('Four Paws', '456 Avenue des Animaux', '69001', 'Lyon', 70, '0987654321', 'Refuge pour animaux de toutes espèces', '/images/associations/Four-Paws-2.webp'),
('SPA du 06', '20 Chemin du soleil', '06000', 'Nice', 6, '0963739971', 'Refuge d''accueil pour animaux de toutes espèces en attente d''adoption', '/images/associations/SPA-du-06-3.webp');

-- Seed pour la table family
INSERT INTO "family" ("name", "address", "zip_code", "city", "department_id", "phone_number", "description", "url_image")
VALUES 
('Dupont', '12 Rue du Bonheur', '75002', 'Paris', 76, '0712345678', 'Famille aimante cherchant à adopter un animal', '/images/families/Dupont-1.webp'),
('Martin', '34 Avenue du Soleil', '69002', 'Lyon', 70, '0765432109', 'Famille prête à accueillir un animal dans le besoin', '/images/families/Martin-2.webp'),
('Lefevre', '2 impasse des fleurs', '06000', 'Nice', 6, '0739455660', 'Famille avec enfants pouvant accueillir un animal dans le besoin', '/images/families/Lefevre-3.webp'),
('Petit', '67 Rue Carnot', '05000', 'Gap', 5, '0788352890', 'Couple à la retraite voulant aider les associations', DEFAULT);

-- Seed pour la table user
INSERT INTO "user" ("email", "password", "role", "family_id", "association_id")
VALUES 
('alice@example.com', 'hashed_password1', 'family', 1, NULL),
('bob@example.com', 'hashed_password2', 'association', NULL, 1),
('carol@example.com', 'hashed_password3', 'family', 2, NULL),
('dave@example.com', 'hashed_password4', 'association', NULL, 2),
('john@example.com', 'hashed_password5', 'family', 3, NULL),
('spa@example.com', 'hashed_password6', 'association', NULL, 3);

-- Seed pour la table animal
INSERT INTO "animal" ("name", "gender", "race", "species", "age", "size", "description", "url_image", "availability", "family_id", "association_id")
VALUES 
('Oscar', 'Mâle', 'Golden Retriever', 'Chien', 2, 'Grand', 'Chien sociable et affectueux, idéal pour les familles', '/images/animals/Oscar-1.webp', FALSE, 1, 1),
('Lily', 'Femelle', 'Persan', 'Chat', 5, 'Petit', 'Chat calme, aime se prélasser au soleil', '/images/animals/Lily-2.webp', TRUE, NULL, 2),
('Charlie', 'Mâle', 'Cocker', 'Chien', 4, 'Petit', 'Chien joueur, parfait pour les petits espaces', '/images/animals/Charlie-3.webp', TRUE, NULL, 3),
('Maya', 'Femelle', 'Maine Coon', 'Chat', 3, 'Moyen', 'Chat curieux et doux, aime les câlins', '/images/animals/Maya-4.webp', TRUE, NULL, 2),
('Max', 'Mâle', 'Jack Russell', 'Chien', 1, 'Petit', 'Jeune chien plein d`énergie, aime courir', '/images/animals/Max-5.webp', TRUE, NULL, 1),
('Chloé', 'Femelle', 'Angora', 'Chat', 6, 'Petit', 'Chat élégant, adore les endroits calmes', '/images/animals/Chloé-6.webp', FALSE, 3, 3),
('Buddy', 'Mâle', 'Bulldog', 'Chien', 4, 'Moyen', 'Chien fidèle et protecteur', '/images/animals/Buddy-7.webp', TRUE, NULL, 1),
('Zoé', 'Femelle', 'Siamois', 'Chat', 2, 'Petit', 'Chat vif et intelligent', '/images/animals/Zoé-8.webp', TRUE, NULL, 3),
('Simba', 'Mâle', 'Labrador', 'Chien', 3, 'Grand', 'Chien affectueux et joueur', '/images/animals/Simba-9.webp', TRUE, NULL, 2),
('Cooper', 'Mâle', 'Caniche', 'Chien', 2, 'Moyen', 'Chien curieux, adore explorer les environs', '/images/animals/Cooper-10.webp', TRUE, NULL, 3),
('Nala', 'Femelle', 'Angora', 'Chat', 3, 'Petit', 'Chat joyeux, aime la compagnie', '/images/animals/Nala-11.webp', TRUE, NULL, 3);

-- Seed pour la table request
INSERT INTO "request" ("status", "family_id", "animal_id", "association_id")
VALUES 
('En attente', 2, 2, 2),
('En attente', 1, 3, 3),
('Validée', 1, 1, 1),
('Validée', 3, 6, 3),
('Rejetée', 3, 4, 2);

-- Fin de la transaction
COMMIT;
