import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowHabitant = () => {
 const [habitants, setHabitants] = useState([]);

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
    
          setShowEdit(true);
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
      </tbody>
    </table>
 );
};

export default ShowHabitant;