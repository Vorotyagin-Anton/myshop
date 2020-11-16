<?php

// Контроллер, отвечающий за операции с брендами.

namespace app\controllers;

use app\entities\Brand;

class BrandController extends Controller
{
    // Получить все бренды.
    public function allAction()
    {       
        $brands = $this->container->brandRepository->getAll();
        return json_encode($brands);
    }

}
