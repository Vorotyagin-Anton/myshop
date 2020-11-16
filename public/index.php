<?php
// Подключаем автозагрузчик из composer. Отредактировали composer.json для подключения своих классов.
include dirname(__DIR__) . '/vendor/autoload.php';
// Получаем массив с основными конфигурационными параметрами
$config = include dirname(__DIR__) . '/main/config.php';
// Запускаем приложение
\app\main\App::call()->run($config);