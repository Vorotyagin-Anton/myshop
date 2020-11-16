<?php

// Сущность пользователя.

namespace app\entities;

class User extends Entity
{
    public $id;
    public $login;
    public $password;
	public $email;
	public $address;
	public $isAdmin;
}
