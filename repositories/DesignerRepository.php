<?php

// Репозиторий дизайнеров.

namespace app\repositories;

use app\entities\Designer;

class DesignerRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'designers';
    }

    protected function getEntityName(): string
    {
        return Designer::class;
    }
}