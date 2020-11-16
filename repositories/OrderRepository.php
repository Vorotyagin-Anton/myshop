<?php

// Репозиторий заказов.

namespace app\repositories;

use app\entities\Order;

class OrderRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'orders';
    }

    protected function getEntityName(): string
    {
        return Order::class;
    }

    // Получить все товары, принадлежащие заказу
    public function getOrderGoods($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `goods`.*, `orders_products`.`count`, `images`.`path` FROM orders INNER JOIN orders_products ON `orders`.`id` = `orders_products`.`orderID` INNER JOIN goods ON `orders_products`.`goodID` = `goods`.`id` INNER JOIN users ON `orders`.`userID` = `users`.`id` INNER JOIN images ON `images`.`id` = `goods`.`mainImgID` WHERE $key = :key";
        $params = [":key" => $value];
        return $this->getDB()->getAll($sql, $params);
    }
}