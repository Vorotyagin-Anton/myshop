<?php

// Репозиторий соотношений товаров и брендов.

namespace app\repositories;

use app\entities\GoodBrands;

class GoodBrandsRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'goodbrands';
    }

    protected function getEntityName(): string
    {
        return GoodBrands::class;
    }
}