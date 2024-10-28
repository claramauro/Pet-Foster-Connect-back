## Table ANIMAL

| **Champ**      | **Type de donnée** | **Clé**   | **Contraintes** | **Description**                |
|----------------|--------------------|-----------|-----------------|--------------------------------|
| id             | number             | Primaire  | UNIQUE NOT NULL | Identifiant unique de l'animal |
| name           | string             |           | NOT NULL        | Nom de l’animal                |
| gender         | string             |           | NOT NULL        | Sexe de l’animal               |
| race           | string             |           |                 | Race de l’animal               |
| species        | string             |           | NOT NULL        | Type de l’animal               |
| age            | number             |           | NOT NULL        | Age de l'animal                |
| size           | string             |           | NOT NULL        | Taille de l'animal             |
| description    | string             |           | NOT NULL        | Description de l’animal        |
| url_image      | string             |           | UNIQUE          | Url de l’image                 |
| availability   | boolean            |           | NOT NULL        | Disponibilité de l’animal      |
| family_id      | number             | Etrangère |                 | Code de la famille             |
| association_id | number             | Etrangère | NOT NULL        | Code de l’association          |

## Table USER

| **Champ**      | **Type de donnée** | **Clé**  | **Contraintes**  | **Description**                     |
|----------------|--------------------|----------|------------------|-------------------------------------|
| id             | number             | Primaire | UNIQUE NOT NULL  | Identifiant unique de l’utilisateur |
| email          | string             |          | UNIQUE, NOT NULL | Adresse e-mail de l'utilisateur     |
| password       | string             |          | NOT NULL         | Mot de passe de l'utilisateur       |
| role           | string             |          | NOT NULL         | Rôle de l'utilisateur               |
| family_id      | number             |          |                  | Code de la famille                  |
| association_id | number             |          |                  | Code de l’association               |

## TABLE FAMILY

| **Champ**    | **Type de donnée** | **Clé**  | **Contraintes** | **Description**                   |
|--------------|--------------------|----------|-----------------|-----------------------------------|
| id           | number             | Primaire | UNIQUE NOT NULL | Identifiant unique de la famille  |
| name         | string             |          | NOT NULL        | Nom d'une association             |
| address      | string             |          | NOT NULL        | Adresse de la famille             |
| zip_code     | string             |          | NOT NULL        | Code postal de la famille         |
| city         | string             |          | NOT NULL        | Ville de la famille               |
| department   | string             |          | NOT NULL        | Département de la famille         |
| phone_number | string             |          | NOT NULL        | Numéro de téléphone de la famille |
| description  | string             |          |                 | Description de la famille         |
| url_image    | string             |          | UNIQUE          | URL de l’image                    |

## TABLE ASSOCIATION

| **Champ**    | **Type de donnée** | **Clé**  | **Contraintes** | **Description**                      |
|--------------|--------------------|----------|-----------------|--------------------------------------|
| id           | number             | Primaire | UNIQUE NOT NULL | Identifiant unique de l’association  |
| name         | string             |          | NOT NULL        | Nom de l'association                 |
| address      | string             |          | NOT NULL        | Adresse de l’association             |
| zip_code     | string             |          | NOT NULL        | Code postal de l'association         |
| city         | string             |          | NOT NULL        | Ville de l'association               |
| department   | string             |          | NOT NULL        | Département de l'association         |
| phone_number | string             |          | NOT NULL        | Numéro de téléphone de l’association |
| description  | string             |          |                 | Description de l'association         |
| url_image    | string             |          | UNIQUE          | URL de l’image                       |

## Table REQUEST

| **Champ** | **Type de donnée** | **Clé**   | **Contraintes** | **Description**                  |
|-----------|--------------------|-----------|-----------------|----------------------------------|
| id        | number             | Primaire  | UNIQUE NOT NULL | Identifiant unique de la demande |
| statuts   | string             |           | NOT NULL        | Statut de la demande             |
| family_id | number             | Etrangère | NOT NULL        | Code de la famille               |
| animal_id | number             | Etrangère | NOT NULL        | Code de l’animal                 |

                                            |