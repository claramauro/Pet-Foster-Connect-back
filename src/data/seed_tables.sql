-- Démarrage de la transaction
BEGIN;

-- Seed pour la table association
INSERT INTO "association" ("name", "address", "zip_code", "city", "department", "phone_number", "description", "url_image")
VALUES 
('Animal Rescue', '123 Rue de la Liberté', '75001', 'Paris', 'Île-de-France', '0123456789', 'Organisation dédiée au sauvetage des animaux', 'https://example.com/animal_rescue.jpg'),
('Four Paws', '456 Avenue des Animaux', '69001', 'Lyon', 'Auvergne-Rhône-Alpes', '0987654321', 'Refuge pour animaux de toutes espèces', 'https://example.com/four_paws.jpg');

-- Seed pour la table family
INSERT INTO "family" ("name", "address", "zip_code", "city", "department", "phone_number", "description", "url_image")
VALUES 
('Famille Dupont', '12 Rue du Bonheur', '75002', 'Paris', 'Île-de-France', '0712345678', 'Famille aimante cherchant à adopter un animal', 'https://example.com/dupont_family.jpg'),
('Famille Martin', '34 Avenue du Soleil', '69002', 'Lyon', 'Auvergne-Rhône-Alpes', '0765432109', 'Famille prête à accueillir un animal dans le besoin', 'https://example.com/martin_family.jpg');

-- Seed pour la table user
INSERT INTO "user" ("email", "password", "role", "family_id", "association_id")
VALUES 
('alice@example.com', 'hashed_password1', 'family', 1, NULL),
('bob@example.com', 'hashed_password2', 'association', NULL, 1),
('carol@example.com', 'hashed_password3', 'family', 2, NULL),
('dave@example.com', 'hashed_password4', 'association', NULL, 2);

-- Seed pour la table animal
INSERT INTO "animal" ("name", "gender", "race", "species", "age", "size", "description", "url_image", "availability", "family_id", "association_id")
VALUES 
('Oscar', 'Mâle', 'Golden Retriever', 'Chien', 2, 'Grande', 'Chien sociable et affectueux, idéal pour les familles', 'https://example.com/oscar.jpg', TRUE, NULL, 1),
('Lily', 'Femelle', 'Persan', 'Chat', 5, 'Petite', 'Chat calme, aime se prélasser au soleil', 'https://example.com/lily.jpg', TRUE, NULL, 2),
('Charlie', 'Mâle', 'Teckel', 'Chien', 4, 'Petite', 'Chien joueur, parfait pour les petits espaces', 'https://example.com/charlie.jpg', TRUE, 2, 1),
('Maya', 'Femelle', 'Maine Coon', 'Chat', 3, 'Moyenne', 'Chat curieux et doux, aime les câlins', 'https://example.com/maya.jpg', TRUE, 1, 2),
('Max', 'Mâle', 'Jack Russell', 'Chien', 1, 'Petite', 'Jeune chien plein d`énergie, aime courir', 'https://example.com/max.jpg', TRUE, NULL, 1),
('Chloé', 'Femelle', 'Angora', 'Chat', 6, 'Petite', 'Chat élégant, adore les endroits calmes', 'https://example.com/chloe.jpg', TRUE, NULL, 2),
('Buddy', 'Mâle', 'Bulldog', 'Chien', 4, 'Moyenne', 'Chien fidèle et protecteur', 'https://example.com/buddy.jpg', TRUE, 2, 1),
('Zoé', 'Femelle', 'Siamois', 'Chat', 2, 'Petite', 'Chat vif et intelligent', 'https://example.com/zoe.jpg', TRUE, NULL, 2),
('Simba', 'Mâle', 'Sphynx', 'Chat', 3, 'Petite', 'Chat affectueux sans poils, aime la chaleur', 'https://example.com/simba.jpg', TRUE, 1, 2),
('Cooper', 'Mâle', 'Beagle', 'Chien', 2, 'Moyenne', 'Chien curieux, adore explorer les environs', 'https://example.com/cooper.jpg', TRUE, NULL, 1),
('Nala', 'Femelle', 'Yorkshire Terrier', 'Chien', 3, 'Petite', 'Chienne joyeuse, aime la compagnie', 'https://example.com/nala.jpg', TRUE, 1, 1);

-- Seed pour la table request
INSERT INTO "request" ("status", "family_id", "animal_id")
VALUES 
('En cours', 1, 1),
('En attente', 2, 2),
('Validée', 1, 3),
('Rejetée', 2, 4);

-- Fin de la transaction
COMMIT;
