<?php

// Контроллер, отвечающий за работу личного кабинета пользователя.

namespace app\controllers;

class AuthController extends Controller
{
	// Получить текущего авторизованного пользователя.
    public function getCurrentUserAction()
    {
        $userLogin = $this->container->request->getSession('user');
        $userData = $this->container->userRepository->getOneWhere('login', $userLogin);
        if ($userData) {
            return json_encode($userData);
        }
        return json_encode(false);
    }

    // Вход в личный кабинет.
    public function loginAction()
    {
        if ('application/json' != $_SERVER['CONTENT_TYPE'] || 'POST' != $_SERVER['REQUEST_METHOD']) {
            return json_encode('Ошибка в запросе: неправильный заголовок или метод.');
        }

        $json = json_decode(file_get_contents('php://input'));

        $msg = $this->container->authService->login(
            $this->container->userRepository,
            $this->container->request,
            $json
        );

        return json_encode($msg);
    }

    // Выход из личного кабинета.
    public function outAction()
    {
        $msg = $this->container->authService->out();
        return json_encode($msg);
    }
}
