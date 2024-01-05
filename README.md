# symfonyMairie
recensement Mairie 

Nous avons créé une base de données `Habitant` que nous avions configuré dans notre fichier `env` ce qui ressemble à :
`DATABASE_URL=mysql://root:Mypasswor...@127.0.0.1:3306/Habitant?serverVersion=8.0`
Donc pour un bon fonctionnement:
- rassurez-vous d'avoir une base de données avec une table `Recensement`
- Pour acceder à la page d'aceuille il faut déjà lancer le serveur symfony
    - `symfony server:start`
    - Et vous pouvez aussi recompiler le projet en utilisant : `npm run dev`
    - la page d'aceuille est gérée par le controller : `controler/react` c'est : `https://127.0.0.1:8000/controler/react`
        - ça vous renvoi directement à la page d'acceuille

-Sur la page d'acceuille vous avez :
  - Un formulaire
  - Un tableau qui liste les habitants
  - Un champ pour chercher un habitant
  - Un bouton pour supprimer un habitant
  - Un bouton pour modifié les information de l'habitant

#Erreur :
- si vous rencontrez une erreur pendant l'exécution de la commande `npm run dev` qui dit `sh: 1: encore: not found` veuillez suivre cette demarche :
- Dans la racine du projet vous faîtes
    1.  `composer require symfony/webpack-encore-bundle`
    2. `export PATH="./node_modules/.bin:$PATH"`
    3. `npm install --save-dev @symfony/webpack-encore`

