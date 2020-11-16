<?php

// Контроллер, отвечающий за работу с категориями товаров.

namespace app\controllers;

use app\entities\Category;

class CategoryController extends Controller
{
    // Получить все категории с подкатегориями для построения меню сайта.
    public function buildMenuAction()
    {
        $menu = $this->container->categoryService->buildMenu($this->container->categoryRepository);
        return json_encode($menu);
    }

    // Получить все подкатегории одной категории первого уровня.
    public function getAllSubcategoriesAction($id = 0)
    {
    	if (!$id){
    		$id = $this->container->request->getId();
    	}

        $subCategories = $this->container->categoryService->getAllSubcategories($id, $this->container->categoryRepository);
        return json_encode($subCategories);
    }

    // Получить все подкатегории первого уровня.
    public function getAllSubcategoriesFirstAction()
    {
        $subCategories = $this->container->categoryRepository->getAllLevel('level', '1');
        return json_encode($subCategories);
    }

    // Получить все подкатегории третьего уровня.
    public function getAllSubcategoriesLevelAction()
    {
        $subCategories = $this->container->categoryRepository->getAllLevel('level', '3');
        return json_encode($subCategories);
    }

    // Получить подкатегории второго уровня одной категории.
    public function getAllSubcategoriesSecondAction($id = 0)
    {
        if (!$id){
            $id = $this->container->request->getId();
        }

        $category = $this->container->categoryRepository->getOneWhere('id', $id);
        $subCategories = $this->container->categoryRepository->getAllWhereInterval('level', 2, "`leftIndex` > $category->leftIndex", "`rightIndex` < $category->rightIndex");

        return json_encode($subCategories);
    }

    // Получить подкатегории третьего уровня одной категории.
    public function getAllSubcategoriesThirdAction($id = 0)
    {
        if (!$id){
            $id = $this->container->request->getId();
        }

        $category = $this->container->categoryRepository->getOneWhere('id', $id);
        $subCategories = $this->container->categoryRepository->getAllWhereInterval('level', 3, "`leftIndex` > $category->leftIndex", "`rightIndex` < $category->rightIndex");

        return json_encode($subCategories);
    }

    // Получить все товары одной категории товаров.
    public function getCategoryAllGoodsAction($id = 0)
    {
    	if (!$id){
    		$id = $this->container->request->getId();
    	}
        $goods = $this->container->categoryRepository->getCategoryGoods("`categories`.`id`", $id);
        foreach ($goods as $key => $good) {
            $sizes = $this->container->goodRepository->getGoodSizes("`goods`.`id`", $good['id']);
            if(!$sizes){
                $goods[$key]['sizes'] = [];
            }
            foreach ($sizes as $size) {
                $goods[$key]['sizes'][] = $size['sizeName']; 
            }
            $designers = $this->container->goodRepository->getGoodDesigners("`goods`.`id`", $good['id']);
            if(!$designers){
                $goods[$key]['designers'] = [];
            }
            foreach ($designers as $designer) {
                $goods[$key]['designers'][] = $designer['designerName']; 
            }
            $categories = $this->container->goodRepository->getGoodCategories("`goods`.`id`", $good['id']);
            if(!$categories){
                $goods[$key]['categories'] = [];
            }
            foreach ($categories as $category) {
                $goods[$key]['categories'][] = $category['categoryName']; 
            }
            $brands = $this->container->goodRepository->getGoodBrands("`goods`.`id`", $good['id']);
            if(!$brands){
                $goods[$key]['brands'] = [];
            }
            foreach ($brands as $brand) {
                $goods[$key]['brands'][] = $brand['brandName']; 
            }
        }
        return json_encode($goods);
    }

    // Получить всех дизайнеров, принадлежащих одной категории товаров.
    public function getCategoryAllDesignersAction($id = 0)
    {
    	if (!$id){
    		$id = $this->container->request->getId();
    	}
        $designers = $this->container->categoryRepository->getCategoryDesigners("`categories`.`id`", $id);
        return json_encode($designers);
    }

    // Получить все бренды, принадлежащие одной категории товаров.
    public function getCategoryAllBrandsAction($id = 0)
    {
    	if (!$id){
    		$id = $this->container->request->getId();
    	}
        $brands = $this->container->categoryRepository->getCategoryBrands("`categories`.`id`", $id);
        return json_encode($brands);
    }
}
