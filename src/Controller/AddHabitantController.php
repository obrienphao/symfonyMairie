<?php

namespace App\Controller;
use App\Entity\Recensement;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\RecensementRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class AddHabitantController extends AbstractController
{
    #[Route('/add/habitant', name: 'app_add_habitant', methods: ['POST'])]
    public function addHabitant(Request $request, EntityManagerInterface $entityManager, ParameterBagInterface $flashBag): Response
    {
        // Récupérez les données envoyées via la requête POST
        $data = json_decode($request->getContent(), true);

        // Validez les données et enregistrez le recensement
        $recensement = new Recensement();


        //On test qu'aucun champ n'est vide

        /*if(!($data['nom'] & $data['prenom'] & $data['telephone'] )){
            return new JsonResponse([ 'status' => 'error',
            'message' => "Tous les champs ne sont pas remplis",
            ]);
        }*/

        if (!$data['nom']) {
          return  new JsonResponse([
                'status' => 'error',
                'message' => 'Le nom est obligatoir ',
            ]);
        }

        if (!$data['prenom']) {
            return  new JsonResponse([
                'status' => 'error',
                'message' => 'Le prénom est obligatoire ',
            ]);
        }

        if (!$data['adresse']) {
            return  new JsonResponse([
                
                'status' => 'error',
                'message' => 'L\'adresse est obligatoire ',
            ]);
        }


        /*
        *Test sur les charactères speciaux
        */
        if (!preg_match('/^[a-zA-ZÀ-ÿ0-9\s]+$/', $data['prenom'])) {
            return  new JsonResponse([
                'status' => 'error',
                'message' => 'Le prénom ne doit pas contenir de caractères spéciaux ($,#,£,€,*,µ...)',
            ]);
        }

        /*
        *Test sur les charactères speciaux
        */
        if (!preg_match('/^[a-zA-ZÀ-ÿ0-9\s]+$/', $data['nom'])) {
            return  new JsonResponse([
                'status' => 'error',
                'message' => 'Le nom ne doit pas contenir de caractères spéciaux ($,#,£,€,*,µ...)',
            ]);
        }


        if (strlen($data['telephone']) !== 10) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Le numéro de téléphone doit contenir exactement 10 chiffres',
            ]);
        }

        if (!$data['dateNaissance']) {
            return  new JsonResponse([
                'status' => 'error',
                'message' => 'Le champ date de naisssance est vide ',
            ]);
        }

        /*
        *Test sur les charactères speciaux
        */

        if (!preg_match('/^[a-zA-ZÀ-ÿ0-9\s]+$/', $data['adresse'])) {
            return  new JsonResponse([
                'status' => 'error',
                'message' => 'L\'adresse ne doit pas contenir de caractères spéciaux ($,#,£,€,*,µ...)',
            ]);
        }

        $recensement->setNom($data['nom']);
        $recensement->setPrenom($data['prenom']);
        $recensement->setEmail($data['email']);
        $recensement->setTelephone($data['telephone']);
        $recensement->setAdresse($data['adresse']);
        $recensement->setGenre($data['genre']);
        $recensement->setDateDeNaissance($data['dateNaissance']);
      
        // Ajoutez un message flash à la session
       // $flashBag->add('success', 'Habitant added successfully');

        // Utilisez l'EntityManager pour enregistrer les données
        try {
            $entityManager->persist($recensement);
            $entityManager->flush();
        
            // Renvoyez la réponse en JSON
            return new JsonResponse([
                'status' => 'success',
                'message' => 'Habitant added successfully',
            ]);
        } catch (\Exception $e) {
            // Gérez l'exception en envoyant un message d'erreur en JSON
           // $flashBag->add('error', 'An error occurred while adding the habitant: ' . $e->getMessage());
            return new JsonResponse([
                'status' => 'error',
                'message' => 'An error occurred while adding the habitant: ' . $e->getMessage(),
            ]);
        }
    }
}
