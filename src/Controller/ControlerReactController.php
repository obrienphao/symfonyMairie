<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse as JsonResponse;


class ControlerReactController extends AbstractController
{
    #[Route('/controler/react', name: 'app_controler_react')]
    public function index(): Response
    {
        return $this->render('controler_react/index.html.twig', [
            'controller_name' => 'ControlerReactController',
        ]);
    }

}
