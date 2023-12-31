<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use Symfony\Component\HttpFoundation\JsonResponse;

use App\Entity\Recensement;
use App\Repository\RecensementRepository;

class UpdateHabitantController extends AbstractController
{
    private $recensementRepository;
    private $entityManager;
    private $validator;

    public function __construct(RecensementRepository $recensementRepository, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $this->recensementRepository = $recensementRepository;
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    /**
     * @Route("/habitant/{id}", name="update_habitant", methods={"PUT"})
     */
    #[Route('/update/habitant/{id}', name: 'app_update_habitant',methods:"PUT")]
    public function updateHabitantByID(Request $request, $id): JsonResponse
    {
        // Récupérer les données envoyées en PUT
        $data = json_decode($request->getContent(), true);

        // Mettre à jour l'habitant en utilisant la méthode `updateHabitant` de votre service
        $habitant = $this->updateHabitant($id, $data);

        // Renvoyer une réponse JSON avec le habitant mis à jour
        return new JsonResponse(['habitant' => $habitant], 200);
    }

    public function getHabitant(int $id): Recensement
    {
        $recensement = $this->recensementRepository->find($id);

        if (!$recensement) {
            throw new \Exception('Habitant non trouvé');
        }

        return $recensement;
    }

    public function updateHabitant(int $id, array $data): Recensement
    {
        $habitant = $this->getHabitant($id);

        if (isset($data['nom'])) {
            $habitant->setNom($data['nom']);
        }
    
        if (isset($data['prenom'])) {
            $habitant->setPrenom($data['prenom']);
        }
    
        if (isset($data['email'])) {
            $habitant->setEmail($data['email']);
        }
    
        if (isset($data['adresse'])) {
            $habitant->setAdresse($data['adresse']);
        }
    
        if (isset($data['telephone'])) {
            $habitant->setTelephone($data['telephone']);
        }
    
        if (isset($data['genre'])) {
            $habitant->setGenre($data['genre']);
        }

        // Valider les données envoyées
        $errors = $this->validator->validate($habitant);
        if (count($errors) > 0) {
            throw new \Exception((string) $errors);
        }

        // Mettre à jour l'habitant
        $this->entityManager->flush();

        return $habitant;
    }
}