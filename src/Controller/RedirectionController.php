<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RedirectionController extends AbstractController
{
    #[Route('/redirection', name: 'app_redirection')]
    public function redirection(): Response
    {
        return $this->render('redirection/index.html.twig', [
            'controller_name' => 'RedirectionController',
        ]);
    }
}
