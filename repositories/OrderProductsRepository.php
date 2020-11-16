<?php

// Репозиторий соотношений товаров и заказов.

namespace app\repositories;

use app\entities\OrderProducts;

class OrderProductsRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'orders_products';
    }

    protected function getEntityName(): string
    {
        return OrderProducts::class;
    }
}