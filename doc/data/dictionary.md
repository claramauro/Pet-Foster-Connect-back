## Table ANIMAL

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique de l'animal |
| name | string |  | NOT NULL | Nom de l’animal |
| gender | string |  | NOT NULL | Sexe de l’animal |
| race | string |  |  | Race de l’animal |
| age | number |  | NOT NULL | Age de l'animal |
| size | string | | NOT NULL | Taille de l'animal
| description | string |  | NOT NULL | Description de l’animal |
| url_image | string |  | UNIQUE | Url de l’image |
| availability | boolean |  | NOT NULL  | Disponibilité de l’animal |
| family_id | number | Etrangère | UNIQUE | Famille qui a pris en charge l’animal |
| type_id | number | Etrangère | UNIQUE NOT NULL | Type de l’animal |
| association_id | number | Etrangère | UNIQUE NOT NULL | Association de l’animal |

## Table FAMILLY

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique de l’utilisateur “famille” |
| firstname | string |  | NOT NULL | Prénom de l’utilisateur “famille” |
| lastname | string |  | NOT NULL | Nom de famille de l'utilisateur “famille” |
| email | string |  | UNIQUE, NOT NULL | Adresse e-mail de l'utilisateur “famille” |
| password | string |  | NOT NULL | Mot de passe de l'utilisateur “famille” |
| adress | string |  | NOT NULL | Adresse de l’utilisateur “famille” |
| zip_code | string |  | NOT NULL | Code postale de l'utilisateur “famille” |
| department | string |  | NOT NULL | Departement de l'utilisateur “famille” |
| city | string |  | NOT NULL | Ville de l'utilisateur “famille” |
| phone_number | string |  | NOT NULL | Numéro de téléphone de l’utilisateur “famille” |
| description | string |  | NOT NULL | Description de la famille |
| url_image | string |  | UNIQUE | URL de l’image |
| role_id | number | Etrangère | NOT NULL | Role de l’utilisateur |
| location_id | number | Etrangère | NOT NULL | Localisation (Departement) de la famille |

## Table ASSOCIATION

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique de l’association |
| name | string |  | NOT NULL | Nom de l’association |
| email | string |  | UNIQUE, NOT NULL | Adresse e-mail de l’association |
| password | string |  | NOT NULL | Mot de passe de l’association |
| adress | string |  | NOT NULL | Adresse de l’association |
| zip_code | string |  | NOT NULL | Code postale de l'association |
| department | string |  | NOT NULL | Departement de l'association |
| city | string |  | NOT NULL | Ville de l'association |
| phone_number | string |  | NOT NULL | Numéro de téléphone de l’association |
| description | string |  | NOT NULL | Description de l’association |
| url_image | string |  | UNIQUE | URL de l’image |
| role_id | number | Etrangère | NOT NULL | Role de l’utilisateur |
| location_id | number | Etrangère | NOT NULL | Localisation (Departement) de la famille |

## Table REQUEST

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique de la demande |
| statuts | string |  | NOT NULL | Statut de la demande |
| family_id | number | Etrangère | NOT NULL | Code de la famille |
| animal_id | number | Etrangère | NOT NULL | Code de l’animal |


## Table TYPE

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique du type d’animaux |
| name | string |  | NOT NULL | Type d’animaux |

## Table ROLE

| **Champ** | **Type de donnée** | **Clé** | **Contraintes** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Primaire | UNIQUE NOT NULL | Identifiant unique du rôle |
| name | string |  | NOT NULL | Nom du rôle |