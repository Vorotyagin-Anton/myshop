<?php

// Репозиторий категорий.

namespace app\repositories;

use app\entities\Category;

class CategoryRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'categories';
    }

    protected function getEntityName(): string
    {
        return Category::class;
    }

    // Выборка подкатегорий заданного уровня, id которых находятся в заданном интервале. 
    public function getAllWhereInterval($key, $value, $leftCondition, $rightCondition)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT * FROM $tableName WHERE $key = :$key AND $leftCondition AND $rightCondition";
        $params = [":$key" => $value];
        return $this->getDB()->getAllObjects($sql, $this->getEntityName(), $params);
    }

    // Выборка подкатегорий заданного уровня.
    public function getAllLevel($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT * FROM $tableName WHERE $key = :$key";
        $params = [":$key" => $value];
        return $this->getDB()->getAllObjects($sql, $this->getEntityName(), $params);
    }

    // Получить все товары, принадлежащие категории товаров с заданным id.
    public function getCategoryGoods($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `goods`.*, `images`.`path` FROM $tableName INNER JOIN `goodcategories` ON `categories`.`id` = `goodcategories`.`categoryID` INNER JOIN `goods` ON `goods`.`id` = `goodcategories`.`goodID` INNER JOIN `images` ON `goods`.`mainImgID` = `images`.`id` WHERE $key = :key";
        $params = [":key" => $value];
        return $this->getDB()->getAll($sql, $params);
    }

    // Получить всех дизайнеров, принадлежащих категории товаров с заданным id.
    public function getCategoryDesigners($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `designers`.* FROM $tableName INNER JOIN `goodcategories` ON `categories`.`id` = `goodcategories`.`categoryID` INNER JOIN `goods` ON `goods`.`id` = `goodcategories`.`goodID` INNER JOIN `gooddesigners` ON `goods`.`id` = `gooddesigners`.`goodID` INNER JOIN `designers` ON `designers`.`id` = `gooddesigners`.`designerID` WHERE $key = :key GROUP BY `designers`.`name`";
        $params = [":key" => $value];
        return $this->getDB()->getAll($sql, $params);
    }

    // Получить все бренды, принадлежащие категории товаров с заданным id.
    public function getCategoryBrands($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `brands`.* FROM $tableName INNER JOIN `goodcategories` ON `categories`.`id` = `goodcategories`.`categoryID` INNER JOIN `goods` ON `goods`.`id` = `goodcategories`.`goodID` INNER JOIN `goodbrands` ON `goods`.`id` = `goodbrands`.`goodID` INNER JOIN `brands` ON `brands`.`id` = `goodbrands`.`brandID` WHERE $key = :key GROUP BY `brands`.`name`";
        $params = [":key" => $value];
        return $this->getDB()->getAll($sql, $params);
    }
}