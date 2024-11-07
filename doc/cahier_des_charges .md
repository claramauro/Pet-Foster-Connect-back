# Cahier des charges Pet Foster Connect

## Présentation du projet

Pet Foster Connect est une application permettant de mettre en relation des familles d’accueil pour les animaux et des
associations de protection animale.

## Les besoins :

-   Difficulté de la part des associations pour trouver des familles d'accueil
-   Désengorger les associations
-   Manque de visibilité des associations
-   Difficulté pour les bénévoles à trouver toutes les associations demandeuses

## Les objectifs :

-   Permettre la mise en relation entre famille d'accueil et association
-   Centraliser les informations sur les besoins des associations

## Les fonctionnalités :

### MVP

-   Page d'accueil :

    -   Présentation du site
    -   Afficher quelques animaux
    -   Header / Nav : connexion et inscription, lien vers l'accueil, lien vers les associations, lien vers les animaux à
        accueillir

-   Page publique associations:

    -   possibilité de les afficher toutes ou par critères (localisation, type d'animaux)

-   Page publique UNE association :

    -   Liste des animaux
    -   Infos sur l'association (description, adresse)
    -   Bouton pour contacter l'association (mailto)

-   Pages publique animaux :

    -   possibilité de les afficher tous ou par critères (localisation (par département), type (chien ou chat), espèce,
        mâle/femelle, âge)

-   Page publique UN animal :

    -   Infos sur l'animal
    -   L'association où il se trouve
    -   demande d'accueil --> ajoute la demande sur le tableau de bord association

-   Page privée profil d'une famille d'accueil :

    -   Pouvoir modifier ses informations
    -   Pouvoir supprimer son profil
    -   Voir ses demandes, annuler une demande
    -   Voir la page de profil pour les associations

-   Page privée tableau de bord association :
    -   une page d'administration des animaux (ajouter, modifier, supprimer)
    -   une page pour afficher tous les animaux de l'association
    -   page profil de l'association avec possibilité d'édition et suppression
    -   une page de gestion des demandes

### Evolutions

-   possibilité de mettre des animaux en avant (urgence, "sos", etc.)
-   possibilité d'utiliser la géolocalisation
-   Envoie de mail à l'association en cas de demande
-   Messagerie : discussion entre utilisateur et association
-   Alerte / notification pour les familles (ajout d'un nouvel animal correspondant à leurs critères)
-   Tableau de bord admin (gestion des utilisateurs, modérations ...)
-   fonctionnalité contact : accessible à tous pour contacter les modérateurs du site
-   Gestion des disponibilités (famille d'accueil peut indiquer ses disponibilités)

### Les technologies utilisées :

-   Environnement de développement et outils :

    -   Docker : uniformiser l'environnement de développement, et de déploiement
    -   Git : versionner le projet et faciliter le travail en équipe
    -   Swagger : documenter l'API
    -   Insomnia : Outils de développement pour tester les routes (format JSON)

-   Front-end :

    -   React + Vite : afin d'optimiser le temps d'affichage / composants à réutiliser
    -   SPA / React Router : avoir une fluidité dans l'utilisation de l'application
    -   Typescript : afin d'avoir un code plus robuste
    -   SASS / CSS : faciliter la syntaxe CSS
    -   Reset CSS : uniformiser le style sur les différents navigateurs
    -   Librairie de composants : Gain de temps, optimisation du code
    -   Responsive, mobile-first : facilité de développement, rendre le site accessible aux mobiles (largement utilisés)
    -   Sanitize-html : Simplifier la validation des données utilisateur (failles XSS)

-   Back-end :

    -   API Rest : adaptée pour la gestion des associations (ajouter des animaux, éditer, supprimer = opérations CRUD) et
        pour les bénévoles. Toutes les informations seront contenues en BDD.
    -   PostgreSQL : base de données relationnelle afin de faciliter les associations
    -   Sequelize : ORM pour faciliter les requêtes SQL, éviter les injections SQL (Requêtes préparées), modèle Active
        Record
    -   Express.js : framework avec un cadre de travail qui facilite le développement
    -   Dotenv : gérer les variables d'environnement (PORT, URL, connexion base de donnée, Secret, ...)
    -   Joi : Simplifier la validation des données utilisateur
    -   Cors : Autoriser les requêtes vers le back de certaines URL seulement (API non publique)
    -   Authentification avec JWT et cookies : permet d'échanger des informations de manières sécurisé. Ideal pour de
        l'authentification via cookies (cookie HTTPOnly)

### Le public visé :

-   Public adulte, toutes les tranches d'âge. Design simple, clair et neutre (pas de visée commerciale)
-   Les associations (gestion rapide au niveau des inscriptions et édition des informations)

### L'arborescence de l'application :

#### Routes Front-end

-   Page d'accueil
-   Page des associations (recherche + filtres)
-   Page d'une association
-   Page des animaux (recherche + filtres)
-   Page d'un animal
-   Page connexion
-   Page inscription
-   Page de profil pour les familles connectées (et accessible à l'association lors d'une demande)
-   Tableau de bord pour les associations connectées
    -   Liste des animaux : modifier un animal / supprimer un animal
    -   Ajouter un animal
    -   Liste des demandes : accepter / refuser / voir la page de la famille
    -   Page profil association : éditer, supprimer
-   Mentions légales
-   Politique de confidentialité
-   Gestion des cookies ?
-   Plan du site
-   Contact (MVP : lien mailto)
-   Page erreur 404

| Pages                                                 | Chemins                    |
| ----------------------------------------------------- | -------------------------- |
| Page d'accueil                                        | /                          |
| Page des associations                                 | /associations              |
| Page d'une association                                | /associations/:name        |
| Page d'une famille                                    | /famille/:name-:id         |
| Page des animaux                                      | /animaux                   |
| Page d'un animal                                      | /animaux/:name-:id         |
| Page d'inscription famille                            | /inscription/famille       |
| Page d'inscription association                        | /inscription/association   |
| Page de connexion                                     | /connexion                 |
| Page des mentions légales                             | /mentions-legales          |
| Page politique de confidentialité                     | /politique-confidentialite |
| Page du plan du site                                  | /plan-du-site              |
| Page tableau de bord association - Liste des animaux  | /tableau-de-bord           |
| Page tableau de bord association - Ajout d'un animal  | /tableau-de-bord/ajout     |
| Page tableau de bord association - Liste des demandes | /tableau-de-bord/demandes  |
| Page tableau de bord association - Profil             | /tableau-de-bord/profil    |
| Page d'erreur 404                                     | /erreur                    |

#### Routes Back-end

## Homepage

| Verbe | Chemin | Request Body | Response Body          | Code (succès) |
| ----- | ------ | ------------ | ---------------------- | ------------- |
| GET   | /      |              | une liste de X animaux | 200           |

## Associations

| Verbe | Chemin                              | Request Body | Response Body                          | Code (succès) |
| ----- | ----------------------------------- | ------------ | -------------------------------------- | ------------- |
| GET   | /associations                       |              | la liste de toutes les associations    | 200           |
| GET   | /associations/:id                   |              | les données d'une association          | 200           |
| GET   | associations/search?filtre={filtre} |              | liste des associations selon un filtre | 200           |

## Animaux

| Verbe | Chemin                          | Request Body                        | Response Body                           | Code (succès) |
| ----- | ------------------------------- | ----------------------------------- | --------------------------------------- | ------------- |
| GET   | /animals                        |                                     | la liste de tous les animaux            | 200           |
| GET   | /animals/:id                    |                                     | les données d'un animal                 | 200           |
| GET   | /animals/search?filtre={filtre} |                                     | liste des animaux selon le(s) filtre(s) | 200           |
| POST  | /animals/request                | id de l'association, id de l'animal | La demande créée                        | 201           |

NB : family_id dans le JWT (header de la requête) pour la méthode POST sur la route /animals/request

## Dashboard

| Verbe  | Chemin                             | Request Body                      | Response Body                      | Code (succès) |
| ------ | ---------------------------------- | --------------------------------- | ---------------------------------- | ------------- |
| GET    | /dashboard/association/animals     |                                   | liste des animaux de l'association | 200           |
| POST   | /dashboard/association/animals/    | data et image de l'animal         | animal ajouté                      | 201           |
| PATCH  | /dashboard/association/animals/:id | data (+/- image) de l'animal      | animal modifié                     | 200           |
| DELETE | /dashboard/association/animals/:id |                                   |                                    | 204           |
| GET    | /dashboard/association/profile     |                                   | les données de l'association       | 200           |
| PATCH  | /dashboard/association/profile     | data (+/- image) de l'association | les données de l'association       | 200           |
| DELETE | /dashboard/association/profile     |                                   |                                    | 204           |
| GET    | /dashboard/association/request     |                                   | les demandes de l'association      | 200           |
| PATCH  | /dashboard/association/request/:id |                                   | la demande                         | 200           |

NB : association_id dans le JWT (header de la requête) pour toutes les routes /dashboard

## Famille

| Verbe  | Chemin      | Request Body                  | Response Body                      | Code (succès) |
| ------ | ----------- | ----------------------------- | ---------------------------------- | ------------- |
| GET    | /family/:id |                               | les données de la famille/demandes | 200           |
| PATCH  | /family     | data de la famille +/\_ image | les données de la famille          | 200           |
| DELETE | /family     |                               |                                    | 204           |

NB : family_id dans le JWT (header de la requête) pour toutes les méthode PATCH ET DELETE sur la route /family

## Inscription

| Verbe | Chemin               | Request Body                                                             | Response Body         | Code (succès) |
| ----- | -------------------- | ------------------------------------------------------------------------ | --------------------- | ------------- |
| POST  | /auth/register/:role | data de la famille ou association (+ image obligatoire pour association) | Inscription confirmée | 201           |

NB : role = "family" ou "association"

## Connexion

| Verbe | Chemin      | Request Body         | Response Body | Code (succès) |
| ----- | ----------- | -------------------- | ------------- | ------------- |
| POST  | /auth/login | email + mot de passe |               | 200           |

## Département

| Verbe | Chemin       | Request Body | Response Body                            | Code (succès) |
| ----- | ------------ | ------------ | ---------------------------------------- | ------------- |
| GET   | /departments |              | Liste de tous les départements de France | 200           |

### Les users stories :

| En tant que | Je veux                                      | Dans le but                                                                    | Sprint |
| ----------- | -------------------------------------------- | ------------------------------------------------------------------------------ | ------ |
| Visiteur    | Consulter la page d'accueil                  |                                                                                |        |
| Visiteur    | Consulter la liste des animaux               | De voir les animaux disponibles                                                |        |
| Visiteur    | Consulter la liste des associations          | De voir les associations                                                       |        |
| Visiteur    | Effectuer une recherche d'animaux            | Voir les animaux correspondants à ses critères                                 |        |
| Visiteur    | Effectuer une recherche d'associations       | Voir les associations correspondants à ses critères                            |        |
| Visiteur    | Voir les mentions légales                    | Lire les mentions légales                                                      |        |
| Visiteur    | Voir le plan du site                         | De connaître l'arborescence du site                                            |        |
| Visiteur    | Voir la politique de confidentialité         | Lire la politique de confidentialité                                           |        |
| Visiteur    | M'inscrire en tant que famille / association | Accéder aux fonctionnalités des différents rôles                               |        |
| Visiteur    | Me connecter                                 | Accéder aux fonctionnalités des familles ou associations                       |        |
| Association | Accéder au tableau de bord de l'association  | Voir les animaux de mon associations et accéder aux fonctionnalités de gestion |        |
| Association | Ajouter un animal                            | Ajouter un animal à la liste des animaux de l'association                      |        |
| Association | Modifier un animal                           | Modifier les informations d'un animal                                          |        |
| Association | Supprimer un animal                          | Supprimer un animal de la liste des animaux de l'association                   |        |
| Association | Voir les demandes                            | Consulter les demandes faites à l'association                                  |        |
| Association | Modifier le statut d'une demande             | Valider ou refuser une demande                                                 |        |
| Association | Voir la page d'une famille                   | Voir les informations pour valider ou non la demande                           |        |
| Association | Visualiser les informations de l'association | Consulter ses informations                                                     |        |
| Association | Modifier les informations de l'association   | D'actualiser les informations de l'association                                 |        |
| Association | Supprimer mon association                    | Effacer mon association et ses animaux de l'application                        |        |
| Association | Me déconnecter                               | De sécuriser mon compte                                                        |        |
| Famille     | Consulter le profil                          | Verifier les informations et mes demandes de prise en charge                   |        |
| Famille     | Faire une demande                            | Accueillir un animal                                                           |        |
| Famille     | Supprimer une demande                        | Annuler la proposition d'accueil de l'animal                                   |        |
| Famille     | Contacter une association                    | Obtenir des informations                                                       |        |
| Famille     | Modifier les informations de la famille      | D'actualiser les informations de la famille                                    |        |
| Famille     | Supprimer le profil                          | Effacer le profil                                                              |        |
| Famille     | Me déconnecter                               | De sécuriser mon compte                                                        |        |

### L'équipe :

-   Camille : Lead dev Front
-   Clara : Scrum Master
-   Philippe : Lead dev Back
-   Sloan : Product Owner + Git Master
