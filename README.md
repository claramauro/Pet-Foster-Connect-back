# Pet-foster-connect-BACK

## Gestion base de données dans le conteneur Docker:

    docker compose up

Le conteneur est lancé, la première fois les scripts sql (create_tables et seed_tables) sont exécutés automatiquement.  
Si on arrête de conteneur, les données de la BDD sont sauvegardés dans docker (dans un volume), et donc toujours disponible au relancement du conteneur.

Si on veut modifier les scripts et mettre à jour la bdd, il faut exécuter le script "db:reset" du package.json.  
Pour cela :  
Une fois le conteneur lancé, se placer dans un autre terminal toujours à la racine du projet et exécuter cette commande :

    docker compose exec api-petfoster npm run db:reset

Le mot de passe de la base de donnée sera demandé à chaque étape (suppression db, creation nouvelle db, creation des tables et seed)
