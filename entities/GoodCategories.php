<?php

// Сущность записи в таблице соотношений товаров и категорий.

namespace app\entities;

class GoodCategories extends Entity
{
    public $goodID;
    public $categoryID;
}
