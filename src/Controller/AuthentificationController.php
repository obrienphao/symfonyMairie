<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\LoginRepository;
use App\Entity\Login;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthentificationController extends AbstractController
{
    #[Route('/authentification', name: 'app_authentification', methods: ['POST'])]
    public function authentification(Request $request, EntityManagerInterface $entityManager, LoginRepository $loginRepository): Response
    {
        // Vérifiez que la requête est une requête POST
        if ($request->getMethod() !== 'POST') {
            return new Response('Cette URL ne prend en charge que les requêtes POST.', Response::HTTP_METHOD_NOT_ALLOWED);
        }

        // Récupérez les données envoyées via la requête POST
        $data = json_decode($request->getContent(), true);

        // Validez les données et enregistrez le recensement
        $nom  = $data['nom'] ;
        $password  =  $data['password'];

        $user = $entityManager->getRepository(Login::class)->findOneBy(['Identifiant' => $nom, 'MotDePasse' => $password]);

        if ($user === null) {
            // L'utilisateur n'a pas été trouvé, afficher un message d'erreur ou rediriger vers la page de connexion
            return new Response('Identifiant ou mot de passe incorrect.', Response::HTTP_UNAUTHORIZED);
        } else {
            // L'utilisateur a été trouvé, continuer à traiter les données de l'utilisateur
            //return $this->redirectToRoute('accueil_redirection');
            // Renvoyez une réponse qui charge votre fichier JavaScript
            return new JsonResponse(['url' => $this->generateUrl('accueil_redirection')]);
        }
    }
}