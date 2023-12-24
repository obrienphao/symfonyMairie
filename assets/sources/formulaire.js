// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Formulaire = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [genre, setGenre] = useState('');
 
  useEffect(() => {
     // Fonction de nettoyage à appeler lors de la destruction du composant
     return () => {
       setNom('');
       setPrenom('');
       setEmail('');
       setTelephone('');
       setAdresse('');
       setGenre('');
     };
  }, []); // L'effet de nettoyage sera déclenché lors de la destruction du composant
 
  const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       await axios.post('/add/habitant', {
         nom,
         prenom,
         email,
         telephone,
         adresse,
         genre,
       });
   
       alert('Le formulaire a été envoyé avec succès.');
    } catch (error) {
       alert('Erreur lors de l\'envoi du formulaire.');
    }
 
  };
 
  return (
    <div className="App">
      <h1>Formulaire</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
        <br />
        <label>
          Prénom:
          <input type="text" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Téléphone:
          <input type="tel" name="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </label>
        <br />
        <label>
          Adresse:
          <input type="text" name="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
        </label>
        <br />
        <label>
          Genre:
          <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="autre">Autre</option>
          </select>
        </label>
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Formulaire;