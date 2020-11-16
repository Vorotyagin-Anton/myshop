<?php

// сервис для работы (запись\чтение) с глобальными переменными $_GET, $_POST, $_FILES, $_SESSION .

namespace app\services;

class Request
{
    protected $requestString;
    protected $controllerName = '';
    protected $actionName = '';
    protected $params = [
        'get' => [],
        'post' => [],
        'files' => [],
    ];

    // получение названия контроллера и экшена и чтение глобальных переменных.
    public function __construct()
    {
        session_start();
        $this->requestString = $_SERVER['REQUEST_URI'];
        $this->parseRequest();
        $this->fillParams();
    }
    // обработка строки запроса.
    protected function parseRequest()
    {
        $pattern = "#(?P<controller>\w+)[/]?(?P<action>\w+)?[/]?[?]?(?P<params>.*)#ui";
        if (preg_match_all($pattern, $this->requestString, $matches)) {
            if (!empty($matches['controller'][0])) {
                $this->controllerName = $matches['controller'][0];
            }

            if (!empty($matches['action'][0])) {
                $this->actionName = $matches['action'][0];
            }
        }
    }
    // Заполнение параметров.
    protected function fillParams()
    {
        $this->params = [
            'get' => $_GET,
            'post' => $_POST,
            'files' => $_FILES,
        ];
    }

    // Получить название контроллера.
    public function getControllerName(): string
    {
        return $this->controllerName;
    }
    // Получить название экшена.
    public function getActionName(): string
    {
        return $this->actionName;
    }

    // Методы для работы с глобальными переменными.
    public function getId()
    {
        if (empty($this->params['get']['id'])) {
            return 0;
        }

        return (int)$this->params['get']['id'];
    }

    public function getFromPost($key = null)
    {
        if (empty($key)) {
            return $this->params['post'];
        }

        if (empty($this->params['post'][$key])) {
            return [];
        }

        return $this->params['post'][$key];
    }

    public function getFromGet($key = null)
    {
        if (empty($key)) {
            return $this->params['get'];
        }

        if (empty($this->params['get'][$key])) {
            return [];
        }

        return $this->params['get'][$key];
    }

    public function getFileInfo($fileName)
    {
        return $this->params['files'][$fileName];
    }

    public function getSession($key = null)
    {
        if (empty($key)) {
            return $_SESSION;
        }

        if (empty($_SESSION[$key])) {
            return [];
        }

        return $_SESSION[$key];
    }

    public function setSession($key, $value)
    {
        $_SESSION[$key] = $value;
    }
}