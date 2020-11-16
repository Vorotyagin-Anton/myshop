<?php

// в конфигурации указаны основные параметры и подключаемые компоненты (классы) для работы класса app\main\Container.

return [
    'defaultController' => 'main',
    'components' => [
        'db' => [
            'class' => \app\services\DB::class,
            'config' => [
                'driver' => 'mysql',
                'host' => 'localhost',
                'db' => 'myshop',
                'charset' => 'UTF8',
                'login' => 'root',
                'password' => 'pae_954',
            ]
        ],
        'request' => [
            'class' => \app\services\Request::class,
        ],
        'renderer' => [
            'class' => \app\services\TwigRenderServices::class,
        ],
        'basketService' => [
            'class' => \app\services\BasketService::class,
        ],
        'authService' => [
            'class' => \app\services\AuthService::class,
        ],
        'orderService' => [
            'class' => \app\services\OrderService::class,
        ],
        'categoryService' => [
            'class' => \app\services\CategoryService::class,
        ],
        'goodRepository' => [
            'class' => \app\repositories\GoodRepository::class,
        ],
        'userRepository' => [
            'class' => \app\repositories\UserRepository::class,
        ],
        'orderRepository' => [
            'class' => \app\repositories\OrderRepository::class,
        ],
        'orderProductsRepository' => [
            'class' => \app\repositories\OrderProductsRepository::class,
        ],
        'subscriberRepository' => [
            'class' => \app\repositories\SubscriberRepository::class,
        ],
        'designerRepository' => [
            'class' => \app\repositories\DesignerRepository::class,
        ],
        'categoryRepository' => [
            'class' => \app\repositories\CategoryRepository::class,
        ],
        'imageRepository' => [
            'class' => \app\repositories\ImageRepository::class,
        ],
        'brandRepository' => [
            'class' => \app\repositories\BrandRepository::class,
        ],
        'goodBrandsRepository' => [
            'class' => \app\repositories\GoodBrandsRepository::class,
        ],
        'goodCategoriesRepository' => [
            'class' => \app\repositories\GoodCategoriesRepository::class,
        ],
        'goodDesignersRepository' => [
            'class' => \app\repositories\GoodDesignersRepository::class,
        ],
        'goodSizesRepository' => [
            'class' => \app\repositories\GoodSizesRepository::class,
        ],
    ],
];