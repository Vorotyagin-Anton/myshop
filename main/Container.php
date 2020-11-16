<?php

// класс для подключения компонентов (классов) приложения

namespace app\main;

// Репозитории для получения данных
use app\repositories\GoodRepository;
use app\repositories\UserRepository;
use app\repositories\OrderRepository;
use app\repositories\OrderProductsRepository;
use app\repositories\SubscriberRepository;
use app\repositories\DesignerRepository;
use app\repositories\CategoryRepository;
use app\repositories\ImageRepository;
use app\repositories\BrandRepository;
use app\repositories\GoodBrandsRepository;
use app\repositories\GoodCategoriesRepository;
use app\repositories\GoodDesignersRepository;
use app\repositories\GoodSizesRepository;
// Сервисы
use app\services\BasketService;
use app\services\AuthService;
use app\services\DB;
use app\services\TwigRenderServices;
use app\services\Request;
use app\services\OrderService;
use app\services\CategoryService;

class Container
{
    protected $componentsData = [];
    protected $components = [];

    // при создании контейнера аргументом передаётся перечень компонентов из config.php .
    public function __construct(array $componentsData)
    {
        $this->componentsData = $componentsData;
    }

    // если при обращении к контейнеру компонент не найден в $this->components, то он будет записан туда из $this->componentsData. 
    public function __get($name)
    {
        if (array_key_exists($name, $this->components)) {
            return $this->components[$name];
        }

        if (!array_key_exists($name, $this->componentsData)) {
            throw new \Exception('В компонентах не определен класс ' . $name);
        }

        $className = $this->componentsData[$name]['class'];
        if (!empty($this->componentsData[$name]['config'])) {
            $config = $this->componentsData[$name]['config'];
            $component = new $className($config);
        } else {
            $component = new $className();
        }

        if (method_exists($component, 'setContainer')) {
            $component->setContainer($this);
        }

        $this->components[$name] = $component;

        return $component;
    }
}