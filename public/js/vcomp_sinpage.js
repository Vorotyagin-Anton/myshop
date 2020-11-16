'use strict'
// Компонент, реализующий страницу товара.
Vue.component('vcomp_sinpage', {
	data() {
      return {
      	loaded: false,
      	// Данные отображаемого товара.
      	goodID: 0,
      	good: null,
      	quantity: 1,
      	// Рекомендуемые товары.
      	recomendedGoods: [],
      	// Массив изображений товара.
      	goodImages: ['img/layers/Layer_42.jpg'],
      	// Текущее отображаемое изображение товара.
      	currentImage: 1,
      };
    },

    computed: {
    	// Общее число изображений товара.
    	imagesAmount(){
    		return this.goodImages.length - 1;
    	}
    },

    methods: {
        // Переводим скролл на начало документа.
        scrollToTop(){
            document.documentElement.scrollIntoView();
        },
        // Скачать данные о товаре.
        getGoodInfo(){
        	this.$parent.getJson(`/good/getOneFullInfo?id=${this.goodID}`)
            .then(data => {
            	this.good = data;
            	this.goodImages.push(data.path);
            	this.loaded = true;
            	// Скачать данные о рекомендуемых товарах.
            	this.$parent.getJson(`/category/getCategoryAllGoods?id=${this.good.categories[0].id}`)
		            .then(data => {
		            	for(let el of data){
		                    this.recomendedGoods.push(el);
		                }
		            });
            });
        },
        // Методы переключения изображений товара.
        increaseCurrentImage(){
            if (this.currentImage == this.imagesAmount){
                return this.currentImage = 0;
            }
            this.currentImage++;
        },
        decreaseCurrentImage(){
            if (this.currentImage == 0){
                return this.currentImage = this.imagesAmount;
            }
            this.currentImage--;
        },
    },

    mounted(){
    	// Получаем id товара из буфера.
    	this.goodID = this.$root.$refs.buffer.goodID; 
    	// Скачиваем данные о товаре.
    	this.getGoodInfo();
    },

    template: `
    	<div v-if="loaded" id="sinpage">
    		<div class="path__man center">
				<div class="path__man__content">
					<p class="path__text">{{ good.name }}</p>
				</div>
			</div>
			<div class="sinpage__slider center__big" :style="{ backgroundImage: 'url(' + goodImages[currentImage] + ')' }">
				<a @click="decreaseCurrentImage" class="sinpage__slider__button"><i class="fas fa-chevron-left"></i></a>
				<a @click="increaseCurrentImage" class="sinpage__slider__button"><i class="fas fa-chevron-right"></i></a>
			</div>
			<section class="sinpage__details">
				<div class="details__text">
					<h2 class="details__label">{{ good.categories[0].categoryName }}</h2>
					<div class="pink__line"></div>
					<h1 class="details__head">{{ good.categories[1].categoryName }}</h1>
					<h1 class="details__head">{{ good.categories[2].categoryName }}</h1>
					<p class="details__text__text">{{ good.description }}</p>
					<div class="details__details">
						<p class="material"><span class="grey">MATERIAL:</span> COTTON</p>
						<p class="material"><span class="grey">DESIGNER:</span> {{ good.designers[0].designerName }}</p>
					</div>
					<p class="details__price">$ {{ good.price }}</p>
					<div class="grey__line"></div>
				</div>
				<div class="details__parameters">
					<div class="details__parameters__choosing">
						<h2 class="choosing__head">CHOOSE COLOR</h2>
						<select class="choosing__list">
							<option value="">{{ good.color }}</option>
						</select>
					</div>
					<div class="details__parameters__choosing">
						<h2 class="choosing__head">CHOOSE SIZE</h2>
						<select class="choosing__list">
							<option v-for="size in good.sizes" value="">{{ size.sizeName }}</option>
						</select>
					</div>
					<div class="details__parameters__choosing">
						<h2 class="choosing__head">QUANTITY</h2>
						<input type="text" onkeypress="return (event.charCode >= 48 && event.charCode <= 57 && /^\d{0,3}$/.test(this.value));" class="choosing__input" v-model="quantity">
					</div>
				</div>
				<a @click="$root.executeServerAction('/basket/add?id=' + goodID)" class="sinpage__details__cart">
					<figure class="sinpage__buttonCart">
						<img src="img/icons/cart_pink.svg" alt="cart">
						<p class="sinpage__button__text">Add to Cart</p>
					</figure>
				</a>
			</section>
			<section class="sinpage__catalog center">
				<header class="sinpage__catalog__header">
					<h1 class="sinpage__catalog__head">you may like also</h1>
				</header>
				<div class="product-box sinpage__product-box center">
					<div v-for="good of recomendedGoods.slice(0,4)" class="product">
						<a @click="goodImages.pop(), goodID = good.id, getGoodInfo(), scrollToTop()"><img class="product__img" :src="good.path" alt="product"></a>
						<div class="product__text">
							<a @click="goodImages.pop(), goodID = good.id, getGoodInfo(), scrollToTop()" class="product__name">{{ good.name }}</a>
							<div class="product__price">$ {{ good.price }}</div>
						</div>
						<a @click="$root.executeServerAction('/basket/add?id=' + good.id)" class="product__add">Add to cart</a>
					</div>
				</div>
			</section>
    	</div>
    `
});