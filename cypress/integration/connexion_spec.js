/**
 * nom du script : connexion_spec.js
 * 
 * Objectif du script: Verifier que l'utilisateur peut se connecter à l'application , que le titre de la page est correct et que les éléments de connexion sont bien présents
 * 
 * Date du création du script : 2024-01-15
 * 
 * Autheur : Maël Agambimawo 
 * 
 * Version : 1.0
 * 
 * Pré code : run npm install --save-dev cypress & npx cypress run --spec cypress\integration\connexion_spec.js via le .gitlab-ci.yml
 * 
 **/




describe('Test de connexion', () => {
  it('Affiche la page de connexion', () => {

  
    // Visite la page d'accueil de votre application
    cy.visit('/http://localhost:8000/accueil');

    // Vérifie que le titre de la page est correct
    cy.title().should('include', 'Connexion');

    // Vérifie la présence des éléments de connexion
    cy.get('input[name="nom"]').should('exist');
    cy.get('input[name="Mot de passe"]').should('exist');
    cy.get('button[type="Se connecter"]').should('exist');
  });

  it('Connecte l\'utilisateur avec des noms valides', () => {
    // Remplir les champs d'identification avec des données valides
    cy.get('input[name="nom"]').type('votre_nom');
    cy.get('input[name="Mot de passe"]').type('votre_mot_de_passe');

    // Soumet le formulaire de connexion
    cy.get('button[type="Se connecter"]').click();

    // Vérifie que l'utilisateur est redirigé vers la page d'accueil ou un tableau de bord
    cy.url().should('include', '/Formulaire',"/Liste des habitants");

    // Vérifie que l'utilisateur est connecté en vérifiant la présence de certains éléments de la page d'accueil
    cy.get('.user-avatar').should('exist');
    cy.get('.user-menu').should('exist');
  });

  it('Gère les noms incorrects', () => {
    // Remplir les champs d'identification avec des données incorrectes
    cy.get('input[name="nom"]').type('nom_incorrect');
    cy.get('input[name="Mot de passe"]').type('mot_de_passe_incorrect');

    // Soumet le formulaire de connexion
    cy.get('button[type="Se connecter"]').click();

    // Vérifie que le message d'erreur approprié est affiché
    cy.contains('noms incorrects').should('exist');

    
  });
});
