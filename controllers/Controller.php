<?php

// Родительский класс для всех контроллеров, определяющий логику запуска действий (action).

namespace app\controllers;

use app\main\Container;

abstract class Controller
{
	// Действие по умолчанию.
    protected $actionDefault = 'index';

    // Подключение контейнера.
    protected $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    // Запуск контроллера с указанным action.
    public function run($action)
    {
        if (empty($action)) {
            $action = $this->actionDefault;
        }

        $action .= "Action";

        if (!method_exists($this, $action)) {
            return '404';
        }

        return $this->$action();
    }
}