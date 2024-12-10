ANIMAL: code_Animal, nom, genre, espèce, race, âge, taille, description, url_image, disponible, slug
:
POSSEDER, 11 ANIMAL, 0N ASSOCIATION
:
:

ACCUEILLIR, 0N FAMILLE, 01 ANIMAL
CONCERNER, 0N ANIMAL, 11 DEMANDE
DEMANDE: code_Demande, statut
RECEVOIR, 0N ASSOCIATION, 11 DEMANDE
ASSOCIATION: code_Association, nom, adresse, code_postal, ville, téléphone, description, url_image, slug, longitude, latitude

ETRE, 11 FAMILLE, 01 UTILISATEUR
FAMILLE: code_Famille, nom, adresse, code_postal, ville, téléphone, description, url_image, slug
DEMANDER, 0N FAMILLE, 11 DEMANDE
SITUER, 11 ASSOCIATION, 0N DEPARTEMENT
:

:
LOCALISER, 11 FAMILLE, 0N DEPARTEMENT
DEPARTEMENT: code_Departement, numéro_departement, nom
REPRESENTER, 01 UTILISATEUR, 11 ASSOCIATION
:

:
UTILISATEUR: code_Utilisateur, email, mot_de_passe, role
:
:
:
