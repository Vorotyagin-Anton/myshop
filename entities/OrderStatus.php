<?php

// Сущность "статуса заказа" - искусственная сущность для изменения статуса заказа.

namespace app\entities;

class OrderStatus extends Entity
{
    public $id;
    public $status;
}
