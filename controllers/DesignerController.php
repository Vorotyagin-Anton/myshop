<?php

// Контроллер, отвечающий за операции с дизайнерами.

namespace app\controllers;

use app\entities\Designer;

class DesignerController extends Controller
{
	// Получить список всех дизайнеров.
    public function allAction()
    {
        $designers = $this->container->designerRepository->getAll();
        return json_encode($designers);
    }
}
