-- Démarrage de la transaction
BEGIN;

-- seed pour la table department
INSERT INTO "department" ("id", "code", "name")
VALUES (1, '01', 'Ain'),
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

-- Seed pour la table association avec le champ email_association
INSERT INTO "association" ("name", "address", "zip_code", "city", "department_id", "latitude", "longitude",
                           "phone_number", "description", "url_image", "slug", "email_association")
VALUES ('Animal Rescue', '50 Rue Catherine de la Rochefoucauld', '75009', 'Paris', 76, 48.8799306, 2.3352638,
        '0123456789', 'Organisation dédiée au sauvetage des animaux',
        '/images/associations/Animal-Rescue-1.webp', 'animal-rescue-1', 'contact@animalrescue.fr'),

       ('Four Paws', '42 Rue de la République', '69002', 'Lyon', 70, 45.7679057, 4.9602445,
        '0987654321', 'Refuge pour animaux de toutes espèces',
        '/images/associations/Four-Paws-2.webp', 'four-paws-2', 'info@fourpaws.fr'),

       ('SPA du 06', '9 Boulevard de Cimiez', '06000', 'Nice', 6, 43.707429, 7.2700315,
        '0963739971', 'Refuge d''accueil pour animaux de toutes espèces en attente d''adoption',
        '/images/associations/SPA-du-06-3.webp', 'spa-du-06-3', 'contact@spa06.fr');

-- Seed pour la table family
INSERT INTO "family" ("name", "address", "zip_code", "city", "department_id", "phone_number", "description",
                      "url_image", "slug")
VALUES ('Dupont', '17 Rue de Belleville', '75019', 'Paris', 76, '0712345678',
        'Famille aimante cherchant à adopter un animal', '/images/families/Dupont-1.webp', 'dupont-1'),
       ('Martin', '26 Avenue du Plateau', '69009', 'Lyon', 70, '0765432109',
        'Famille prête à accueillir un animal dans le besoin', '/images/families/Martin-2.webp', 'martin-2'),
       ('Lefevre', '12 Avenue Bieckert', '06000', 'Nice', 6, '0739455660',
        'Famille avec enfants pouvant accueillir un animal dans le besoin', '/images/families/Lefevre-3.webp',
        'lefevre-3'),
       ('Petit', '23 Rue Princesse', '59800', 'Lille', 60, '0788352890',
        'Couple à la retraite voulant aider les associations', DEFAULT, 'petit-4');

-- Seed pour la table user
INSERT INTO "user" ("email", "password", "role", "family_id", "association_id")
VALUES ('family1@example.com', '$2b$10$XpyQLAyN6lolsgqjcpchxuj2ersGQZnNSb7BM1YfIVtlqa8fiDyrm', 'family', 1, NULL),
       ('family2@example.com', '$2b$10$XpyQLAyN6lolsgqjcpchxuj2ersGQZnNSb7BM1YfIVtlqa8fiDyrm', 'family', 2, NULL),
       ('family3@example.com', '$2b$10$XpyQLAyN6lolsgqjcpchxuj2ersGQZnNSb7BM1YfIVtlqa8fiDyrm', 'family', 3, NULL),
       ('family4@example.com', '$2b$10$XpyQLAyN6lolsgqjcpchxuj2ersGQZnNSb7BM1YfIVtlqa8fiDyrm', 'family', 4, NULL),
       ('asso1@example.com', '$2b$10$XpyQLAyN6lolsgqjcpchxuj2ersGQZnNSb7BM1YfIVtlqa8fiDyrm', 'association', NULL, 1),
       ('asso2@example.com', '$2b$10$XpyQLAyN6lolsgqjcpchxuj2ersGQZnNSb7BM1YfIVtlqa8fiDyrm', 'association', NULL, 2),
       ('asso3@example.com', '$2b$10$XpyQLAyN6lolsgqjcpchxuj2ersGQZnNSb7BM1YfIVtlqa8fiDyrm', 'association', NULL, 3);

-- Seed pour la table animal
INSERT INTO "animal" ("name", "gender", "race", "species", "age", "size", "description", "url_image", "availability", "family_id", "association_id", "slug")
VALUES 
       ('Couteau', 'Femelle', NULL, 'Chat', 6, 'Petit', 'Chatte calme, aime les câlins', '/images/animals/Couteau-1.webp', TRUE, NULL, 1, 'couteau-1'),
       ('Kira', 'Femelle', 'Labrador', 'Chien', 1, 'Moyen', 'Jeune chien plein d`énergie, aime courir', '/images/animals/Kira-2.webp', TRUE, NULL, 2, 'kira-2'),
       ('Gipsy', 'Mâle', 'Européen', 'Chat', 13, 'Petit', 'Chat d''appartement, adore les endroits calmes ', '/images/animals/Gipsy-3.webp', TRUE, NULL, 3, 'gipsy-3'),
       ('Bianco', 'Mâle', NULL, 'Chien', 10, 'Moyen', 'Chien affectueux et très gourmand', '/images/animals/Bianco-4.webp', TRUE, NULL, 1, 'bianco-4'),
       ('Lewis', 'Mâle', 'Européen', 'Chat', 3, 'Petit', 'Chat vif et intelligent', '/images/animals/Lewis-5.webp', TRUE, NULL, 2, 'lewis-5'),
       ('Rams', 'Mâle', 'Européen', 'Chat', 7, 'Petit', 'Chat calme, aime se prélasser au soleil', '/images/animals/Rams-6.webp', TRUE, NULL, 3, 'rams-6'),
       ('Hilda', 'Femelle', NULL, 'Chat', 8, 'Petit', 'Chatte curieuse et douce, aime les câlins', '/images/animals/Hilda-7.webp', TRUE, NULL, 1, 'hilda-7'),
       ('Demoiselle', 'Femelle', NULL, 'Chien', 7, 'Moyen', 'Chienne douce et affecteuse', '/images/animals/Demoiselle-8.webp', TRUE, NULL, 2, 'demoiselle-8'),
       ('Rubis', 'Femelle', 'Européen', 'Chat', 6, 'Petit', 'Chatte active, aime les jeux et les défis', '/images/animals/Ruby-9.webp', TRUE, NULL, 3, 'ruby-9'),
       ('Shiva', 'Femelle', 'Croisé siamois', 'Chat', 0, 'Petit', 'Jeune chatte très joueuse', '/images/animals/Shiva-10.webp', TRUE, NULL, 1, 'shiva-10'),
       ('Aria', 'Femelle', NULL, 'Chat', 5, 'Petit', 'Chat calme et affectueux', '/images/animals/Aria-11.webp', TRUE, NULL, 2, 'aria-11'),
       ('Napo', 'Mâle', 'Golden Retriever', 'Chien', 1, 'Grand', 'Chien jouer, adore la boue', '/images/animals/Napo-12.webp', TRUE, NULL, 3, 'napo-12'),
       ('Plume', 'Mâle', NULL, 'Chat', 4, 'Petit', 'Chat calme, aime se prélasser au soleil', '/images/animals/Plume-13.webp', TRUE, NULL, 1, 'plume-13'),
       ('Couteau', 'Femelle', NULL, 'Chat', 9, 'Petit', 'Chatte qui adore les boites et cartons', '/images/animals/Couteau-14.webp', TRUE, NULL, 2, 'couteau-14'),
       ('Bianchino', 'Mâle', NULL, 'Chien', 3, 'Moyen', 'Jeune chien vif et joueur', '/images/animals/Bianchino-15.webp', TRUE, NULL, 3, 'bianchino-15'),
       ('Princesse', 'Femelle', NULL, 'Chien', 7, 'Moyen', 'Chienne douce, peureuse', '/images/animals/Princesse-16.webp', TRUE, NULL, 1, 'princesse-16'),
       ('Napo', 'Mâle', 'Golden Retriever', 'Chien', 1, 'Grand', 'Chien joueur et gourmand', '/images/animals/Napo-17.webp', TRUE, NULL, 2, 'napo-17'),
       ('Jean-Jacques', 'Femelle', 'Chatpin', 'Chat', 5, 'Petit', 'Nous avons quelques doutes, peut être que ce n''est pas un chat, car il a de longues oreilles et il aime manger les chargeurs de téléphone', '/images/animals/Jean-Jacques-18.webp', TRUE, NULL, 3, 'jean-jacques-18'),
       ('Oscar', 'Mâle', 'Golden Retriever', 'Chien', 2, 'Grand', 'Chien sociable et affectueux, idéal pour les familles', '/images/animals/Oscar-19.webp', FALSE, 1, 1,'oscar-19'),
       ('Lily', 'Femelle', 'Persan', 'Chat', 5, 'Petit', 'Chat calme, aime se prélasser au soleil', '/images/animals/Lily-20.webp', TRUE, NULL, 2, 'lily-20'),
       ('Charlie', 'Mâle', 'Cocker', 'Chien', 4, 'Petit', 'Chien joueur, parfait pour les petits espaces', '/images/animals/Charlie-21.webp', TRUE, NULL, 3, 'charlie-21'),
       ('Maya', 'Femelle', 'Maine Coon', 'Chat', 3, 'Moyen', 'Chat curieux et doux, aime les câlins', '/images/animals/Maya-22.webp', TRUE, NULL, 1, 'maya-22'),
       ('Max', 'Mâle', 'Jack Russell', 'Chien', 1, 'Petit', 'Jeune chien plein d`énergie, aime courir', '/images/animals/Max-23.webp', TRUE, NULL, 2, 'max-23'),
       ('Chloé', 'Femelle', 'Angora', 'Chat', 6, 'Petit', 'Chat élégant, adore les endroits calmes', '/images/animals/Chloé-24.webp', FALSE, 3, 3, 'chloe-24'),
       ('Buddy', 'Mâle', 'Bulldog', 'Chien', 4, 'Moyen', 'Chien fidèle et protecteur', '/images/animals/Buddy-25.webp', TRUE, NULL, 1, 'buddy-25'),
       ('Zoé', 'Femelle', 'Siamois', 'Chat', 2, 'Petit', 'Chat vif et intelligent', '/images/animals/Zoé-26.webp', FALSE, 2, 2, 'zoe-26'),
       ('Simba', 'Mâle', 'Labrador', 'Chien', 3, 'Grand', 'Chien affectueux et joueur', '/images/animals/Simba-27.webp', TRUE, NULL, 3, 'simba-27'),
       ('Cooper', 'Mâle', 'Caniche', 'Chien', 2, 'Moyen', 'Chien curieux, adore explorer les environs', '/images/animals/Cooper-28.webp', TRUE, NULL,1, 'cooper-28'),
       ('Nala', 'Femelle', 'Angora', 'Chat', 3, 'Petit', 'Chat joyeux, aime la compagnie', '/images/animals/Nala-29.webp', FALSE, 4, 3, 'nala-29');



-- Seed pour la table request
INSERT INTO "request" ("status", "family_id", "animal_id", "association_id", "created_at")
VALUES ('En attente', 3, 12, 3, '2024-09-29T15:13:42.480Z'),
       ('Acceptée', 1, 19, 1, '2024-10-20T15:13:42.480Z'),
       ('En attente', 1, 1, 1, '2024-10-23T15:13:42.480Z'),
       ('En attente', 2, 25, 1, '2024-10-25T15:13:42.480Z'),
       ('En attente', 1, 3, 3, '2024-10-28T15:13:42.480Z'),
       ('En attente', 2, 3, 3, '2024-10-29T10:00:42.480Z'),
       ('En attente', 3, 3, 3, '2024-11-01T15:13:42.480Z'),
       ('En attente', 2, 2, 2, '2024-11-04T15:13:42.480Z'),
       ('En attente', 3, 25, 1, '2024-11-04T20:13:42.480Z'),
       ('Rejetée', 3, 4, 1, '2024-11-04T15:13:42.480Z'),
       ('En attente', 2, 12, 3, '2024-11-05T19:13:42.480Z'),
       ('En attente', 1, 2, 2, '2024-11-10T15:10:42.480Z'),
       ('En attente', 1, 25, 1, '2024-11-10T15:13:42.480Z'),
       ('En attente', 3, 2, 2, '2024-11-11T15:13:42.480Z'),
       ('Refusée', 3, 19, 1, '2024-11-13T15:13:42.480Z'),
       ('Refusée', 3, 6, 3, '2024-11-13T15:13:42.480Z'),
       ('Terminée', 1, 12, 3, '2024-11-14T14:13:42.480Z'),
       ('Acceptée', 3, 26, 3, '2024-11-13T15:13:42.480Z'),
       ('Acceptée', 4, 29, 3, '2024-11-15T14:13:42.480Z');


-- Fin de la transaction
COMMIT;

