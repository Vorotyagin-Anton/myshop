<?php

// сервис для обработки категорий товаров из БД.

namespace app\services;

use app\repositories\CategoryRepository;

class CategoryService
{
    // Собрать главное меню.
    public function buildMenu(CategoryRepository $categoryRepository)
    {
        $categories = [];
        $hotDeals['name'] = 'Hot Deals';
        $featured['name'] = 'Featured';

        // Заполняем основные категории (уровень 1)
        $menu = $categoryRepository->getAllWhere('level', 1);
        foreach ($menu as $category) {
            $item = [];
            $item['name'] = $category->name;

            // Заполняем подкатегории (уровень 2)
            $subCategories = $categoryRepository->getAllWhereInterval('level', 2, "`leftIndex` > $category->leftIndex", "`rightIndex` < $category->rightIndex");
            foreach ($subCategories as $subCategory) {
                $subItem = [];
                $subItem['head'] = $subCategory->name;
                // При наличии флагов добавляем подкатегории (уровень 2) в "Hot Deals" и "Featured"
                if ($subCategory->hotDeal) {
                    $subHotDeal = [];
                    $subHotDeal['head'] = $category->name . ": " . $subCategory->name;
                }
                if ($subCategory->featured) {
                    $subFeatured = [];
                    $subFeatured['head'] = $category->name . ": " . $subCategory->name;
                }

                // Заполняем подкатегории (уровень 3)
                $subSubCategories = $categoryRepository->getAllWhereInterval('level', 3, "`leftIndex` > $subCategory->leftIndex", "`rightIndex` < $subCategory->rightIndex");
                foreach ($subSubCategories as $subSubCategory) {
                    $subItem['list'][] = $subSubCategory->name;
                    // При наличии флагов добавляем подкатегории (уровень 3) в "Hot Deals" и "Featured"
                    if ($subSubCategory->hotDeal) {
                        $subHotDeal['list'][] = $subSubCategory->name;
                    }
                    if ($subSubCategory->featured) {
                        $subFeatured['list'][] = $subSubCategory->name;
                    }
                }

                $item['drop'][] = $subItem;
                if ($subCategory->hotDeal) {
                    $hotDeals['drop'][] = $subHotDeal;
                }
                if ($subCategory->featured) {
                    $featured['drop'][] = $subFeatured;
                }
            }
            
            $categories[] = $item;
        }

        $categories[] = $featured;
        $categories[] = $hotDeals;

        return $categories;
    }

    // Получить все подкатегории одной категории первого уровня.
    public function getAllSubcategories($id, CategoryRepository $categoryRepository)
    {
        $categories = [];
        $category = $categoryRepository->getOneWhere('id', $id);
        // Заполняем подкатегории (уровень 2).
        $subCategories = $categoryRepository->getAllWhereInterval('level', 2, "`leftIndex` > $category->leftIndex", "`rightIndex` < $category->rightIndex");
        foreach ($subCategories as $subCategory) {
            // Заполняем подкатегории (уровень 3).
            $categories[] = $subCategory;
            $subSubCategories = $categoryRepository->getAllWhereInterval('level', 3, "`leftIndex` > $subCategory->leftIndex", "`rightIndex` < $subCategory->rightIndex");
            foreach ($subSubCategories as $subSubCategory) {
                $categories[] = $subSubCategory;
            }
        }
        return $categories;
    }
}