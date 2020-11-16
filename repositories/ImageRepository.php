<?php

// Репозиторий изображений товаров.

namespace app\repositories;

use app\entities\Image;

class ImageRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'images';
    }

    protected function getEntityName(): string
    {
        return Image::class;
    }
}