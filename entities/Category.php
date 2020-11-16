<?php

// Сущность категории.

namespace app\entities;

class Category extends Entity
{
    public $id;
    public $leftIndex;
    public $rightIndex;
    public $level;
    public $name;
    public $hotDeal;
    public $featured;
}
