<?php

// класс для запуска приложения

namespace app\main;

use app\traits\SingletonTrait;

class App
{
    use SingletonTrait;

    protected $config;

    protected $container;

    // через вызов call() реализован паттерн Singleton - app\traits\SingletonTrait
    public static function call()
    {
        return static::getInstance();
    }

    // записываем конфигурацию и создаём контейнер - app\main\Container . Запускаем дефолтный контроллер.
    public function run($config)
    {
        $this->container = new Container($config['components']);
        $this->config = $config;
        $this->runController();
    }

    // название контроллера и действия (Action) считываем из url строки методами, описанными в сервисе app\services\Request . Выводим ответ от контроллера на экран.
    private function runController()
    {
        $controllerName = $this->config['defaultController'];
        if (!empty($this->container->request->getControllerName())) {
            $controllerName = $this->container->request->getControllerName();
        }

        $controllerClass = 'app\\controllers\\' . ucfirst($controllerName) . 'Controller';

        if (class_exists($controllerClass)) {
            $controller = new $controllerClass($this->container);
            echo $controller->run($this->container->request->getActionName());
        } else {
            echo '404';
        }
    }
}