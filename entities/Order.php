<?php

// Сущность заказа.

namespace app\entities;

class Order extends Entity
{
    public $id;
    public $userID;
    public $tel;
    public $address;
    public $email;
    public $goodsPrice;
    public $shippingPrice;
    public $discountPrice;
    public $cost;
    public $login;
    public $status;
}
