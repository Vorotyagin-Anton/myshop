'use strict'
// Компонент, реализующий корзину товаров.
Vue.component('vcomp_cart', {

	data(){
		return {
			// Товары в корзине
			goodsBasket: [],
			// Заглушка для списка стран 
			countries: [{english: 'India'}, {english: 'UK'}, {english: 'Germany'},],
			// Список всех стран от htmlweb.ru
			countriesWeb: [],
			// Купон на скидку, указанный пользователем.
			userCoupon: '',
			// Действительность купона.
			couponExist: false,
			// Заглушка для скидочных купонов
			discounts: {discount10: 10, discount20: 20, discount50: 50},
			// Размер скидки.
			discount: 0,
			// Заглушка для стоимости доставки
			shippingPrices: {Russia: 5, UK: 15, Germany: 8, India: 20},
			// Стоимость доставки.
			shippingPrice: 5,
		}
	},

	computed: {
		// Стоимость всех товаров в корзине.
		basketTotalPrice(){
			return Number(this.goodsBasket.reduce((sum, current) => sum + current.price * current.count, 0).toFixed(2));
		}
	},

	methods: {
        // Переводим скролл на начало документа.
        scrollToTop(){
            document.documentElement.scrollIntoView();
        },
        // Применение купона на скидку
        checkCoupon(){
        	if (this.discounts.hasOwnProperty(this.userCoupon)){
        		this.couponExist = true;
        		this.discount = this.discounts[this.userCoupon];
        		document.querySelector('.coupon__answer').innerText = "* " + 'Купон применён';
            	setTimeout(() => document.querySelector('.coupon__answer').innerText = '', 3000);
            	this.userCoupon = '';
            	return;
        	}
        	document.querySelector('.coupon__answer').innerText = "* " + 'Купон недействителен';
            setTimeout(() => document.querySelector('.coupon__answer').innerText = '', 3000);
        },
      	// Расчёт стоимости доставки
      	checkShippingPrice(){
      		let country = document.querySelector('.shipping__country').value;
      		this.shippingPrice = Number(this.shippingPrices[country]);
      		document.querySelector('.shipping__answer').innerText = "* " + 'Стоимость доставки изменена';
            setTimeout(() => document.querySelector('.shipping__answer').innerText = '', 3000);
      	},
      	// Записать данные в буфер при переходе на страницу оформления заказа.
      	wrighteToBuffer(){
      		this.$root.$refs.buffer.shippingPrice = this.shippingPrice;
      		this.$root.$refs.buffer.basketTotalPrice = this.basketTotalPrice;
      		this.$root.$refs.buffer.goodsBasket = this.goodsBasket;
      		this.$root.$refs.buffer.discount = this.discount;
      	},
      	// Записать данные в буфер при переходе на страницу товара.
        wrighteToBufferGoodID(id){
            this.$root.$refs.buffer.goodID = id;
        },
    },

	mounted(){
        // Загружаем данные о товарах в корзине.
        this.$parent.getJson(`/basket/getGoodsBasket`)
            .then(data => {
                for(let el of data){
                    this.goodsBasket.push(el);
                }
            });
        // Загружаем список стран.
        this.$parent.getJson(`https://htmlweb.ru/geo/api.php?location&json`)
            .then(data => {
            	data.length = 254;
                for(let el of Array.from(data)){
                    this.countriesWeb.push(el);
                }
            });
    },

    template: `
	    <div id="cart">
	    	<div class="path__man center">
				<div class="path__man__content">
					<p class="path__text">Product Cart</p>
				</div>
			</div>
			<section v-if="goodsBasket.length != 0" class="product-cart center">
				<header class="product-cart__header">
					<div class="product-cart__head product-cart__head_first">product details</div>
					<div class="product-cart__head">unite price</div>
					<div class="product-cart__head">quantity</div>
					<div class="product-cart__head">shipping</div>
					<div class="product-cart__head">subtotal</div>
					<div class="product-cart__head product-cart__head_last">action</div>
				</header>
				<section v-for="(good, index) in goodsBasket" class="product-cart__product">
					<div class="product-cart__pc-details">
						<div class="product-cart__img"><img class="product-cart__img_img" :src="good.path"></div>
						<div class="product-cart__text">
							<a @click="wrighteToBufferGoodID(good.id), $root.changeCurrentPage($event, 'sinpage'), scrollToTop()" class="pc-details__head">{{good.name}}</a>
							<p class="pc-details__feature-color">Color: <span class="grey">{{good.color}}</span></p>
							<p class="pc-details__feature-size">Size: <span class="grey">M</span></p>
						</div>
					</div>
					<div class="product-cart__price">$ {{good.price}}</div>
					<div class="product-cart__quantity"><input type="text" onkeypress="return (event.charCode >= 48 && event.charCode <= 57 && /^\d{0,3}$/.test(this.value));" class="product-cart__input" v-model="goodsBasket[index].count"></div>
					<div class="product-cart__shipping">$ {{shippingPrice.toFixed(2)}}</div>
					<div class="product-cart__subtotal">$ {{(good.price * good.count).toFixed(2)}}</div>
					<div class="product-cart__action"><a @click="$parent.executeServerAction('/basket/del?id=' + good.id), goodsBasket.splice(index,1)" class="product-cart__clear">x</a></div>
				</section>
				<section class="product-cart__buttons">
					<a @click="goodsBasket=[], $parent.executeServerAction('/basket/delAll'), scrollToTop()" class="product-cart__button-clear">CLEAR SHOPPING CART</a>
					<a @click="$root.changeCurrentPage($event, 'man'), scrollToTop()" class="product-cart__button-continue">CONTINUE SHOPPING</a>
				</section>
			</section>
			<section v-if="goodsBasket.length != 0" class="order-details center">
				<div class="order-details__shipping">
					<h2 class="order-details__head">SHIPPING ADDRESS</h2>
					<select class="shipping__country">
						<option value="Russia" selected>Russia</option>
						<option v-for="country of countries" :value="country.english">{{country.english}}</option>
					</select>
					<input type="text" class="shipping__state" placeholder="State">
					<input type="text" class="shipping__postcode" placeholder="Postcode / Zip">
					<a @click="checkShippingPrice" class="shipping__button">GET A QUOTE</a>
					<p class="shipping__answer"></p>
				</div>
				<div class="order-details__coupon">
					<h2 class="order-details__head">COUPON DISCOUNT</h2>
					<p class="coupon__text">Enter your coupon code if you have one</p>
					<input v-model="userCoupon" type="text" class="coupon__coupon-number" placeholder="Coupon number">
					<a @click="checkCoupon" class="coupon__button">apply coupone</a>
					<p class="coupon__answer"></p>
				</div>
				<div class="order-details__total">
					<div class="total__sub">
						<p class="sub__text">SUB TOTAL</p>
						<p class="sub__number">$ {{basketTotalPrice}}</p>
					</div>
					<div v-if="couponExist" class="total__discount">
						<p class="sub__text">DISCOUNT {{discount}} %</p>
						<p class="sub__number">$ {{(basketTotalPrice*discount/100).toFixed(2)}}</p>
					</div>
					<div class="total__discount">
						<p class="sub__text">SHIPPING</p>
						<p class="sub__number">$ {{shippingPrice.toFixed(2)}}</p>
					</div>
					<div class="total__grand">
						<p class="grand__text">GRAND TOTAL</p>
						<p class="grand__number">$ {{basketTotalPrice + Number(shippingPrice.toFixed(2)) - Number((basketTotalPrice*discount/100).toFixed(2))}}</p>
					</div>
					<div class="total__line"></div>
					<a @click="wrighteToBuffer(), $root.changeCurrentPage($event, 'checkout'), scrollToTop()" class="total__button">PROCEED TO CHECKOUT</a>
				</div>
			</section>
			<p class="center" style="margin-top: 100px; margin-bottom: 100px; padding-left: 50px;" v-else>Корзина пуста</p>
	    </div>
    `
});