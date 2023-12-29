<?php

namespace App\Controller;

use App\Entity\Recensement;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DeleteHabitantController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/habitant/delete/{id}", name="delete_habitant", methods={"DELETE"})
     */
    #[Route('habitant/delete/{id}', name: 'delete_habitant',methods:"DELETE")]
    public function deleteHabitant(Request $request, int $id): Response
    {
        try {
            $habitant = $this->entityManager->getRepository(Recensement::class)->find($id);

            if (!$habitant) {
                return $this->json(['message' => 'Aucun habitant trouvé pour l\'ID : '.$id], Response::HTTP_NOT_FOUND);
            }

            $this->entityManager->remove($habitant);
            $this->entityManager->flush();

            return $this->json(['message' => 'Habitant supprimé avec succès']);
        } catch (EntityNotFoundException $e) {
            return $this->json(['message' => 'Aucun habitant trouvé pour l\'ID : '.$id], Response::HTTP_NOT_FOUND);
        }
    }

    
}