'use strict'
// Компонент, реализующий страницу со всеми товарами категории "Man".
Vue.component('vcomp_man', {
    data(){
        return {
            // Для категории "man" заполняем массивы с товарами, подкатегориями, брэндами и дизайнерами.
            goodsLoaded: false,
            goods: [],
            categories: [],
            brands: [],
            designers: [],
            // Отфильтрованный массив товаров для отображения.
            goodsFiltered: [],
            // Свойства для работы фильтрации по размерам товаров.
            sizes: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl',],
            checkedSizes: [],
            // Начальные условия для сортировки, отображения и пагинации.
            sortbySelector: 'demand',
            showSelector: 6,
            currentPage: 1,
            // Свойства для отображения регулировок цены товара.
            minValue: 0,
            maxValue: 0,
            // Свойства навигации по категориям.
            mainCategory: {name: 'man', id: 28},
            selectedSubCategory: {name: null, id: null},
            selectedDesigner: {name: null, id: null},
            selectedBrand: {name: null, id: null},
            // Отображать "бесконечную" прокрутку товаров.
            isInfinityScroll: false,
            showRowsAmount: 2,
            // Заглушка для блока преимуществ.
            benefits: [
                {id: 1, icon: 'img/icons/delivery.svg', head: 'Free Delivery', description: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.'},
                {id: 2, icon: 'img/icons/sales.svg', head: 'Sales & discounts', description: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.'},
                {id: 3, icon: 'img/icons/quality.svg', head: 'Quality assurance', description: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.'},
            ],
            // Заглушка для трендов.
            trandingNow: [
                {name: 'bohemian'},
                {name: 'floral'},
                {name: 'lace'},
            ],
        }
    },

    filters: {
        // Фильтр делает заглавной первую букву строки.
        bigFirstLetter: function(word){
            if (!word) return '';
            word = word.toString();
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
    },

    computed: {
        // Число страниц для пагинации.
        pagesAmount(){
            if(this.goodsFiltered.length % this.showSelector == 0){
                return this.goodsFiltered.length / this.showSelector;
            }
            return Math.floor(this.goodsFiltered.length / this.showSelector) + 1;
        },
        // Минимальная и максимальная цены в массиве товаров.
        minPrice(){
            if(this.goodsLoaded){
                return this.goods.slice().reduce((p, v) => Number(p.price) < Number(v.price) ? p : v ).price;
            }
        },
        maxPrice(){
            if(this.goodsLoaded){
                return this.goods.slice().reduce((p, v) => Number(p.price) > Number(v.price) ? p : v ).price;
            }
        },
    },

    methods: {
        // Методы для сортировки отображаемых товаров.
        setSortbySelector(){
            this.sortbySelector = document.querySelector('select.sortby__catalog').value;
            switch(this.sortbySelector){
                case 'demand':
                    this.goodsFiltered.sort(this.sortByDemand);
                    break;
                case 'name':
                    this.goodsFiltered.sort(this.sortByName);
                    break;
                case 'price':
                    this.goodsFiltered.sort(this.sortByPrice);
                    break;
                default:
                    this.goodsFiltered.sort(this.sortByDemand);
            }
            this.currentPage = 1;
        },
        sortByPrice(a, b){
            if (Number(a.price) > Number(b.price)) return -1;
            if (Number(a.price) == Number(b.price)) return 0;
            if (Number(a.price) < Number(b.price)) return 1;
        },
        sortByName(a, b){
            if (a.name > b.name) return -1;
            if (a.name == b.name) return 0;
            if (a.name < b.name) return 1;
        },
        sortByDemand(a, b){
            if (Number(a.sold) > Number(b.sold)) return -1;
            if (Number(a.sold) == Number(b.sold)) return 0;
            if (Number(a.sold) < Number(b.sold)) return 1;
        },
        // Меняем блок отображаемых товаров согласно выбранному селектору (по 3 товара, по 6, по 9).
        setShowSelector(){
            this.showSelector = document.querySelector('select.show__catalog').value;
            this.currentPage = 1;
        },
        // Методы для построения и работы пагинации.
        isCurrent(pageNumber){
            return this.currentPage == pageNumber;
        },
        increaseCurrentPage(){
            if (this.currentPage == this.pagesAmount){
                return this.currentPage = 1;
            }
            this.currentPage++;
        },
        decreaseCurrentPage(){
            if (this.currentPage == 1){
                return this.currentPage = this.pagesAmount;
            }
            this.currentPage--;
        },
        // После перестроения блока отображаемых товаров переводим скролл на начало документа.
        scrollToTop(){
            document.documentElement.scrollIntoView();
        },
        // Методы для работы регулировок цены товара.
        setMinValue(){
            if(this.goodsLoaded){
                if(Number(document.querySelector('.range_min').value) > Number(document.querySelector('.range_max').value)){
                    document.querySelector('.range_min').value = document.querySelector('.range_max').value;
                }
                this.minValue = Number(document.querySelector('.range_min').value).toFixed(2);
            }
        },
        setMaxValue(){
            if(this.goodsLoaded){
                if(Number(document.querySelector('.range_min').value) > Number(document.querySelector('.range_max').value)){
                    document.querySelector('.range_max').value = document.querySelector('.range_min').value;
                }
                this.maxValue = Number(document.querySelector('.range_max').value).toFixed(2);
            }
        },
        // Фильтрация отображаемых товаров в зависимости от выбора цены, размера товара, бренда, дизайнера, категории.
        filterGoods(){
            this.goodsFiltered = this.goods.filter(el => Number(el.price) >= this.minValue && Number(el.price) <= this.maxValue);
            if (this.checkedSizes.length != 0){
                this.goodsFiltered = this.goodsFiltered.filter(this.isSizeMatches);
            }
            if (this.selectedDesigner.name){
                this.goodsFiltered = this.goodsFiltered.filter(this.isDesignerMatches);
            }
            if (this.selectedBrand.name){
                this.goodsFiltered = this.goodsFiltered.filter(this.isBrandMatches);
            }
            if (this.selectedSubCategory.name){
                this.goodsFiltered = this.goodsFiltered.filter(this.isSubCategoryMatches);
            }

            setTimeout(this.setButtonPosition,1);
        },
        isSizeMatches(el){
            if(el.sizes.length == 0){
                return false;
            }
            for(let goodSize of el.sizes){
                for(let size of this.checkedSizes){
                    if(goodSize == size){
                        return true;
                    }
                }
            }
            return false;
        },
        isDesignerMatches(el){
            if(el.designers.length == 0){
                return false;
            }
            for(let goodDesigner of el.designers){
                if(goodDesigner == this.selectedDesigner.name){
                    return true;
                }
            }
            return false;
        },
        isBrandMatches(el){
            if(el.brands.length == 0){
                return false;
            }
            for(let goodBrand of el.brands){
                if(goodBrand == this.selectedBrand.name){
                    return true;
                }
            }
            return false;
        },
        isSubCategoryMatches(el){
            if(el.categories.length == 0){
                return false;
            }
            for(let goodCategory of el.categories){
                if(goodCategory == this.selectedSubCategory.name){
                    return true;
                }
            }
            return false;
        },
        // Действия при нажатии на имя дизайнера
        selectDesigner(designer){
            if(this.selectedDesigner.name == designer.name){
                this.selectedDesigner.name = null;
                this.filterGoods();
                this.setSortbySelector();
                return;
            }
            this.selectedDesigner.name = designer.name;
            this.selectedDesigner.id = designer.id;
            this.filterGoods();
            this.setSortbySelector();
        },
        // Действия при нажатии на имя бренда
        selectBrand(brand){
            if(this.selectedBrand.name == brand.name){
                this.selectedBrand.name = null;
                this.filterGoods();
                this.setSortbySelector();
                return;
            }
            this.selectedBrand.name = brand.name;
            this.selectedBrand.id = brand.id;
            this.filterGoods();
            this.setSortbySelector();
        },
        // Действия при нажатии на имя категории
        selectSubCategory(category){
            if(this.selectedSubCategory.name == category.name){
                this.selectedSubCategory.name = null;
                this.filterGoods();
                this.setSortbySelector();
                return;
            }
            this.selectedSubCategory.name = category.name;
            this.selectedSubCategory.id = category.id;
            this.filterGoods();
            this.setSortbySelector();
        },
        // Метод, срабатывающий при нажатии на "View All".
        scroll () {
            this.setGoodsAmountScroll();
            setTimeout(this.setButtonPosition,1);
        },
        // Задание начально числа отображаемых товаров при скролле.
        setGoodsAmountScroll(){
            let productElem = document.querySelector('.product');
            let boxElem = document.querySelector('.product-box');
            this.showRowsAmount = Math.floor((document.documentElement.clientHeight - boxElem.getBoundingClientRect().bottom + boxElem.offsetHeight) / productElem.offsetHeight) + 1;
        },
        // Определение положения кнопки перехода к постраничному выводу товаров.
        setButtonPosition(){
            let boxElem = document.querySelector('.product-box');
            let button = document.querySelector('.catalog__viewall__button-to-pages');
            if (button){
                let buttonBorderReached = document.documentElement.clientHeight - boxElem.getBoundingClientRect().bottom >= 235;
                let buttonBorderPassed = document.documentElement.clientHeight - boxElem.getBoundingClientRect().bottom < 235;
                if (buttonBorderReached) {
                    button.classList.remove('catalog__viewall__button-to-pages_fixed');
                    button.classList.add('catalog__viewall__button-to-pages_absolute');
                }
                if (buttonBorderPassed) {
                    button.classList.remove('catalog__viewall__button-to-pages_absolute');
                    button.classList.add('catalog__viewall__button-to-pages_fixed');
                }
            }
        },
        // Метод, реагирующий на прокрутку страницы.
        scrollHandler(){
            let boxElem = document.querySelector('.product-box');
            let bottomOfWindow = boxElem.getBoundingClientRect().bottom <= document.documentElement.clientHeight;
            if (bottomOfWindow) {
            this.showRowsAmount++;
            }

            this.setButtonPosition();
        },
        // Записать данные в буфер при переходе на страницу товара.
        wrighteToBuffer(id){
            this.$root.$refs.buffer.goodID = id;
        },
    },

    mounted(){
        // Загружаем данные о подкатегориях главной категории.
        this.$parent.getJson(`/category/getAllSubcategories?id=${this.mainCategory.id}`)
            .then(data => {
                for(let el of data){
                    this.categories.push(el);
                }
            });
        // Загружаем данные о всех дизайнерах товаров главной категории.
        this.$parent.getJson(`/category/getCategoryAllDesigners?id=${this.mainCategory.id}`)
            .then(data => {
                for(let el of data){
                    this.designers.push(el);
                }
            });
        // Загружаем данные о всех брендах товаров главной категории.
        this.$parent.getJson(`/category/getCategoryAllBrands?id=${this.mainCategory.id}`)
            .then(data => {
                for(let el of data){
                    this.brands.push(el);
                }
            });
        // Загружаем данные о всех товарах главной категории.
        this.$parent.getJson(`/category/getCategoryAllGoods?id=${this.mainCategory.id}`)
            .then(data => {
                for(let el of data){
                    this.goods.push(el);
                    this.goodsFiltered.push(el);
                }
                // Задаём начальное отображение товаров и регулировок фильтрации.
                this.goodsLoaded = true;
                this.minValue = this.minPrice;
                this.maxValue = this.maxPrice;
                this.filterGoods();
                this.goodsFiltered.sort(this.sortByDemand);
            });
        // Получаем подкатегорию, выбранную в меню навигации.
        if (this.$root.$refs.vcomp_nav.$refs.vcomp_nav_drop_man[0].selectedSubCategory.name) {
            this.selectedSubCategory = this.$root.$refs.vcomp_nav.$refs.vcomp_nav_drop_man[0].selectedSubCategory;
            this.$root.$refs.vcomp_nav.$refs.vcomp_nav_drop_man[0].selectedSubCategory = {name: null, id: null};
        }
        // Добавляем обработчик события прокрутки.
        window.addEventListener('scroll', this.scrollHandler);
    },

    beforeDestroy(){
        // Удаляем обработчик события прокрутки.
        window.removeEventListener('scroll', this.scrollHandler);
    },

    template: `
        <div id="man">
            <div class="path__man center">
                <div class="path__man__content">
                    <p v-if="selectedSubCategory.name" class="path__text">{{selectedSubCategory.name}}</p>
                    <p v-else class="path__text">{{mainCategory.name}}</p>
                    <nav class="path">
                        <a class="path" style="cursor: pointer" @click="selectedSubCategory.name = null, filterGoods(), setSortbySelector()">{{mainCategory.name}} / &nbsp;</a>
                        <div v-if="selectedSubCategory.name">
                            <a class="path">{{selectedSubCategory.name}} /</a>
                        </div>
                    </nav>
                </div>
            </div>
            <section class="catalog center">
                <nav class="catalog__navigation">
                    <details class="catalog__navigation__details" open>
                        <summary class="catalog__navigation__head">CATEGORY</summary>
                        <a v-for="category of categories" class="catalog__navigation__item" @click="selectSubCategory(category)" :class='{catalog__navigation__item_active: selectedSubCategory.name == category.name}'>{{category.name}}</a>
                    </details>
                    <details class="catalog__navigation__details">
                        <summary class="catalog__navigation__head">BRAND</summary>
                        <a v-for="brand of brands" class="catalog__navigation__item" @click="selectBrand(brand)" :class='{catalog__navigation__item_active: selectedBrand.name == brand.name}'>{{brand.name}}</a>
                    </details>
                    <details class="catalog__navigation__details">
                        <summary class="catalog__navigation__head">DESIGNER</summary>
                        <a v-for="designer of designers" class="catalog__navigation__item" @click="selectDesigner(designer)" :class='{catalog__navigation__item_active: selectedDesigner.name == designer.name}'>{{designer.name}}</a>
                    </details>
                </nav>
                <section class="catalog__goods">
                    <header class="catalog__goods__features">
                        <div class="catalog__goods__features__trending">
                            <p class="goods__features">TRENDING NOW</p>
                            <ul class="trending__categories">
                                <li v-for="item of trandingNow" class="trending__categories__items"><a class="trending__categories__link">{{item.name | bigFirstLetter}} |&nbsp;</a></li>
                            </ul>
                        </div>
                        <div class="catalog__goods__features__size">
                            <p class="goods__features">SIZE</p>
                            <div class="size__selection">
                                <div v-for="size of sizes" class="size__selection__input">
                                    <input type="checkbox" :value="size" v-model="checkedSizes" @change="filterGoods(), setSortbySelector()">
                                    <p class="size__selection__input__text">{{size}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="catalog__goods__features__price">
                            <p class="goods__features">PRICE</p>
                            <div class="goods__features__range__box">
                            <input class="goods__features__range range_min" type="range" :min="minPrice" :max="maxPrice" step="0.01" :value="minValue" @change="setMinValue(), filterGoods(), setSortbySelector()">
                            <input class="goods__features__range range_max" type="range" :min="minPrice" :max="maxPrice" step="0.01" :value="maxValue" @change="setMaxValue(), filterGoods(), setSortbySelector()">
                            </div>
                            <div class="goods__features__pricerange">
                                <p class="pricerange">$ {{minValue}}</p>
                                <p class="pricerange">$ {{maxValue}}</p>
                            </div>
                        </div>
                    </header>
                    <div class="catalog__goods__sorting">
                        <div @click="goodsFiltered.reverse()" class="sortby">Sort By</div>
                        <select class="sortby__catalog" @change="setSortbySelector">
                            <option value="demand" selected>Demand</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>
                        <div class="show">Show</div>
                        <select class="show__catalog" @change="setShowSelector">
                            <option value="3">03</option>
                            <option value="6" selected>06</option>
                            <option value="9">09</option>
                        </select>
                    </div>
                    <div v-if="isInfinityScroll" class="product-box product-box__man">
                        <div v-for="good of goodsFiltered.slice(0, showRowsAmount * 3)" class="product">
                            <a @click="wrighteToBuffer(good.id), $root.changeCurrentPage($event, 'sinpage'), scrollToTop()"><img class="product__img" :src="good.path" alt="product"></a>
                            <div class="product__text">
                                <a @click="wrighteToBuffer(good.id), $root.changeCurrentPage($event, 'sinpage'), scrollToTop()" class="product__name">{{good.name}}</a>
                                <div class="product__price">$ {{good.price}}</div>
                            </div>
                            <a @click="$parent.executeServerAction('/basket/add?id=' + good.id)" class="product__add">Add to cart</a>
                        </div>
                        <p v-if="goodsFiltered.length == 0">Нет товаров, удовлетворяющих критериям поиска</p>
                    </div>
                    <div v-else class="product-box product-box__man">
                        <div v-for="good of goodsFiltered.slice((currentPage - 1) * showSelector, currentPage * showSelector)" class="product">
                            <a @click="wrighteToBuffer(good.id), $root.changeCurrentPage($event, 'sinpage'), scrollToTop()"><img class="product__img" :src="good.path" alt="product"></a>
                            <div class="product__text">
                                <a @click="wrighteToBuffer(good.id), $root.changeCurrentPage($event, 'sinpage'), scrollToTop()" class="product__name">{{good.name}}</a>
                                <div class="product__price">$ {{good.price}}</div>
                            </div>
                            <a @click="$parent.executeServerAction('/basket/add?id=' + good.id)" class="product__add">Add to cart</a>
                        </div>
                        <p v-if="goodsFiltered.length == 0">Нет товаров, удовлетворяющих критериям поиска</p>
                    </div>
                    <div class="catalog__viewall">
                        <div v-if="!isInfinityScroll && goodsFiltered.length != 0" class="catalog__viewall__pages">
                            <a @click="decreaseCurrentPage(), scrollToTop()" class="catalog__viewall__page"><i class="fas fa-chevron-left"></i></a>
                            <a @click="currentPage = n, scrollToTop()" v-for="n in pagesAmount" class="catalog__viewall__page" v-if="Math.abs(n - currentPage) < 2 || n == pagesAmount || n == 1" :class='{catalog__viewall__page_active: isCurrent(n), catalog__viewall__page_last: (n == pagesAmount && Math.abs(n - currentPage) > 2), catalog__viewall__page_first:(n == 1 && Math.abs(n - currentPage) > 2)}'>{{n}}</a>
                            <a @click="increaseCurrentPage(), scrollToTop()" class="catalog__viewall__page"><i class="fas fa-chevron-right"></i></a>
                        </div>
                        <a v-if="!isInfinityScroll && goodsFiltered.length != 0" @click="isInfinityScroll = true, scrollToTop(), scroll()" class="catalog__viewall__button">View All</a>
                        <a v-if="isInfinityScroll && goodsFiltered.length != 0" @click="isInfinityScroll = false, scrollToTop(), currentPage = 1" class="catalog__viewall__button-to-pages catalog__viewall__button-to-pages_fixed">View By Pages</a>
                    </div>
                </section>
            </section>
            <section class="benefits__man center">
                <div v-for="benefit of benefits" class="benefits__item__man">
                    <div class="benefits__icon__man">
                        <a class="icon"><img :src="benefit.icon" alt="delivery__icon"></a>
                    </div>
                    <div class="benefits__text__man">
                        <a class="benefits__head" href="#">{{benefit.head}}</a>
                        <p class="benefits__description">{{benefit.description}}</p>
                    </div>
                </div>
            </section>
        </div>
    `,
});