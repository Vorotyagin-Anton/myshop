<?php

// интерфейс для классов типа 'render'.

namespace app\services;

interface RenderI
{
    public function render($template, $params = []);
}