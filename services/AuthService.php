<?php

// сервис, реализующий функционал авторизации пользователей - login и logout.

namespace app\services;

use app\repositories\UserRepository;

class AuthService
{
    // имя параметра в $_SESSION для хранения логина авторизованного пользователя.
    const AUTH_INDEX = 'user';

    // login.
    public function login(UserRepository $userRepository, Request $request, $json)
    {
        $password = $json->password;
        $email = $json->email;

        if (empty($password) || empty($email)) {
            return 'Не введен адрес электронной почты или пароль.';
        }

        $userData = $userRepository->getOneWhere('email', $email);
        if (!empty($userData) && password_verify($password, $userData->password)) {
            $request->setSession(self::AUTH_INDEX, $userData->login);
            return 'successfully';
        }
        return "Неверно указан адрес электронной почты или пароль.";
    }

    // logout.
    public function out()
    {
        session_destroy();
        return "Пользователь вышел из личного кабинета.";
    }
}