<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;


class GetHabitantController extends AbstractController
{
    
        /**
     * @Route("/get/habitant/{id}", name="get_habitant_by_id", methods={"GET"})
     */
    #[Route('/get/habitant/{id}', name: 'app_get_habitant',methods:"GET")]
    public function getHabitantById(int $id, RecensementRepository $recensementRepository): Response
    {
        $habitant = $recensementRepository->find($id);

        if (!$habitant) {
            return new Response('Aucun habitant trouvé avec cet identifiant.');
        }

        // Ici, vous pouvez utiliser l'objet $habitant comme vous le souhaitez.
        // Par exemple, vous pouvez le renvoyer en tant que réponse JSON :

        $response = new Response(json_encode([
            'id' => $habitant->getId(),
            'name' => $habitant->getName(),
            'prenom' => $habitant->getPrenom(),
            'adresse' => $habitant->getAdresse(),
            'telephone' => $habitant->getTelephone(),
            'email' => $habitant->getEmail(),
            'genre' => $habitant->getGenre(),
            
        ]));

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
