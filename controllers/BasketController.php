<?php

// Контроллер, отвечающий за манипуляции с корзиной.

namespace app\controllers;

class BasketController extends Controller
{
	// Получить товары в корзине.
    public function getGoodsBasketAction()
    {
        $basket = $this->container->request->getSession($this->container->basketService::BASKET_NAME);
        $goods = [];
        foreach ($basket as $id => $good) {
            $goods[] = $good;
        }
        return json_encode($goods);
    }

    // Добавить товар в корзину.
    public function addAction()
    {
        $msg = $this->container->basketService->add(
            $this->container->request->getId(),
            $this->container->goodRepository,
            $this->container->request
        );
        return json_encode($msg);
    }

    // Удалить товар из корзины.
    public function delAction()
    {
        $msg = $this->container->basketService->del(
            $this->container->request->getId(),
            $this->container->request
        );
        return json_encode($msg);
    }

    // Очистить корзину
    public function delAllAction()
    {
        $_SESSION[$this->container->basketService::BASKET_NAME] = [];
        return json_encode('Корзина пуста');
    }    

}
