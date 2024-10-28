# Cahier des charges Pet Foster Connect

## Présentation du projet

Pet Foster Connect est une application permettant de mettre en relation des familles d’accueil pour les animaux et des
associations de protection animale.

## Les besoins :

- Difficulté de la part des associations pour trouver des familles d'accueil
- Désengorger les associations
- Manque de visibilité des associations
- Difficulté pour les bénévoles à trouver toutes les associations demandeuses

## Les objectifs :

- Permettre la mise en relation entre famille d'accueil et association
- Centraliser les informations sur les besoins des associations

## Les fonctionnalités :

### MVP

- Page d'accueil :

    - Présentation du site
    - Afficher quelques animaux
    - Header / Nav : connexion et inscription, lien vers l'accueil, lien vers les associations, lien vers les animaux à
      accueillir

- Page publique associations:

    - possibilité de les afficher toutes ou par critères (localisation, type d'animaux)

- Page publique UNE association :

    - Liste des animaux
    - Infos sur l'association (description, adresse)
    - Bouton pour contacter l'association (mailto)

- Pages publique animaux :

    - possibilité de les afficher tous ou par critères (localisation (par département), type (chien ou chat), espèce,
      mâle/femelle, âge)

- Page publique UN animal :

    - Infos sur l'animal
    - L'association où il se trouve
    - demande d'accueil --> ajoute la demande sur le tableau de bord association

- Page privée profil d'une famille d'accueil :

    - Pouvoir modifier ses informations
    - Pouvoir supprimer son profil
    - Voir ses demandes, annuler une demande
    - Voir la page de profil pour les associations

- Page privée tableau de bord association :
    - une page d'administration des animaux (ajouter, modifier, supprimer)
    - une page pour afficher tous les animaux de l'association
    - page profil de l'association avec possibilité d'édition et suppression
    - une page de gestion des demandes

### Evolutions

- possibilité de mettre des animaux en avant (urgence, "sos", etc.)
- possibilité d'utiliser la géolocalisation
- Envoie de mail à l'association en cas de demande
- Messagerie : discussion entre utilisateur et association
- Alerte / notification pour les familles (ajout d'un nouvel animal correspondant à leurs critères)
- Tableau de bord admin (gestion des utilisateurs, modérations ...)
- fonctionnalité contact : accessible à tous pour contacter les modérateurs du site
- Gestion des disponibilités (famille d'accueil peut indiquer ses disponibilités)

### Les technologies utilisées :

- Environnement de développement et outils :

    - Docker : uniformiser l'environnement de développement, et de déploiement
    - Git : versionner le projet et faciliter le travail en équipe
    - Swagger : documenter l'API
    - Insomnia : Outils de développement pour tester les routes (format JSON)

- Front-end :

    - React + Vite : afin d'optimiser le temps d'affichage / composants à réutiliser
    - SPA / React Router : avoir une fluidité dans l'utilisation de l'application
    - Typescript : afin d'avoir un code plus robuste
    - SASS / CSS : faciliter la syntaxe CSS
    - Reset CSS : uniformiser le style sur les différents navigateurs
    - Librairie de composants : Gain de temps, optimisation du code
    - Responsive, mobile-first : facilité de développement, rendre le site accessible aux mobiles (largement utilisés)
    - Sanitize-html : Simplifier la validation des données utilisateur (failles XSS)

- Back-end :

    - API Rest : adaptée pour la gestion des associations (ajouter des animaux, éditer, supprimer = opérations CRUD) et
      pour les bénévoles. Toutes les informations seront contenues en BDD.
    - PostgreSQL : base de données relationnelle afin de faciliter les associations
    - Sequelize : ORM pour faciliter les requêtes SQL, éviter les injections SQL (Requêtes préparées), modèle Active
      Record
    - Express.js : framework avec un cadre de travail qui facilite le développement
    - Dotenv : gérer les variables d'environnement (PORT, URL, connexion base de donnée, Secret, ...)
    - Joi : Simplifier la validation des données utilisateur
    - Cors : Autoriser les requêtes vers le back de certaines URL seulement (API non publique)
    - Authentification avec JWT et cookies : permet d'échanger des informations de manières sécurisé. Ideal pour de
      l'authentification via cookies (cookie HTTPOnly)

### Le public visé :

- Public adulte, toutes les tranches d'âge. Design simple, clair et neutre (pas de visée commerciale)
- Les associations (gestion rapide au niveau des inscriptions et édition des informations)

### L'arborescence de l'application :

#### Routes Front-end

- Page d'accueil
- Page des associations (recherche + filtres)
- Page d'une association
- Page des animaux (recherche + filtres)
- Page d'un animal
- Page connexion
- Page inscription
- Page de profil pour les familles connectées (et accessible à l'association lors d'une demande)
- Tableau de bord pour les associations connectées
    - Liste des animaux : modifier un animal / supprimer un animal
    - Ajouter un animal
    - Liste des demandes : accepter / refuser / voir la page de la famille
    - Page profil association : éditer, supprimer
- Mentions légales
- Politique de confidentialité
- Gestion des cookies ?
- Plan du site
- Contact (MVP : lien mailto)
- Page erreur 404

#### Routes Back-end

## Homepage

| Verbe | Chemin | Request Body | Response Body          | Code (succès) |
|-------|--------|--------------|------------------------|---------------|
| GET   | /      |              | une liste de X animaux | 200           |

## Associations

| Verbe | Chemin                              | Request Body | Response Body                          | Code (succès) |
|-------|-------------------------------------|--------------|----------------------------------------|---------------|
| GET   | /associations                       |              | la liste de toutes les assocations     | 200           |
| GET   | /associations/:id                   |              | les données d'une association          | 200           |
| GET   | associations/search?filtre={filtre} |              | liste des associations selon un filtre | 200           |

## Animaux

| Verbe | Chemin                          | Request Body                               | Response Body                     | Code (succès) |
|-------|---------------------------------|--------------------------------------------|-----------------------------------|---------------|
| GET   | /animals                        |                                            | la liste de tous les animaux      | 200           |
| GET   | /animals/:id                    |                                            | les données d'un animal           | 200           |
| GET   | /animals/search?filtre={filtre} |                                            | liste des animaux selon un filtre | 200           |
| POST  | /animals/request                | id de l'asso, de la famille et de l'animal | demande                           | 201           |

## Dashboard

| Verbe  | Chemin                             | Request Body | Response Body                      | Code (succès) |
|--------|------------------------------------|--------------|------------------------------------|---------------|
| GET    | /dashboard/association/animals     |              | liste des animaux de l'association | 200           |
| POST   | /dashboard/association/animals/    |              | animal ajouté                      | 201           |
| PATCH  | /dashboard/association/animals/:id |              | animal modifié                     | 200           |
| DELETE | /dashboard/association/animals/:id |              |                                    | 204           |
| GET    | /dashboard/association/profile     |              | les données de l'association       | 200           |
| PATCH  | /dashboard/association/profile     |              | les données de l'association       | 200           |
| DELETE | /dashboard/association/profile     |              |                                    | 204           |
| GET    | /dashboard/association/request     |              | les demandes                       | 200           |
| PATCH  | /dashboard/association/request/:id |              | la demande                         | 200           |

## Famille

| Verbe  | Chemin      | Request Body | Response Body                     | Code (succès) |
|--------|-------------|--------------|-----------------------------------|---------------|
| GET    | /family/:id |              | les infos sur la famille/demandes | 200           |
| PATCH  | /family/:id |              | les infos sur la famille          | 200           |
| DELETE | /family/:id |              |                                   | 204           |

## Inscription

| Verbe | Chemin                      | Request Body | Response Body         | Code (succès) |
|-------|-----------------------------|--------------|-----------------------|---------------|
| POST  | /auth/register/?role={role} |              | Inscription confirmée | 201           |

## Connexion

| Verbe | Chemin      | Request Body | Response Body | Code (succès) |
|-------|-------------|--------------|---------------|---------------|
| POST  | /auth/login |              |               | 200           |

## Déconnexion

| Verbe | Chemin       | Request Body | Response Body | Code (succès) |
|-------|--------------|--------------|---------------|---------------|
| POST  | /auth/logout |              |               | 200           |

### L'équipe :

- Camille : Lead dev Front
- Clara : Scrum Master
- Philippe : Lead dev Back
- Sloan : Product Owner + Git Master
