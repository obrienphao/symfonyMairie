<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\LoginRepository;
use Symfony\Component\HttpFoundation\RedirectResponse;

class AuthentificationController extends AbstractController
{
    #[Route('/authentification', name: 'app_authentification', methods: ['POST'])]
    public function authentification(Request $request, EntityManagerInterface $entityManager, LoginRepository $loginRepository): RedirectResponse
    {
        $nom = $request->request->get('nom');
        $password = $request->request->get('password');

        $login = $loginRepository->findOneBy(['Identifiant' => $nom, 'MotDePasse' => $password]);

        if ($login) {
            
            //return new JsonResponse(['success' => true, 'message' => 'Login successful']);
    
            //return new AccueilController($this->redirectToRoute('accueil_redirection'));

        } else {
            return new RedirectResponse($this->generateUrl('app_redirection'));
           
        }
    }

    
}



 

