<?php

// Репозиторий пользователей.

namespace app\repositories;

use app\entities\User;

class UserRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'users';
    }

    protected function getEntityName(): string
    {
        return User::class;
    }
}