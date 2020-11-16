<?php

// Репозиторий соотношений товаров и размеров.

namespace app\repositories;

use app\entities\GoodSizes;

class GoodSizesRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'goodsizes';
    }

    protected function getEntityName(): string
    {
        return GoodSizes::class;
    }
}