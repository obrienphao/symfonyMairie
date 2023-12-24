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
        $recensement->setNom($data['nom']);
        $recensement->setPrenom($data['prenom']);
        $recensement->setEmail($data['email']);
        $recensement->setTelephone($data['telephone']);
        $recensement->setAdresse($data['adresse']);
        $recensement->setGenre($data['genre']);

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
