## Table ANIMAL

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique de l'animal |
| name | string |  | NOT NULL | Nom de l’animal |
| gender | string |  | NOT NULL | Sexe de l’animal |
| race | string |  |  | Race de l’animal |
| species | string |  | NOT NULL | Type de l’animal |
| age | number |  | NOT NULL | Age de l'animal |
| size | string | | NOT NULL | Taille de l'animal
| description | string |  | NOT NULL | Description de l’animal |
| url_image | string |  | UNIQUE | Url de l’image |
| availability | boolean |  | NOT NULL  | Disponibilité de l’animal |


## Table USER

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique de l’utilisateur |
| firstname | string | | | Prénom d'un utilisateur “famille” |
| lastname | string | | | Nom de famille d'un utilisateur “famille” |
| name | string | | | Nom d'une association |
| email | string |  | UNIQUE, NOT NULL | Adresse e-mail de l'utilisateur  |
| password | string |  | NOT NULL | Mot de passe de l'utilisateur |
| adress | string |  | NOT NULL | Adresse de l’utilisateur |
| zip_code | string |  | NOT NULL | Code postal de l'utilisateur |
| department | string |  | NOT NULL | Departement de l'utilisateur |
| city | string |  | NOT NULL | Ville de l'utilisateur |
| phone_number | string |  | NOT NULL | Numéro de téléphone de l’utilisateur |
| description | string |  | | Description |
| role | string |  |NOT NULL | Rôle de l'utilisateur |
| url_image | string |  | UNIQUE | URL de l’image |

## Table REQUEST

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique de la demande |
| statuts | string |  | NOT NULL | Statut de la demande |
| user_id | number | Etrangère | NOT NULL | Code de la famille |
| animal_id | number | Etrangère | NOT NULL | Code de l’animal |

## Table ANIMALHASUSER

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique de la relation entre utilisateur et animal |
| user_id | number | Etrangère | NOT NULL | Code de l'utilisateur  |
| animal_id | number | Etrangère | NOT NULL | Code de l’animal |