# symfonyMairie

# Pour le cours d'admin web - projet pour julien voir la branche `adminWeb`
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

# Partie 2  test et integration gitlab et selenium:
disponible dans la branche `main` ou `final`
Nb: la branche final comporte unique le projet final mais pas les resources disponible sur gitlab
Pour ce projet nous avons  7 contrôleurs React : 

-•	AccueilController
-•	addHabitantController
-•	AuthentificationController
-•	DeleteHabitant
-•	ShoHabitantController
-•	UpdateHabitantController

1.	Au niveau du contrôleur Accueil :

Ce contrôleur donne fenêtre de connexion  qui prend deux champs 
-	Identifiant 
-	Password 

Pour les personnes habilitées nous trouvons les identifiants et mot de passe  dans la table `login`. Il faut savoir nous n’avons pas créer un espace dans l’application pour ajouter les personnes habilitées dans la base nous avons pris le cas l’admin soit habilité pour ajouter les personées habilités dans la base depuis une requête SQL  du genre 

`INSERT INTO login(identifiant, mot_de_passe) values(‘phao’,’phaonouveau0’)`
Après nous pouvons un formulaire pour ajouter les personées habilités 

•	Donc il faut noter que sans la migration de la base `login`  vous ne pouvez pas vous connecter pour test l’app donc rassurer vous que pour la migration que la chaine de connexion depuis `.env`  soit configurer selon  base MySQL c’est-à-dire nom de la base et mot de passe commande pour la migration de notre base de donnée :
1.	` php bin/console make:migration `
2.	` php bin/console doctrine:migrations:migrate`
3.	Accepter les conditions de migration [yes]

•	Pour notre cas nous avons une base `Habitant` et table `recensement` et mot de passe nous avons mis simplement `motdepasse`

Au niveau de notre formulaire de connexion le buton connexion appelle le contrôleur `Authentification`
Nb : si votre chaine de connexion est bien configurée vous aurez :
-->	Une base `Habitant` avec tableau recensement avec colonne (prénom, nom, email, date_de_naisance, telephone, genre)
-->	Une table `login` qui a deux colonnes (identifiant, mot_de_passe)

2.	Contrôleur Authentification :
Ce contrôleur Authentification à pour but de faire une requête au niveau de la base de données login pour vérifier que la personne qui tente de se connecter existe bien dans la base sinon on retourne une exception erreur de l’envoi de notre formulaire.
`Response('Identifiant ou mot de passe incorrect.', Response::HTTP_UNAUTHORIZED);
`
Sinon on charge notre pas qui permet de lister nos habitants et modifier les données dans  notre table `recensement`
Donc notre algo donne :
1.	Lancer server Symfony : symfony server :start
2.	Au niveau du navigateur utiliser contrôler accueil : `http://localhost:8000/accueil`
3.	L’app vous demande de vous connecter 
4.	Si Identifiant et mot de passe correct  vous passer dans la fenêtre qui vous permet de faire de manipulation sur le tableau `recensement`
 


