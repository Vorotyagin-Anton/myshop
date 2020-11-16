<?php

// Репозиторий соотношений товаров и дизайнеров.

namespace app\repositories;

use app\entities\GoodDesigners;

class GoodDesignersRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'gooddesigners';
    }

    protected function getEntityName(): string
    {
        return GoodDesigners::class;
    }
}