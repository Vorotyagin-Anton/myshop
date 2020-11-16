<?php

// Контроллер, отвечающий за работу блока "social" (подписка на рассылку и цитаты дизайнеров).

namespace app\controllers;

use app\entities\Subscriber;

class SocialController extends Controller
{
    // Подписаться на рекламную рассылку.
    public function subscribeAction()
    {
        if ('application/json' != $_SERVER['CONTENT_TYPE'] || 'POST' != $_SERVER['REQUEST_METHOD']) {
            return json_encode('Ошибка в запросе: неправильный заголовок или метод.');
        }

        $json = json_decode(file_get_contents('php://input'));

        if ($this->container->subscriberRepository->getOneWhere('email', $json->email)) {
            return json_encode('Вы подписаны на рассылку');
        }

        $subscriber = new Subscriber();
        $subscriber->email = $json->email;
        $test = $this->container->subscriberRepository->save($subscriber);

        return json_encode('Вы подписались на рассылку');
    }
}
