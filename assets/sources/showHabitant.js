import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowHabitant = () => {
 const [habitants, setHabitants] = useState([]);
 const [habitant, setHabitant] = useState({});
 const [showEdit, setShowEdit] = useState(false);
 const [habitantToEdit, setHabitantToEdit] = useState(null);
 const [habitantInput, setHabitantInput] = useState({
    id: '',
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    telephone: '',
    genre: '',
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
      });

      if (response.data) {
        setHabitants(habitants.map((habitant) => habitant.id === id ? response.data : habitant));
        setShowEdit(false);
      }
    } catch (error) {
      console
    }
 }

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

 return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Adresse</th>
          <th>Téléphone</th>
          <th>Email</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {habitants.map((habitant) => (
          <tr key={habitant.id}>
            <td>{habitant.id}</td>
            <td>{habitant.nom}</td>
            <td>{habitant.prenom}</td>
            <td>{habitant.adresse}</td>
            <td>{habitant.telephone}</td>
            <td>{habitant.email}</td>
            <td>{habitant.genre}</td>
            <td>
              <button onClick={() => deleteHabitant(habitant.id)}>Supprimer</button>
              <button onClick={() => editHabitant(habitant.id)}>Modifier</button>
            </td>
          </tr>
        ))}
        {showEdit && (
          <tr>
            <td colSpan="2">
              <input
                type="text"
                name="nom"
                value={habitantInput.nom}
                onChange={handleInputChange}
              />
            </td>
            <td colSpan="2">
              <input
                type="text"
                name="prenom"
                value={habitantInput.prenom}
                onChange={handleInputChange}
              />
            </td>
            <td colSpan="2">
              <input
                type="text"
                name="email"
                value={habitantInput.email}
                onChange={handleInputChange}
              />
            </td>
            <td colSpan="2">
              <input
                type="text"
                name="telephone"
                value={habitantInput.telephone}
                onChange={handleInputChange}
              />
            </td>
            <td colSpan="2">
              <input
                type="text"
                name="adresse"
                value={habitantInput.adresse}
                onChange={handleInputChange}
              />
            </td>
            <td colSpan="2">
              <input
                type="text"
                name="genre"
                value={habitantInput.genre}
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
 );
};

export default ShowHabitant;