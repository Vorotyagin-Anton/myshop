<?php

// Реализация паттерна Singleton.

namespace app\traits;

trait SingletonTrait
{
    private static $item;

    public static function getInstance()
    {
        if (empty(static::$item)) {
            static::$item = new static();
        }

        return static::$item;
    }

    protected function __construct() {}
    protected function __clone() {}
    protected function __wakeup() {}
}