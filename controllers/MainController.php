<?php

// Контроллер, отвечающий за отображение главной страницы.

namespace app\controllers;

class MainController extends Controller
{
	// Отобразить главную страницу.
    public function indexAction()
    {
        return $this->container->renderer
            ->render(
                'index'
            );
    }
}
