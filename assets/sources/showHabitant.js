import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../bootstrap.js';
import '../styles/app.css';

const ShowHabitant = () => {
  const [habitants, setHabitants] = useState([]);
  const [habitant, setHabitant] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [habitantToEdit, setHabitantToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [habitantInput, setHabitantInput] = useState({
    id: '',
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    telephone: '',
    genre: '',
    dateNaissance: '', // Ajout de cette ligne
  });

  const handleInputChange = (e) => {
    setHabitantInput({ ...habitantInput, [e.target.name]: e.target.value });
  };

  const saveHabitant = async (id) => {
    try {
      const response = await axios.put(`/update/habitant/${id}`, {
        id: habitantInput.id,
        nom: habitantInput.nom,
        prenom: habitantInput.prenom,
        adresse: habitantInput.adresse,
        email: habitantInput.email,
        telephone: habitantInput.telephone,
        genre: habitantInput.genre,
        dateNaissance: habitantInput.dateNaissance, // Ajout de cette ligne
      });

      if (response.data) {
        setHabitants(habitants.map((habitant) => habitant.id === id ? response.data : habitant));
        setShowEdit(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteHabitant = async (id) => {
    try {
      const response = await fetch(`/delete/habitant/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setHabitants(habitants.filter((habitant) => habitant.id !== id));
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (habitantToEdit) {
      setHabitantInput(habitantToEdit);
    }
  }, [habitantToEdit]);

  const editHabitant = async (id) => {
    try {
      const response = await axios.get(`/get/habitant/${id}`);

      if (response.data) {
        setHabitant({
          id: response.data.id,
          nom: response.data.nom,
          prenom: response.data.prenom,
          adresse: response.data.adresse,
          email: response.data.email,
          telephone: response.data.telephone,
          genre: response.data.genre,
          dateNaissance: response.data.dateNaissance, // Ajout de cette ligne
        });
        setHabitantInput(response.data);
        setShowEdit(true);
        //window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetch('/show/habitant')
      .then((response) => response.json())
      .then((data) => setHabitants(data));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredHabitants = habitants.filter((habitant) =>
    habitant.nom.toLowerCase().includes(search.toLowerCase()) ||
    habitant.prenom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-container" >
      <h2>Liste des habitants</h2>
      <input type="text" placeholder="Rechercher" value={search} onChange={handleSearchChange} />

      <table className="myTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Genre</th>
            <th>Date de naissance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHabitants.map((habitant) => (
            <tr key={habitant.id}>
              <td>{habitant.id}</td>
              <td>{habitant.nom}</td>
              <td>{habitant.prenom}</td>
              <td>{habitant.adresse}</td>
              <td>{habitant.telephone}</td>
              <td>{habitant.email}</td>
              <td>{habitant.genre}</td>
              <td>{habitant.dateNaissance}</td>
              <td>
                <button onClick={() => deleteHabitant(habitant.id)}>Supprimer</button>
                <button onClick={() => editHabitant(habitant.id)}>Modifier</button>
              </td>
            </tr>
          ))}
          {showEdit && (
            <tr>
              <td>
                <label htmlFor="id">ID:</label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={habitantInput.id}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <label htmlFor="nom">Nom:</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={habitantInput.nom}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <label htmlFor="prenom">Prénom:</label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  value={habitantInput.prenom}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <label htmlFor="adresse">Adresse:</label>
                <input
                  type="text"
                  name="adresse"
                  id="adresse"
                  value={habitantInput.adresse}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <label htmlFor="telephone">Téléphone:</label>
                <input
                  type="text"
                  name="telephone"
                  id="telephone"
                  value={habitantInput.telephone}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={habitantInput.email}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <label htmlFor="genre">Genre:</label>
                <input
                  type="text"
                  name="genre"
                  id="genre"
                  value={habitantInput.genre}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <label htmlFor="dateNaissance">Date de naissance:</label>
                <input
                  type="date"
                  name="dateNaissance"
                  id="dateNaissance"
                  value={habitantInput.dateNaissance}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button onClick={() => saveHabitant(habitant.id)}>Enregistrer</button>
                <button onClick={() => setShowEdit(false)}>Annuler</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowHabitant;