<?php

// Репозиторий подписчиков.

namespace app\repositories;

use app\entities\Subscriber;

class SubscriberRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'subscribers';
    }

    protected function getEntityName(): string
    {
        return Subscriber::class;
    }
}