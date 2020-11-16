<?php

// Сущность записи в таблице соотношений товаров и размеров.

namespace app\entities;

class GoodSizes extends Entity
{
    public $goodID;
    public $sizeID;
}
