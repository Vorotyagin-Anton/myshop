<?php

// Репозиторий товаров.

namespace app\repositories;

use app\entities\Good;

class GoodRepository extends Repository
{
    protected function getTableName(): string
    {
        return  'goods';
    }

    protected function getEntityName(): string
    {
        return Good::class;
    }

    // Получение определённого числа ($from, $limit) товаров отсортированных по значению ($index).
    public function getAllLimitSortWhere($from = 0, $limit, $index = 'null', $key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `goods`.`id`, `goods`.`name`, `goods`.`price`, `images`.`path` as `mainImg` FROM {$tableName} INNER JOIN `images` ON `goods`.`mainImgID` = `images`.`id` WHERE $key = :$key ORDER BY {$index} DESC LIMIT {$from}, {$limit}";
        $params = [":$key" => $value];
        return $this->getDB()->getAllObjects($sql, $this->getEntityName(), $params);
    }

    // Получить товар с ссылкой на гланое изображение товара.
    public function getOneGood($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `goods`.*, `images`.`path` FROM $tableName INNER JOIN `images` ON `goods`.`mainImgID` = `images`.`id` WHERE $key = :key";
        $params = [":key" => $value];
        return $this->getDB()->getObject($sql, $this->getEntityName(), $params);
    }

    // Получить названия всех категорий, к которым принадлежит товар
    public function getGoodCategories($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `categories`.`name` as `categoryName`, `categories`.`id` as `id` FROM $tableName INNER JOIN `goodcategories` ON `goods`.`id` = `goodcategories`.`goodID` INNER JOIN `categories` ON `categories`.`id` = `goodcategories`.`categoryID` WHERE $key = :key ";
        $params = [":key" => $value];
        return $this->getDB()->getAll($sql, $params);
    }

    // Получить id всех категорий, к которым принадлежит товар
    public function getGoodCategoriesID($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `categories`.`id` as `id` FROM $tableName INNER JOIN `goodcategories` ON `goods`.`id` = `goodcategories`.`goodID` INNER JOIN `categories` ON `categories`.`id` = `goodcategories`.`categoryID` WHERE $key = :key ";
        $params = [":key" => $value];
        return $this->getDB()->getAll($sql, $params);
    }

    // Получить имена всех дизайнеров товара
    public function getGoodDesigners($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `designers`.`name` as `designerName` FROM $tableName INNER JOIN `gooddesigners` ON `goods`.`id` = `gooddesigners`.`goodID` INNER JOIN `designers` ON `designers`.`id` = `gooddesigners`.`designerID` WHERE $key = :key ";
        $params = [":key" => $value];
        return $this->getDB()->getAll($sql, $params);
    }

    // Получить названия всех размеров товара
    public function getGoodSizes($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `sizes`.`name` as `sizeName` FROM $tableName INNER JOIN `goodsizes` ON `goods`.`id` = `goodsizes`.`goodID` INNER JOIN `sizes` ON `sizes`.`id` = `goodsizes`.`sizeID` WHERE $key = :key";
        $params = [":key" => $value];
        return $this->getDB()->getAll($sql, $params);
    }

    // Получить названия всех брендов товара
    public function getGoodBrands($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT `brands`.`name` as `brandName` FROM $tableName INNER JOIN `goodbrands` ON `goods`.`id` = `goodbrands`.`goodID` INNER JOIN `brands` ON `brands`.`id` = `goodbrands`.`brandID` WHERE $key = :key";
        $params = [":key" => $value];
        return $this->getDB()->getAll($sql, $params);
    }
}