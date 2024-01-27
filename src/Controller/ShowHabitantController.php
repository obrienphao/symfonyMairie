<?php

namespace App\Controller;
use App\Entity\Recensement;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class ShowHabitantController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

   

    /**
     * @Route("/show/habitant", name="show_habitant", methods={"GET"})
     */
    #[Route('/show/habitant', name: 'show_habitant',methods:"GET")]
    public function getHabitantData(): JsonResponse
    {
        $habitants = $this->entityManager->getRepository(Recensement::class)->findAll();
        $responseArray = [];

        foreach ($habitants as $habitant) {
           
            $responseArray[] = [
                'id' => $habitant->getId(),
                'nom' => $habitant->getNom(),
                'prenom' => $habitant->getPrenom(),
                'adresse' => $habitant->getAdresse(),
                'telephone' => $habitant->getTelephone(),
                'email' => $habitant->getEmail(),
                'genre' => $habitant->getGenre(),
                'dateNaissance' => $habitant->getDateDeNaissance(),
                
            ];
        }

        $response = new JsonResponse($responseArray);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');
        $response->headers->set('Access-Control-Allow-Methods', '*');

        return $response;
    }
}