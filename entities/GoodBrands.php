<?php

// Сущность записи в таблице соотношений товаров и брендов.

namespace app\entities;

class GoodBrands extends Entity
{
    public $goodID;
    public $brandID;
}
