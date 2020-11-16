'use strict'
// Компонент, реализующий домашнюю страницу сайта.
Vue.component('vcomp_home', {
    data(){
        return {
            // Товары из категории "Featured" для отображения на главной странице.
            featuredProducts: [],
            // Заглушка для для блока преимуществ магазина.
            benefits: [
                {id: 1, icon: 'img/icons/delivery.svg', head: 'Free Delivery', description: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.'},
                {id: 2, icon: 'img/icons/sales.svg', head: 'Sales & discounts', description: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.'},
                {id: 3, icon: 'img/icons/quality.svg', head: 'Quality assurance', description: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.'},
            ],
        }
    },

    methods: {
        // Переводим скролл на начало документа.
        scrollToTop(){
            document.documentElement.scrollIntoView();
        },
    },

    mounted(){
        // Скачиваем первые 8 по популярности товаров из категории "Featured".
        this.$parent.getJson('/good/allFeaturedLimit')
            .then(data => {
                for(let el of data){
                    this.featuredProducts.push(el);
                }
            });
    },

    template: `
        <div id="home">
            <div class="promo center">
                <div class="promo__content">
                    <div class="promo__text">
                        <p class="promo__text__bold">THE BRAND</p>
                        <p class="promo__text__casual">OF LUXERIOUS <span class="colortext">FASHION</span></p>
                    </div>
                </div>
            </div>
            <section class="stock center">
                <div class="hotDeal">
                    <a @click="$root.changeCurrentPage($event, 'hotdeals'), scrollToTop()" class="stock__text">
                        <p class="stock__text__black">HOT DEAL</p>
                        <p class="stock__text__pink">FOR MEN</p>
                    </a>
                </div>
                <div class="lux">
                    <a @click="$root.changeCurrentPage($event, 'accesories'), scrollToTop()" class="stock__text">
                        <p class="stock__text__black">LUXIROUS & TRENDY</p>
                        <p class="stock__text__pink">ACCESORIES</p>
                    </a>
                </div>
                <div class="offer">
                    <a @click="$root.changeCurrentPage($event, 'women'), scrollToTop()" class="stock__text">
                        <p class="stock__text__black">30% OFFER</p>
                        <p class="stock__text__pink">WOMEN</p>
                    </a>
                </div>
                <div class="new">
                    <a @click="$root.changeCurrentPage($event, 'kids'), scrollToTop()" class="stock__text">
                        <p class="stock__text__black">NEW ARRIVALS</p>
                        <p class="stock__text__pink">FOR KIDS</p>
                    </a>
                </div>
            </section>
            <section class="featured center">
                <header class="featured__header">
                    <h1 class="featured__head">Fetured Items</h1>
                    <p class="featured__text">Shop for items based on what we featured in this week</p>
                </header>
                <div class="product-box center">
                    <product v-for="item of featuredProducts" :key="item.id" :product="item"></product>
                </div>
                <a @click="$root.changeCurrentPage($event, 'featured'), scrollToTop()" class="button__browse">Browse All Product &#8594;</a>
            </section>
            <section class="benefits center">
                <div class="benefits__offer">
                    <div class="benefits__offer__text">
                        <p class="benefits__offer__text__bold">30% <span class="colortext">OFFER</span></p>
                        <p class="benefits__offer__text__casual">FOR WOMEN</p>
                    </div>
                </div>
                <div v-for="benefit of benefits" class="benefits__item">
                    <div class="benefits__icon">
                        <a class="icon"><img :src="benefit.icon" alt="icon"></a>
                    </div>
                    <div class="benefits__text">
                        <a class="benefits__head">{{benefit.head}}</a>
                        <p class="benefits__description">{{benefit.description}}</p>
                    </div>
                </div>
            </section>
        </div>
    `
});
// Компонент, реализующий отображение одного товара в каталоге.
Vue.component('product', {
    props: ['product'],
    data() {
      return {
      };
    },

    methods: {
        // Записать данные в буфер при переходе на страницу товара.
        wrighteToBuffer(){
            this.$root.$refs.buffer.goodID = this.product.id;
        },
    },

    template: `
        <div class="product" :data-product_id="product.id">
            <a @click="wrighteToBuffer(), $root.changeCurrentPage($event, 'sinpage'), $parent.scrollToTop()"><img class="product__img" :src="product.mainImg" alt="product"></a>
            <div class="product__text">
                <a @click="wrighteToBuffer(), $root.changeCurrentPage($event, 'sinpage'), $parent.scrollToTop()" class="product__name">{{product.name}}</a>
                <div class="product__price">$ {{product.price}}</div>
            </div>
            <a @click="$parent.$parent.executeServerAction('/basket/add?id=' + product.id)" class="product__add">Add to cart</a>
        </div>
    `
});
