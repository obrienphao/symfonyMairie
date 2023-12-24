<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestCoursController extends AbstractController
{
    #[Route('/test/cours', name: 'app_test_cours')]
    public function index(): Response
    {
        return $this->render('test_cours/index.html.twig', [
            'controller_name' => 'TestCoursController',
            'directory' => "https://static.wikia.nocookie.net/heroes-fr/images/7/75/Kakashi_Render.png/revision/latest?cb=20201213163159&path-prefix=fr",
            'float' => 1.8,
            'int' => 20,
        ]);
    }
}
