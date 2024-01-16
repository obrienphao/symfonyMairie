// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Authentification = () => {
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
 
 
  useEffect(() => {
     // Fonction de nettoyage à appeler lors de la destruction du composant
     return () => {
       setNom('');
       setPassword('');
      
     };
  }, []); // L'effet de nettoyage sera déclenché lors de la destruction du composant
 
  const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       await axios.post('/authentification', {
         nom,
         password,
        
       });
   
       alert('Connexion succefull');
       window.location.reload();
    } catch (error) {
       alert('Erreur lors de l\'envoi du formulaire.');
    }
 
  };
 
  return (
    <div className="App">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
        <br />
        <label>
          Mot de passe :
          <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br /> 
        <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Authentification;