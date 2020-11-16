<?php

// Сущность товара.

namespace app\entities;

class Good extends Entity
{
    public $id;
    public $name;
    public $price;
    public $mainImgID;
    public $gender;
    public $description;
    public $sold;
    public $hotDeal;
    public $featured;
    public $color;
}
