<?php

// сервис, реализующий функционал добавления и удаления товаров в корзине.

namespace app\services;

use app\repositories\GoodRepository;

class BasketService
{
    // название параметра в $_SESSION, в котором сохраняются сведения о товарах в корзине.
    const BASKET_NAME = 'goods';

    // добавление товара в корзину.
    public function add($id, GoodRepository $goodRepository, Request $request)
    {
        if (empty($id)) {
            return 'Нет id';
        }

        $good = $goodRepository->getOneGood("`goods`.`id`", $id);
        if (empty($id)) {
            return 'Нет товара';
        }

        $sizes = $goodRepository->getGoodSizes("`goods`.`id`", $id);
        if(!$sizes){
            $good->sizes = [];
        }
        foreach ($sizes as $size) {
            $good->sizes[] = $size['sizeName']; 
        }

        $goods = $request->getSession(self::BASKET_NAME);

        if (empty($goods[$id])) {
            $goods[$id] = [
                'id' => $good->id,
                'name' => $good->name,
                'count' => 1,
                'price' => $good->price,
                'path' => $good->path,
                'color' => $good->color,
                'sizes' => $good->sizes,
            ];

            $request->setSession(self::BASKET_NAME, $goods);
            return "Товар {$goods[$id]['name']} добавлен в корзину";
        }

        $goods[$id]['count']++;
        $request->setSession(self::BASKET_NAME, $goods);
        return "Количество {$goods[$id]['name']} в корзине увеличено на 1";
    }

    // удаление товара из корзины.
    public function del($id, Request $request)
    {
        $goods = $request->getSession(self::BASKET_NAME);
        $goodName = $goods[$id]['name'];
        unset($goods[$id]);
        $msg = "Товар {$goodName} удалён из корзины";
        $request->setSession(self::BASKET_NAME, $goods);
        return $msg;
    }
}