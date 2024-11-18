# Pet-foster-connect-BACK

## Gestion base de données dans le conteneur Docker:

    docker compose up

Le conteneur est lancé, la première fois les scripts sql (create_tables et seed_tables) sont exécutés automatiquement.  
Si on arrête de conteneur, les données de la BDD sont sauvegardés dans docker (dans un volume), et donc toujours
disponible au relancement du conteneur.

Si on veut modifier les scripts et mettre à jour la bdd, il faut exécuter le script "db:reset" du package.json.  
Pour cela :  
Une fois le conteneur lancé, se placer dans un autre terminal toujours à la racine du projet et exécuter cette
commande :

    docker compose exec api-petfoster npm run db:reset

Le mot de passe de la base de donnée sera demandé à chaque étape (suppression db, creation nouvelle db, creation des
tables et seed)

## Mise en production back-end

### Étape 1 : Importer le repository et préparer l'environnement

1. **Cloner le repository** :

    ```bash
    git clone https://<url-du-repository>.git
    ```

2. **Se rendre dans le répertoire du projet** :

    ```bash
    cd <nom-du-dossier-cloné>
    ```

3. **Créer le fichier `.env`** :
   Le fichier `.env` est nécessaire pour définir les variables d'environnement utilisées par l'application. Il est
   important de remplir ce fichier en fonction des variables spécifiques au projet.

    ```bash
    nano .env
    ```

### Étape 2 : Installer NGINX sur le VPS

1. **Mettre à jour les paquets le VPS** :
   Exécuter cette commande pour mettre à jour les dépôts et les paquets du serveur :

    ```bash
    bash
    sudo apt update && sudo apt upgrade -y
    ```

2. **Installer NGINX** :
   Installer NGINX sur le VPS en exécutant la commande suivante :

    ```bash
    sudo apt install nginx -y
    ```

3. **Vérifier l'installation** :
   Vérifier que NGINX est correctement installé en vérifiant la version de NGINX :

    ```bash
    nginx -v
    ```

4. **Vérifier que NGINX fonctionne** :

    ```bash
    sudo systemctl status nginx
    ```

   Si le service n'est pas actif, démarrer avec :

    ```bash
    sudo systemctl start nginx
    ```

---

### Étape 3 : Configurer NGINX pour rediriger le trafic vers l'API

1. **Créer les fichiers de configuration** :
   Crée un fichier de configuration dans le répertoire `/etc/nginx/sites-available/` :

    ```bash
    sudo nano /etc/nginx/sites-available/<nom-de-domaine>
    ```

2. **Ajouter la configuration de base pour le domaine** :
   Exemple de fichier de configuration NGINX pour un domaine :

    ```ngnix
    # Redirection HTTP vers HTTPS
    server {
        listen 80;
        server_name <nom-de-domaine>;

        # Redirige le trafic HTTP vers HTTPS
        return 301 https://$host$request_uri;
    }

    # Configuration pour HTTPS (Port 443)
    server {
        listen 443 ssl;
        server_name <nom-de-domaine>

        # Certificat SSL de Let's Encrypt
        ssl_certificate /etc/letsencrypt/live/<nom-de-domaine>/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/<nom-de-domaine>/privkey.pem;

        # Configuration SSL recommandée
        include /etc/letsencrypt/options-ssl-nginx.conf;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

        location / {
            # Reverse proxy vers le conteneur Docker API sur le port 5050
            proxy_pass http://127.0.0.1:5050;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```

3. **Créer un lien symbolique dans `sites-enabled/`** :
   Pour activer ce fichier de configuration, créer un lien symbolique dans le répertoire
   `/etc/nginx/sites-enabled/` :

    ```bash
    sudo ln -s /etc/nginx/sites-available/<nom-de-domaine> /etc/nginx/sites-enabled/
    ```

4. **Vérifier la configuration** :
   Avant de redémarrer NGINX, il est important de vérifier que la syntaxe de la configuration est correcte :

    ```bash
    sudo nginx -t
    ```

   Si tout est correct :

    ```bash
    nginx: configuration file /etc/nginx/nginx.conf test is successful

5. **Redémarrer NGINX**

   ```bash
   sudo systemctl restart nginx
   ```

   ## OU si Nginx est dans le docker compose passer étape 2 et 3 :

1. **Créer à la racine du repo un fichier ``nginx.conf``** :

   Exemple de fichier de configuration NGINX :
   Dans le cadre d'une configuration de Nginx avec docker compose, `events` et `htpp` sont obligatoires.

    ```ngnix
   events {
    worker_connections 768;
   }

   http {
   
   server {
   listen 80;
   server_name example.com www.example.com;  # Remplace par ton domaine
   
       # Redirige HTTP vers HTTPS
       return 301 https://$host$request_uri;
   }
   
   server {
   listen 443 ssl;
   server_name <nom-de-domaine>;

    ssl_certificate /etc/letsencrypt/live/<nom-de-domaine>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<nom-de-domaine>/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Reverse proxy pour toutes les autres requêtes vers le backend
    location / {
        proxy_pass http://<nom-container>:5050;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    # Cache des images pendant 30 jours
    location /images/ {
        root /usr/share/nginx/html;  # Répertoire des fichiers statiques montés depuis './public'
        try_files $uri $uri/ =404;
        expires 30d;  # Le cache des images dure 30 jours
        add_header Cache-Control "public, max-age=2592000";  # Cache pendant 30 jours
        add_header Access-Control-Allow-Origin <URL du front>; 
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
		    add_header Access-Control-Allow-Headers 'Origin, X-Requested-With, Content-Type, Accept'  
	  }
   }
   }
    ```

### Étape 4 : Configurer HTTPS

1. **Installer Certbot pour Let's Encrypt** :

    ```bash
    sudo apt install certbot python3-certbot-nginx -y
    ```

2. **Obtenir le certificat SSL** :
   Utiliser `certbot` pour obtenir le certificat SSL pour le domaine :

    ```bash
    sudo certbot --nginx -d <nom-de-domaine>
    ```

Certbot va automatiquement configurer le fichier NGINX pour utiliser SSL et ajouter le certificat.

3. **Vérifier la configuration SSL** :
   Après avoir configuré SSL avec Certbot, NGINX redémarrera automatiquement. Tester l'accès HTTPS au domaine
   en utilisant `https://<nom-de-domaine>`.

---

### Étape 6 : Lancer l'application avec Docker Compose

1. **Lancer les conteneurs avec Docker Compose** :
   Avant de démarrer les conteneurs, s'assurer que Docker et Docker Compose sont installés sur le VPS.

    ```bash
    sudo docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
    ```
2. **Lancer le script create_tables et seed_tables (uniquement à l'initialisation)** :
   Le mot de passe de la base de donnée sera demandé à chaque étape (suppression db, creation nouvelle db, creation des
   tables et seed)

   ```
   sudo docker compose exec api-petfoster npm run db:reset
   ```
   


    
