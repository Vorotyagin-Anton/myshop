<?php

// сервис для подключения Twig с шаблонами и реализации метода отображения контента.

namespace app\services;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class TwigRenderServices implements RenderI
{
    protected $twig;

    // подключаем шаблоны и запускаем Twig.
    public function __construct()
    {
        $loader = new FilesystemLoader([
            dirname(__DIR__) . '/views/layouts',
            dirname(__DIR__) . '/views/',
        ]);

        $this->twig = new Environment($loader);
    }

    // метод для рендера через Twig.
    public function render($template, $params = [])
    {
        $template .= '.twig';
        return $this->twig->render($template, $params);
    }
}
