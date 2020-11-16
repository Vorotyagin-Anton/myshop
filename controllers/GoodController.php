<?php

// Контроллер, отвечающий за операции с товарами.

namespace app\controllers;

use app\entities\Good;
use app\entities\Image;
use app\entities\GoodBrands;
use app\entities\GoodCategories;
use app\entities\GoodDesigners;
use app\entities\GoodSizes;

class GoodController extends Controller
{
    // Получить полную информацию о товаре.
    public function getOneFullInfoAction()
    {       
        $id = $this->container->request->getId();
        $good = $this->container->goodRepository->getOneGood("`goods`.`id`", $id);
        $goodCategories = $this->container->goodRepository->getGoodCategories("`goods`.`id`", $id);
        foreach ($goodCategories as $category) {
            $good->categories[] = $category;
        }
        $goodDesigners = $this->container->goodRepository->getGoodDesigners("`goods`.`id`", $id);
        foreach ($goodDesigners as $designer) {
            $good->designers[] = $designer;
        }
        $goodSizes = $this->container->goodRepository->getGoodSizes("`goods`.`id`", $id);
        foreach ($goodSizes as $size) {
            $good->sizes[] = $size;
        }

        return json_encode($good);
    }

    // Отобразить 8 товаров с наибольшим числом продаж.
    public function allFeaturedLimitAction($limit = 8)
    {       
        $goods = $this->container->goodRepository->getAllLimitSortWhere(0, $limit, 'goods.sold', 'featured', 1);
        return json_encode($goods);
    }

    // Сделать товар и его категории "Featured"

    public function toFeaturedAction($id = 0)
    {
        if(!$id){
            $id = $this->container->request->getId();
        }
        $good = $this->container->goodRepository->getOneWhere('id', $id);
        $good->featured = 1;
        $this->container->goodRepository->save($good);
        // Для категорий, к которым принадлежит товар, также устанавливаем флаг "featured"
        $goodCategories = $this->container->goodRepository->getGoodCategoriesID("`goods`.`id`", $id);
        foreach ($goodCategories as $goodCategory) {
            $category = $this->container->categoryRepository->getOneWhere('id', $goodCategory['id']);
            $category->featured = 1;
            $this->container->categoryRepository->save($category);
        }
    }

    // Сделать товар и его категории "Hot Deal"

    public function toHotDealAction($id = 0)
    {
        if(!$id){
            $id = $this->container->request->getId();
        }
        $good = $this->container->goodRepository->getOneWhere('id', $id);
        $good->hotDeal = 1;
        $this->container->goodRepository->save($good);
        $goodCategories = $this->container->goodRepository->getGoodCategoriesID("`goods`.`id`", $id);
        // Для категорий, к которым принадлежит товар, также устанавливаем флаг "hotDeal"
        foreach ($goodCategories as $goodCategory) {
            $category = $this->container->categoryRepository->getOneWhere('id', $goodCategory['id']);
            $category->hotDeal = 1;
            $this->container->categoryRepository->save($category);
        }
    }

    // Добавление товара в БД.
    public function addAction()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return "Неправильно указан метод отправки формы";
        }
        // Заполняем таблицу с товарами и изображениями.
        $good = new Good();
        foreach ($good as $fieldName => $value) {
            if ($fieldName == 'id') {
                continue;
            }
            if ($fieldName == 'featured') {
                continue;
            }
            if ($fieldName == 'hotDeal') {
                continue;
            }
            if ($fieldName == 'sold') {
                continue;
            }
            $good->$fieldName = $this->container->request->getFromPost($fieldName);
        }
        // Проверяем наличие файла с изображением.
        if(!$this->container->request->getFileInfo('userfile')['name']){
            return json_encode('Укажите файл с изображением товара');
        }
        $uploaddir = 'img/products/';
        $uploadfile = $uploaddir . basename($this->container->request->getFileInfo('userfile')['name']);
        if(move_uploaded_file($this->container->request->getFileInfo('userfile')['tmp_name'], $uploadfile)) {
            $img = new Image();
            $img->path = $uploadfile;
            $mainImgID = $this->container->imageRepository->save($img)->id;
            $good->mainImgID = $mainImgID;
            $goodID = $this->container->goodRepository->save($good)->id;
        }
        // Заполняем таблицу с соотношениями товаров и брендов.
        $goodBrands = new GoodBrands();
        $goodBrands->goodID = $goodID;
        $goodBrands->brandID = $this->container->request->getFromPost('brand');
        $this->container->goodBrandsRepository->save($goodBrands);
        // Заполняем таблицу с соотношениями товаров и дизайнеров.
        $goodDesigners = new GoodDesigners();
        $goodDesigners->goodID = $goodID;
        $goodDesigners->designerID = $this->container->request->getFromPost('designer');
        $this->container->goodDesignersRepository->save($goodDesigners);
        // Заполняем таблицу с соотношениями товаров и категорий.
        $goodCategories = new GoodCategories();
        $goodCategories->goodID = $goodID;
        $goodCategories->categoryID = $this->container->request->getFromPost('firstCat');
        $this->container->goodCategoriesRepository->save($goodCategories);

        $goodCategories->categoryID = $this->container->request->getFromPost('secondCat');
        $this->container->goodCategoriesRepository->save($goodCategories);

        $goodCategories->categoryID = $this->container->request->getFromPost('thirdCat');
        $this->container->goodCategoriesRepository->save($goodCategories);

        // Заполняем таблицу с соотношениями товаров и размеров.
        $goodSizes = new GoodSizes();
        $goodSizes->goodID = $goodID;
        $sizesID = [1, 2, 3, 4, 5, 6, 7];
        foreach ($sizesID as $sizeID) {
            $goodSizes->sizeID = $this->container->request->getFromPost($sizeID);
            if($goodSizes->sizeID){
                $goodSizes->sizeID = $sizeID;
                $this->container->goodSizesRepository->save($goodSizes);
            }
        }
        // Добавляем товар и его категории в "Hot Deal", если выбрано.
        if($this->container->request->getFromPost('hotDeal')){
            $this->toHotDealAction($goodID);
        }
        // Добавляем товар и его категории в "Featured", если выбрано.
        if($this->container->request->getFromPost('featured')){
            $this->toFeaturedAction($goodID);
        }

        return json_encode('Товар добавлен в базу');
    }
}
