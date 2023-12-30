<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Recensement;

class GetHabitantController extends AbstractController
{

    /**
     * @Route("/get/habitant/{id}", name="get_habitant_by_id", methods={"GET"})
     */
    #[Route('/get/habitant/{id}', name: 'app_get_habitant',methods:"GET")]
    public function getHabitantById(int $id, Recensement $recensement): Response
    {
        if (!$recensement) {
            return new Response('Aucun habitant trouvé avec cet identifiant.');
        }

        $response = new Response(json_encode([
            'id' => $recensement->getId(),
            'nom' => $recensement->getNom(),
            'prenom' => $recensement->getPrenom(),
            'adresse' => $recensement->getAdresse(),
            'telephone' => $recensement->getTelephone(),
            'email' => $recensement->getEmail(),
            'genre' => $recensement->getGenre(),
        ]));

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}