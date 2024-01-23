import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowHabitant from './showHabitant';
import Formulaire from './formulaire';

const Authentification = () => {
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [showHabitant, setShowHabitant] = useState(false);
  const [formulaire, setFormulaire] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');

    if (isAuthenticated === 'true') {
      setShowHabitant(true);
      setFormulaire(true);
      setStatus('ok');
    }

    return () => {
      setNom('');
      setPassword('');
      setStatus('');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/authentification', {
        nom,
        password,
      });

      if (response.data.url) {
        // Update the state to show the ShowHabitant component
        setShowHabitant(true);
        setFormulaire(true);
        setStatus('ok');

        // Store the authentication state in local storage
        localStorage.setItem('authenticated', 'true');

        /*try{
          history.push('/redirection');

        }catch (error) {
          alert('redirection');
        }*/

      } else {
        alert('Identifiant ou mot de passe incorrect.');
      }

    } catch (error) {
      alert('Erreur lors de l\'envoi du formulaire.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    setShowHabitant(false);
    setFormulaire(false);
    setStatus('');
  };

  return (
    <div className="App">
      {status !== 'ok' && (
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
      )}
      {formulaire && <Formulaire/>}
      {showHabitant && <ShowHabitant />}
      {showHabitant && (
        <button type="button" onClick={handleLogout}>
          Déconnexion
        </button>
      )}
    </div>
  );
};

export default Authentification;