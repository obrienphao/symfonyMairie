<?php

use App\Kernel;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};

/*
<?php

use App\Middleware\CorsMiddleware;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Runtime\RunnerInterface;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (RunnerInterface $runner) {
    $kernel = new \App\Kernel($_SERVER['APP_ENV'], (bool) $_SERVER['APP_DEBUG']);
    $request = Request::createFromGlobals();
    $response = $runner->run($kernel, $request);

    // Add the CORS middleware here
    $corsMiddleware = new CorsMiddleware();
    $response = $corsMiddleware->process($request, function () use ($response) {
        return $response;
    });

    return $response;
};*/
