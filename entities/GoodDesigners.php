<?php

// Сущность записи в таблице соотношений товаров и дизайнеров.

namespace app\entities;

class GoodDesigners extends Entity
{
    public $goodID;
    public $designerID;
}
