<?php

// сервис, который из товаров в корзине формирует заказ.

namespace app\services;

use app\repositories\OrderRepository;
use app\repositories\OrderProductsRepository;
use app\repositories\UserRepository;
use app\services\Request;
use app\entities\Order;
use app\entities\OrderStatus;
use app\entities\OrderProducts;

class OrderService
{
    // если пользователь не авторизовался, то заказ будет сохранён за пользователем с логин 'default' и id = 1
    const DEFAULT_USERID = '1';

    // сформировать заказ.
    public function add(OrderRepository $orderRepository, OrderProductsRepository $orderProductsRepository, UserRepository $userRepository, Request $request, $basketName, $authIndex, $json)
    {
        $userID = $json->userID;
        if (empty($userID)) {
            $userID = self::DEFAULT_USERID;
        }
        $login = $json->login;
        if (empty($login)) {
            $login = 'default';
        }

        $order = new Order();
        foreach ($order as $fieldName => $value) {
            if ($fieldName == 'id') {
                continue;
            }
            if ($fieldName == 'userID') {
                $order->$fieldName = $userID;
                continue;
            }
            if ($fieldName == 'login') {
                $order->$fieldName = $login;
                continue;
            }
            if ($fieldName == 'status') {
                $order->$fieldName = 'Заказ оформлен';
                continue;
            }
            $order->$fieldName = $json->$fieldName;
        }

        $orderID = $orderRepository->save($order)->id;

        if (!$orderID) {
            return "Не все параметры переданы";
        }

        $orderProducts = new OrderProducts();
        $orderProducts->orderID = $orderID;
        $goods = $json->goodsBasket;
        foreach ($goods as $good) {
            $orderProducts->goodID = $good->id;
            $orderProducts->count = $good->count;
            $orderProductsRepository->save($orderProducts);
        }

        return "Заказ $orderID успешно добавлен";
    }

    // изменить статус заказа.
    public function status($json, OrderRepository $orderRepository)
    {
        $orderID = $json->orderID;
        $status = $json->status;
        $orderStatus = new OrderStatus();
        $orderStatus->id = $orderID;
        $orderStatus->status = $status;
        $orderRepository->save($orderStatus);

        return "Статус заказ $orderID изменён на $json->status";
    }
}