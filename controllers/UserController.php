<?php

// Контроллер, отвечающий за операции с пользователями.

namespace app\controllers;

use app\entities\User;

class UserController extends Controller
{
    // Добавить пользователя.
    public function addAction()
    {
        if ('application/json' != $_SERVER['CONTENT_TYPE'] || 'POST' != $_SERVER['REQUEST_METHOD']) {
            return json_encode('Ошибка в запросе: неправильный заголовок или метод.');
        }

        $json = json_decode(file_get_contents('php://input'));

        if (empty($json->password) || empty($json->login)) {
            return json_encode('Введите логин и пароль');
        }

        if ($this->container->userRepository->getOneWhere('login', $json->login)) {
            return json_encode('Логин уже занят');
        }

        if ($this->container->userRepository->getOneWhere('email', $json->email)) {
            return json_encode('С таким email уже зарегистрирован пользователь');
        }

        $user = new User();
        foreach ($user as $fieldName => $value) {
            if ($fieldName == 'id') {
                continue;
            }

            if ($fieldName == 'password') {
                $user->$fieldName = password_hash($json->$fieldName, PASSWORD_DEFAULT);
                continue;
            }

            if ($fieldName == 'isAdmin') {
                $user->$fieldName = 0;
                continue;
            }

            $user->$fieldName = $json->$fieldName;
        }

        $this->container->userRepository->save($user);
        return json_encode('Вы успешно зарегистрированы');
    }
}

        