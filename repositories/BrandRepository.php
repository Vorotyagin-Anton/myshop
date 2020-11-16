<?php

// Репозиторий брендов.

namespace app\repositories;

use app\entities\Brand;

class BrandRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'brands';
    }

    protected function getEntityName(): string
    {
        return Brand::class;
    }
}