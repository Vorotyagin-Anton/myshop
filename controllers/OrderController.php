<?php

// Контроллер, отвечающий за манипуляции с заказами.

namespace app\controllers;

class OrderController extends Controller
{

    // Оформить заказ.
    public function addAction()
    {
        if ('application/json' != $_SERVER['CONTENT_TYPE'] || 'POST' != $_SERVER['REQUEST_METHOD']) {
            return json_encode('Ошибка в запросе: неправильный заголовок или метод.');
        }

        $json = json_decode(file_get_contents('php://input'));

        $msg = $this->container->orderService->add(
            $this->container->orderRepository,
            $this->container->orderProductsRepository,
            $this->container->userRepository,
            $this->container->request,
            $this->container->basketService::BASKET_NAME,
            $this->container->authService::AUTH_INDEX,
            $json
        );

        if ($msg == "Не все параметры переданы"){
            return json_encode($msg);
        }

        $this->container->request->setSession($this->container->basketService::BASKET_NAME, '');

        return json_encode($msg);
    }

    // Изменить статус заказа.
    public function statusAction()
    {
        if ('application/json' != $_SERVER['CONTENT_TYPE'] || 'POST' != $_SERVER['REQUEST_METHOD']) {
            return json_encode('Ошибка в запросе: неправильный заголовок или метод.');
        }

        $json = json_decode(file_get_contents('php://input'));

        $msg = $this->container->orderService->status(
            $json,
            $this->container->orderRepository
        );
        
        return json_encode($msg);
    }

    // Отобразить заказы одного пользователя.
    public function oneAction()
    {
        $fullOrders = [];
        $user = $this->container->request->getSession($this->container->authService::AUTH_INDEX);
        $userID = $this->container->userRepository->getOneWhere('login', $user)->id;
        $orders = $this->container->orderRepository->getAllWhere('userID', $userID);

        foreach ($orders as $order) {
            $goods = $this->container->orderRepository->getOrderGoods("`orders`.`id`", $order->id);
            $order->goods = $goods;
            $fullOrders[] = $order;
        }

        return json_encode($fullOrders);
    }

    // Отобразить заказы всех пользователей.
    public function allAction()
    {
        $fullOrders = [];
        $orders = $this->container->orderRepository->getAll();

        foreach ($orders as $order) {
            $goods = $this->container->orderRepository->getOrderGoods("`orders`.`id`", $order->id);
            $order->goods = $goods;
            $fullOrders[] = $order;
        }

        return json_encode($fullOrders);
    }

}
