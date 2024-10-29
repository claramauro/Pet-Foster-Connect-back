# Pet-foster-connect-BACK

# Démarrer le conteneur :

    docker compose up

# Exécuter les scripts npm pour reset la BDD :

Une fois le conteneur lancé, se placer dans un autre terminal toujours à la racine du projet et exécuter cette commande pour accéder au conteneur api-petfoster :

    docker compose exec -it api-petfoster sh

On est à présent "dans le conteneur", on peut exécuter

    npm run db:reset
