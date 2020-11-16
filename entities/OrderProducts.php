<?php

// Сущность записи в таблице соотношений товаров и заказов.

namespace app\entities;

class OrderProducts extends Entity
{
    public $orderID;
    public $goodID;
    public $count;
}
