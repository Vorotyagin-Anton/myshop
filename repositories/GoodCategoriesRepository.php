<?php

// Репозиторий соотношений товаров и категорий.

namespace app\repositories;

use app\entities\GoodCategories;

class GoodCategoriesRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'goodcategories';
    }

    protected function getEntityName(): string
    {
        return GoodCategories::class;
    }
}