/**
 * nom du script : connexion_spec.js
 * 
 * Objectif du script: Tester l'ajout d'un habitant dans la base de données de la mairie.
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


describe('Ajouter un habitant', () => {
    beforeEach(() => {
      cy.visit('/add-habitant') // Remplacez cette ligne par l'URL réelle de la page d'ajout d'habitant
    })

    it('Remplir le formulaire et soumettre', () => {

        cy.get('[data-cy=Nom]').type('Doe')
        cy.get('[data-cy=Prénom]').type('John')
        cy.get('[data-cy=date de naissance]').type('1990-01-01')
        cy.get('[data-cy= Téléphone]').type("07 65 28 64 47")
        cy.get('[data-cy=Adresse]').type('GareTours')
        cy.get('[data-cy=Genre]').select('homme')
        cy.get('[data-cy=Envoyer]').click()
        cy.get("[-cy=message envoyer]").should('be.visible')

        

    })
})

describe("POST /http://localhost:8000/accueil", () => {
    test("Utilisateur créé", async () => {
      await request(app)
        .post("/http://localhost:8000/accueil")
        .send({
          Nom: "Doe",
          Prénom: "John",
          date_de_naissance: "1990-01-01",
          Téléphone: "07 65 28 64 47",
          Genre: "homme",
          mail: "john.doe@mail.com",
          password: "123456789",
        })
        .expect(201);
    })

});


//Test pour vérifier un paramètre manquant

test("Paramètre manquant", async () => {
    await request(app)
      .post("/http://localhost:8000/accueil")
      .send({
        prenom: "John",
        nom: "Doe",
        password: "123456789",
      })
      .expect(500)
      .then((response) => {
        expect(response.body.message).toBe("Il manque le paramètre : mail !");
        expect(response.body.code).toBe(-1);
      });
  });

//Test pour verifier qu'un mail est déjà utiliser

test("Adresse mail déjà utilisé !", () => {
    //création du jeu de donné pour ce test
    var membre = new membreModel({
      Prenom: "John",
      Nom: "Doe",
      Mail: "john.doe@mail.com",
      Password: "123456789",
    });
    membre.save().finally(() => {
      //{ message: "Adresse mail déjà utilisé !", code: -3 };
      request(app)
        .post("/http://localhost:8000/accueil")
        .send({
          prenom: "John",
          nom: "Doe",
          mail: "john.doe@mail.com",
          password: "123456789",
        })
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Adresse mail déjà utilisé !");
          expect(response.body.code).toBe(-3);
        });
    });

      //Test pour verifier l'invaliditer d'une adresse mail

  test("Adresse mail invalide !", async () => {
    await request(app)
      .post("/http://localhost:8000/accueil")
      .send({
        prenom: "John",
        nom: "Doe",
        mail: "john.doemail.com",
        password: "123456789",
      })
      .expect(500)
      .then((response) => {
        expect(response.body.message).toBe("Adresse mail invalide !");
        expect(response.body.code).toBe(-4);
      });
  });


});







