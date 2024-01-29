# symfonyMairie

# Pour le cours d'admin web - projet pour julien voir la branche `adminWeb`

Recensement Mairie

Nous avons créé une base de données `Habitant` que nous avions configuré dans notre fichier `env` ce qui ressemble à :
`DATABASE_URL=mysql://root:Mypasswor...@127.0.0.1:3306/Habitant?serverVersion=8.0`
Donc pour un bon fonctionnement:

- Assurez-vous d'avoir une base de données avec une table `Recensement`
- Pour accéder à la page d'accueil il faut déjà lancer le serveur symfony
  - `symfony server:start`
  - Et vous pouvez aussi recompiler le projet en utilisant : `npm run dev`
  - la page d'accueil est gérée par le controller : `controler/react` c'est : `https://127.0.0.1:8000/controler/react`
    - ça vous renvoie directement à la page d'accueil

-Sur la page d'accueil vous avez :

- Un formulaire
- Un tableau qui liste les habitants
- Un champ pour chercher un habitant
- Un bouton pour supprimer un habitant
- Un bouton pour modifié les information de l'habitant

# Erreur :

- si vous rencontrez une erreur pendant l'exécution de la commande `npm run dev` qui dit `sh: 1: encore: not found` veuillez suivre cette demarche :
- Dans la racine du projet vous faîtes

  1.  `composer require symfony/webpack-encore-bundle`
  2.  `export PATH="./node_modules/.bin:$PATH"`
  3.  `npm install --save-dev @symfony/webpack-encore`

- NB: pour nettoyer le projet en supprimant le cache :
- `npm run build` à faire toujours dans le courant de votre projet

# Partie 2 test et integration gitlab et selenium:

disponible dans la branche `main` ou `final`

Pour ce projet nous avons 7 contrôleurs React :

- AccueilController
- addHabitantController
- AuthentificationController
-     DeleteHabitant
- hoHabitantController
-     UpdateHabitantController

1. Au niveau du contrôleur Accueil :

Ce contrôleur donne fenêtre de connexion qui prend deux champs

- Identifiant
- Password

Pour les personnes habilitées nous trouvons les identifiants et mot de passe dans la table `login`. Il faut savoir nous n’avons pas créé un espace dans l’application pour ajouter les personnes habilitées dans la base nous avons pris le cas l’admin soit habilité pour ajouter les personnes habilitées dans la base depuis une requête SQL du genre

`INSERT INTO login(identifiant, mot_de_passe) values(‘phao’,’phaonouveau0’)`
Après on pouvait aussi créer un formulaire pour ajouter les personnes habilitées mais ce n'était pas notre première approche.

• Donc il faut noter que sans la migration de la base `login` vous ne pouvez pas vous connecter pour test l’app donc assurez-vous que pour la migration de la chaine de connexion depuis `.env` soit configurée selon base MySQL c’est-à-dire nom de la base et mot de passe commande pour la migration de notre base de données :
De préférence faites directement la deuxième commande car la première regenère une nouvelle config datée qui fera objet d'un conflit avec un fichier déjà existant mais pas avec la même date.
Vous devrez donc supprimer l'ancienne `entity` voilà pourquoi c'est préférable d'executer directement la commande 2

1. `php bin/console make:migration`
2. ` php bin/console doctrine:migrations:migrate`
3. Acceptez les conditions de migration [yes]

• Pour notre cas nous avons une base `Habitant` et table `recensement` et mot de passe nous avons mis simplement `motdepasse`

Au niveau de notre formulaire de connexion le bouton connexion appelle le contrôleur `Authentification`
Nb : si votre chaine de connexion est bien configurée vous aurez :
--> Une base `Habitant` avec tableau recensement avec colonne (prénom, nom, email, date_de_naisance, telephone, genre)
--> Une table `login` qui a deux colonnes (identifiant, mot_de_passe)

2. Contrôleur Authentification :
   Ce contrôleur Authentification à pour but de faire une requête au niveau de la base de données login pour vérifier que la personne qui tente de se connecter existe bien dans la base sinon on retourne une exception erreur de l’envoi de notre formulaire.
   `Response('Identifiant ou mot de passe incorrect.', Response::HTTP_UNAUTHORIZED);
`
   Sinon on charge notre pas qui permet de lister nos habitants et modifier les données dans notre table `recensement`
   Donc notre algo donne :
1. Lancer server Symfony : symfony server :start
1. Au niveau du navigateur utiliser contrôler accueil : `http://localhost:8000/accueil`
1. L’app vous demande de vous connecter
1. Si Identifiant et mot de passe correct vous passer dans la fenêtre qui vous permet de faire de manipulation sur le tableau `recensement`
