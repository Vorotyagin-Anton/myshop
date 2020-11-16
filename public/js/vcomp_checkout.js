'use strict'
// Компонент, реализующий страницу оформления заказа.
Vue.component('vcomp_checkout', {
	data(){
		return {
            // Текущий шаг оформления заказа.
			currentStep: 'shipping-address',
			// Сведения о пользователе.
			isGuest: false,
            user: '',
            // Сведения о заказе.
            address: '',
            email: '',
            tel: '',
            shippingMethod: 'delivery',
            paymentMethod: 'cash',
            // Сведения о корзине товаров.
            goodsBasket: [],
            basketTotalPrice: 0,
			shippingPrice: 0,
			discount: 0,
			// Результат формирования заказа.
			result: '',
		}
	},

	computed: {
        // Сумма заказа с учётом скидки и стоимости доставки.
		cost(){
			return (Number(this.basketTotalPrice.toFixed(2)) + Number(this.shippingPrice.toFixed(2)) - Number((this.basketTotalPrice*this.discount/100).toFixed(2))).toFixed(2);
		},
        // Размер скидки.
        discountPrice(){
            return (this.basketTotalPrice*this.discount/100).toFixed(2);
        },
	},

	methods: {
        // Переводим скролл на начало документа.
        scrollToTop(){
            document.documentElement.scrollIntoView();
        },
        // Получить данные текущего авторизованного пользователя
        getCurrentUser(){
            this.$parent.getJson('/auth/getCurrentUser')
            .then(data => {
                this.user = data;
                this.address = data.address;
                this.email = data.email;
            });
        },
        // Запретить редактирование текстового поля
        fixInput(event){
        	event.target.parentElement.parentElement.children[1].setAttribute('readOnly','readonly');
        	event.target.parentElement.parentElement.children[1].classList.add('shipad__log-button_fixed');
        },
        // Разрешить редактирование текстового поля
        unfixInput(event){
        	event.target.parentElement.parentElement.children[1].removeAttribute('readOnly');
        	event.target.parentElement.parentElement.children[1].classList.remove('shipad__log-button_fixed');
        },
        // Создать заказ
        makeOrder(){
        	if (!this.email || !this.tel || !this.address) {
        		return this.answerOrder('Please, fill in all required fields.');
        	}
        	this.$parent.postJson('/order/add', { goodsBasket: this.goodsBasket, goodsPrice: this.basketTotalPrice.toFixed(2), discountPrice: this.discountPrice, shippingPrice: this.shippingPrice.toFixed(2), cost: this.cost, userID: this.user.id, login: this.user.login, email: this.email, tel: this.tel, address: this.address, })
                .then(data => {
                    this.result = data;
                    console.log(data);
                });
            this.scrollToTop();
        },
        // Вывести сообщение при попытке сделать заказ.
        answerOrder(msg){
            document.querySelector('#orderAnswer').innerText = "* " + msg;
            setTimeout(() => document.querySelector('#orderAnswer').innerText = '', 3000);
        },
        // Записать данные в буфер при переходе на страницу товара.
        wrighteToBuffer(id){
            this.$root.$refs.buffer.goodID = id;
        },
    },

	mounted(){
		// Загружаем данные о текущем авторизованном пользователе.
        this.getCurrentUser();
        // Загружаем данные о корзине товаров из буфера.
        this.goodsBasket = this.$root.$refs.buffer.goodsBasket;
        this.basketTotalPrice = this.$root.$refs.buffer.basketTotalPrice;
		this.shippingPrice = this.$root.$refs.buffer.shippingPrice;
		this.discount = this.$root.$refs.buffer.discount;
    },

    template: `
	    <div id="checkout">
	    	<div class="path__man center">
				<div class="path__man__content">
					<p class="path__text">Checkout</p>
				</div>
			</div>
			<section v-if="result" class="checkout center">
				<h1>{{result}}</h1>
				<br>
				<h3>Следите за статусом заказа в личном кабинете</h3>
	            <div class="shipad__log-actions">
					<a @click="$root.changeCurrentPage($event, 'account'), scrollToTop()" class="total__button">my account</a>
				</div>
			</section>
			<section v-else class="checkout center">
				<div @click="currentStep = 'shipping-address'" v-if="currentStep != 'shipping-address'" class="checkout__item">01. SHIPPING ADDRESS</div>
				<shipping-address :user="user" v-else></shipping-address>
				<div @click="currentStep = 'billing-information'" v-if="currentStep != 'billing-information'" class="checkout__item">02. BILLING INFORMATION</div>
				<billing-information v-else></billing-information>
				<div @click="currentStep = 'shipping-information'" v-if="currentStep != 'shipping-information'" class="checkout__item">03. SHIPPING INFORMATION</div>
				<shipping-information v-else></shipping-information>
				<div @click="currentStep = 'shipping-method'" v-if="currentStep != 'shipping-method'" class="checkout__item">04. SHIPPING METHOD</div>
				<shipping-method v-else></shipping-method>
				<div @click="currentStep = 'payment-method'" v-if="currentStep != 'payment-method'" class="checkout__item">05. PAYMENT METHOD</div>
				<payment-method v-else></payment-method>
				<div @click="currentStep = 'order-review'" v-if="currentStep != 'order-review'" class="checkout__item">06. ORDER REVIEW</div>
				<order-review v-else></order-review>
			</section>
	    </div>
    `
});
// Компонент, реализующий шаг 01 оформления заказа.
Vue.component('shipping-address', {
    props: ['user'],
    data() {
      return {
        // Выбранный способ идентификации пользователя.
      	checkActive: 'reg',
        // Показать форму регистрации.
      	showRegForm: false,
        // Указанные при логине параметры.
      	loginEmail: '',
        loginPassword: '',
        // Указанные при регистрации параметры.
        regEmail: '',
        regLogin: '',
        regPassword: '',
      };
    },

    methods: {
    	// Проверка формата записи email.
        validateEmail(email){
            let regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return regexp.test(String(email).toLowerCase());
        },
        // Вывести сообщение при попытке логина.
        answerLogin(msg){
            document.querySelector('#loginAnswer').innerText = "* " + msg;
            setTimeout(() => document.querySelector('#loginAnswer').innerText = '', 3000);
        },
        // Вывести сообщение при попытке регистрации.
        answerReg(msg){
            document.querySelector('#regAnswer').innerText = "* " + msg;
            setTimeout(() => document.querySelector('#regAnswer').innerText = '', 3000);
        },
        // Попытка логина.
        login(event = null, email = this.loginEmail, password = this.loginPassword){
            if(!this.validateEmail(email)){
                return this.answerLogin('Неверно указан email')
            }

            this.$root.postJson('/auth/login', { email: email, password: password, })
                .then(data => {
                    if (data != 'successfully') {
                        this.answerLogin(data);
                    }
                    this.$parent.getCurrentUser();
                });
        },
        // Восстановление пароля.
        changePassword(){
            this.answerLogin('Sorry. We can`t help you now.' );
        },
        // Выход из личного кабинета.
        logout(){
        	this.$root.executeServerAction('/auth/out')
                .then(data => {
                    console.log(data);
                    this.$parent.getCurrentUser();
                });
            this.loginEmail = '';
            this.loginPassword = '';
        },
        // Попытка регистрации.
        register(){
            if(!this.validateEmail(this.regEmail)){
                return this.answerReg('Неверно указан email')
            }

            if (!this.regPassword || !this.regLogin) {
                return this.answerReg('Введите логин и пароль');
            }

            this.$root.postJson('/user/add', { email: this.regEmail, login: this.regLogin, password: this.regPassword, })
                .then(data => {
                    if (data == 'Вы успешно зарегистрированы') {
                    	this.login(null, this.regEmail, this.regPassword);
                        this.regEmail = '';
                        this.regLogin = '';
                        this.regPassword = '';
                        return;
                    }
                    this.answerReg(data);
                });
        },
        // Выбор способа идентификации пользователя.
        userChoiceAction(){
        	if (this.checkActive == 'reg') {
        		this.showRegForm = true;
        	}

        	if (this.checkActive == 'guest') {
        		this.$parent.isGuest = true;
        	}
        },
    },

    template: `
        <div class="checkout__item_shipad">
			<h2 class="shipad__head">01. SHIPPING ADDRESS</h2>
			<section v-if="$parent.isGuest" class="checkout__item__inputform center">
	            <p class="shipad__log-auth">Set shipping address: <span class="red">*</span></p>
				<input v-model="$parent.address" type="text" class="shipad__log-input-p shipad__log-button_fixed" readonly>
				<p class="shipad__log-note">* Required Fileds</p>
				<div class="shipad__log-actions">
					<a @click="$parent.fixInput($event)" class="shipad__log-button">Save</a>
					<a @click="$parent.unfixInput($event)" class="shipad__log-button">Change</a>
				</div>
	        </section>
			<section v-else-if="user" class="account center">
	            <div class="account__main">
	                <h2 class="account__head">User information</h2>
	                <div class="account__info">
	                    <p class="account__text">Login:</p>
	                    <p class="account__text" id="login">&nbsp;{{user.login}}</p>
	                </div>
	                <div class="account__info">
	                    <p class="account__text">Email:</p>
	                    <p class="account__text" id="email">&nbsp;{{user.email}}</p>
	                </div>
	                <a @click="logout" class="account__button">logout</a>
	                <section class="checkout__item__inputform">
			            <p class="shipad__log-auth">Set shipping address: <span class="red">*</span></p>
						<input v-model="$parent.address" type="text" class="shipad__log-input-p shipad__log-button_fixed" readonly>
						<p class="shipad__log-note">* Required Fileds</p>
						<div class="shipad__log-actions">
							<a @click='$parent.fixInput($event)' class="shipad__log-button">Save</a>
							<a @click='$parent.unfixInput($event)' class="shipad__log-button">Change</a>
						</div>
			        </section>
	            </div>
	        </section>
	        <div v-else class="checkout__item_regform">
	        	<section v-if="showRegForm" class="shipad__reg">
					<div class="registration-form">
	                    <h3 class="shipad__reg-head">Register here below</h3>
	                    <p class="shipad__reg-text">Please fill in the fields below</p>
	                    <p class="shipad__log-auth">EMAIL ADDRESS <span class="red">*</span></p>
	                    <input v-model="regEmail" type="email" class="shipad__log-input-e">
	                    <p class="shipad__log-auth">LOGIN <span class="red">*</span></p>
	                    <input v-model="regLogin" type="text" class="shipad__log-input-e">
	                    <p class="shipad__log-auth">PASSWORD <span class="red">*</span></p>
	                    <input v-model="regPassword" type="password" class="shipad__log-input-p">
	                    <p class="shipad__log-note">* Required Fileds</p>
	                    <div class="shipad__log-actions">
	                        <a @click='register' class="shipad__log-button">Register</a>
	                        <a @click="checkActive = 'guest', userChoiceAction()" class="shipad__log-button">checkout as guest</a>
	                    </div>
	                    <p class="account__answer" id="regAnswer"></p>
	                </div>
				</section>
		        <section v-else class="shipad__reg">
					<h3 class="shipad__reg-head">CHECK AS A GUEST OR REGISTER</h3>
					<p class="shipad__reg-text">Register with us for future convenience</p>
					<div @click="checkActive = 'guest'" class="shipad__reg-choice">
						<div class="shipad__reg-check"><img src="img/icons/Ellipse_4.svg" alt="check"><img class="shipad__reg-checkactive" :class="{'display_none': checkActive == 'reg'}" src="img/icons/Ellipse_5.svg" alt="checkactive"></div>
						<div class="shipad__reg-choice-text">checkout as guest</div>
					</div>
					<div @click="checkActive = 'reg'" class="shipad__reg-choice">
						<div class="shipad__reg-check"><img src="img/icons/Ellipse_4.svg" alt="check"><img class="shipad__reg-checkactive" :class="{'display_none': checkActive == 'guest'}" src="img/icons/Ellipse_5.svg" alt="checkactive"></div>
						<div class="shipad__reg-choice-text">register</div>
					</div>
					<h3 class="shipad__reg-head-warn">register and save time!</h3>
					<p class="shipad__reg-text">Register with us for future convenience</p>
					<p class="shipad__reg-pluses"><i class="fas fa-angle-double-right"></i> Fast and easy checkout</p>
					<p class="shipad__reg-pluses"><i class="fas fa-angle-double-right"></i> Easy access to your order history and status</p>
					<a @click="userChoiceAction()" class="shipad__reg-button">CONTINUE</a>
				</section>
				<section class="shipad__log">
					<h3 class="shipad__reg-head">Already registed?</h3>
					<p class="shipad__reg-text">Please log in below</p>
					<p class="shipad__log-auth">EMAIL ADDRESS <span class="red">*</span></p>
					<input v-model="loginEmail" type="email" class="shipad__log-input-e">
					<p class="shipad__log-auth">PASSWORD <span class="red">*</span></p>
					<input v-model="loginPassword" type="password" class="shipad__log-input-p">
					<p class="shipad__log-note">* Required Fileds</p>
					<div class="shipad__log-actions">
						<a @click='login' class="shipad__log-button">Log in</a>
						<a @click='changePassword' class="shipad__log-forgot">Forgot Password ?</a>
					</div>
					<p class="account__answer" id="loginAnswer"></p>
				</section>
	        </div>
		</div>
    `
});
// Компонент, реализующий шаг 02 оформления заказа.
Vue.component('billing-information', {
    template: `
	    <div class="checkout__item_shipad">
	    	<h2 class="shipad__head">02. BILLING INFORMATION</h2>
			<div class="account__main">
                <div class="account__info">
                    <p class="account__text">GOODS PRICE:</p>
                    <p class="account__text" id="login">&nbsp;$ {{$parent.basketTotalPrice.toFixed(2)}}</p>
                </div>
                <div v-if="$parent.discount" class="account__info">
                    <p class="account__text">DISCOUNT {{$parent.discount}} % :</p>
                    <p class="account__text" id="email">&nbsp;$ {{($parent.basketTotalPrice*$parent.discount/100).toFixed(2)}}</p>
                </div>
                <div class="account__info">
                    <p class="account__text">SHIPPING:</p>
                    <p class="account__text" id="email">&nbsp;$ {{$parent.shippingPrice.toFixed(2)}}</p>
                </div>
                <div class="account__info">
                    <p class="account__text">GRAND TOTAL:</p>
                    <p class="account__text" id="email">&nbsp;$ {{$parent.cost}}</p>
                </div>
            </div>
		</div>
    `
});
// Компонент, реализующий шаг 03 оформления заказа.
Vue.component('shipping-information', {
    template: `
        <div class="checkout__item_shipad">
			<h2 class="shipad__head">03. SHIPPING INFORMATION</h2>
			<section class="checkout__item__inputform">
	            <p class="shipad__log-auth">Set email: <span class="red">*</span></p>
				<input v-model="$parent.email" type="text" class="shipad__log-input-p shipad__log-button_fixed" readonly>
				<p class="shipad__log-note">* Required Fileds</p>
				<div class="shipad__log-actions">
					<a @click='$parent.fixInput($event)' class="shipad__log-button">Save</a>
					<a @click='$parent.unfixInput($event)' class="shipad__log-button">Change</a>
				</div>
	        </section>
	        <section class="checkout__item__inputform">
	            <p class="shipad__log-auth">Set telephone number: <span class="red">*</span></p>
				<input v-model="$parent.tel" type="text" class="shipad__log-input-p shipad__log-button_fixed" readonly>
				<p class="shipad__log-note">* Required Fileds</p>
				<div class="shipad__log-actions">
					<a @click='$parent.fixInput($event)' class="shipad__log-button">Save</a>
					<a @click='$parent.unfixInput($event)' class="shipad__log-button">Change</a>
				</div>
	        </section>
		</div>
    `
});
// Компонент, реализующий шаг 04 оформления заказа.
Vue.component('shipping-method', {
    template: `
        <div class="checkout__item_shipad">
			<h2 class="shipad__head">04. SHIPPING METHOD</h2>
			<section class="shipad__reg shipad__checkbox">
				<div @click="$parent.shippingMethod = 'delivery'" class="shipad__reg-choice">
					<div class="shipad__reg-check"><img src="img/icons/Ellipse_4.svg" alt="check"><img class="shipad__reg-checkactive" :class="{'display_none': $parent.shippingMethod == 'pickup'}" src="img/icons/Ellipse_5.svg" alt="checkactive"></div>
					<div class="shipad__reg-choice-text">Delivery</div>
				</div>
				<div @click="$parent.shippingMethod = 'pickup'" class="shipad__reg-choice">
					<div class="shipad__reg-check"><img src="img/icons/Ellipse_4.svg" alt="check"><img class="shipad__reg-checkactive" :class="{'display_none': $parent.shippingMethod == 'delivery'}" src="img/icons/Ellipse_5.svg" alt="checkactive"></div>
					<div class="shipad__reg-choice-text">Pick up</div>
				</div>
			</section>
		</div>
    `
});
// Компонент, реализующий шаг 05 оформления заказа.
Vue.component('payment-method', {
    template: `
        <div class="checkout__item_shipad">
			<h2 class="shipad__head">05. PAYMENT METHOD</h2>
			<section class="shipad__reg shipad__checkbox">
				<div @click="$parent.paymentMethod = 'cash'" class="shipad__reg-choice">
					<div class="shipad__reg-check"><img src="img/icons/Ellipse_4.svg" alt="check"><img class="shipad__reg-checkactive" :class="{'display_none': $parent.paymentMethod == 'card'}" src="img/icons/Ellipse_5.svg" alt="checkactive"></div>
					<div class="shipad__reg-choice-text">Cash</div>
				</div>
				<div @click="$parent.paymentMethod = 'card'" class="shipad__reg-choice">
					<div class="shipad__reg-check"><img src="img/icons/Ellipse_4.svg" alt="check"><img class="shipad__reg-checkactive" :class="{'display_none': $parent.paymentMethod == 'cash'}" src="img/icons/Ellipse_5.svg" alt="checkactive"></div>
					<div class="shipad__reg-choice-text">Card</div>
				</div>
			</section>
		</div>
    `
});
// Компонент, реализующий шаг 06 оформления заказа.
Vue.component('order-review', {
    template: `
        <div class="checkout__item_shipad">
			<h2 class="shipad__head">06. ORDER REVIEW</h2>
			<div class="checkout__order__products">
				<div class="checkout__order__head">order products:</div>
				<header class="product-cart__header">
					<div class="product-cart__head product-cart__head_first">product details</div>
					<div class="product-cart__head">unite price</div>
					<div class="product-cart__head">quantity</div>
					<div class="product-cart__head">shipping</div>
					<div class="product-cart__head">subtotal</div>
				</header>
				<section v-for="(good, index) in $parent.goodsBasket" class="product-cart__product">
					<div class="product-cart__pc-details">
						<div class="product-cart__img"><img class="product-cart__img_img" :src="good.path"></div>
						<div class="product-cart__text">
							<a @click="$parent.wrighteToBuffer(good.id), $root.changeCurrentPage($event, 'sinpage'), $parent.scrollToTop()" class="pc-details__head">{{good.name}}</a>
							<p class="pc-details__feature-color">Color: <span class="grey">{{good.color}}</span></p>
							<p class="pc-details__feature-size">Size: <span class="grey">M</span></p>
						</div>
					</div>
					<div class="product-cart__price">$ {{good.price}}</div>
					<div class="product-cart__quantity"><input type="text" class="product-cart__input" v-model="$parent.goodsBasket[index].count" readonly></div>
					<div class="product-cart__shipping">$ {{$parent.shippingPrice.toFixed(2)}}</div>
					<div class="product-cart__subtotal">$ {{(good.price * good.count).toFixed(2)}}</div>
				</section>
			</div>
			<div class="checkout__order__details">
				<div class="checkout__order__head">order details:</div>
				<div class="account__main">
	                <div class="account__info">
	                    <p class="account__text">GOODS PRICE:</p>
	                    <p class="account__text" id="login">&nbsp;$ {{$parent.basketTotalPrice.toFixed(2)}}</p>
	                </div>
	                <div v-if="$parent.discount" class="account__info">
	                    <p class="account__text">DISCOUNT {{$parent.discount}} % :</p>
	                    <p class="account__text" id="email">&nbsp;$ {{$parent.discountPrice}}</p>
	                </div>
	                <div class="account__info">
	                    <p class="account__text">SHIPPING:</p>
	                    <p class="account__text" id="email">&nbsp;$ {{$parent.shippingPrice.toFixed(2)}}</p>
	                </div>
	                <div class="account__info">
	                    <p class="account__text">GRAND TOTAL:</p>
	                    <p class="account__text" id="email">&nbsp;$ {{$parent.cost}}</p>
	                </div>
	                <div class="account__info">
	                    <p class="account__text">LOGIN:</p>
	                    <p class="account__text" id="login">&nbsp;{{$parent.user.login}}</p>
	                </div>
	                <div class="account__info">
	                    <p class="account__text">EMAIL:</p>
	                    <p class="account__text" id="login">&nbsp;{{$parent.email}}</p>
	                    <p v-if="!$parent.email" class="account__text"><span class="red">Please, fill in this field above</span></p>
	                </div>
	                <div class="account__info">
	                    <p class="account__text">CONTACT NUMBER:</p>
	                    <p class="account__text" id="login">&nbsp;{{$parent.tel}}</p>
	                    <p v-if="!$parent.tel" class="account__text"><span class="red">Please, fill in this field above</span></p>
	                </div>
	                <div class="account__info">
	                    <p class="account__text">ADDRESS:</p>
	                    <p class="account__text" id="login">&nbsp;{{$parent.address}}</p>
	                    <p v-if="!$parent.address" class="account__text"><span class="red">Please, fill in this field above</span></p>
	                </div>
	                <div class="account__info">
	                    <p class="account__text">SHIPPING METHOD:</p>
	                    <p class="account__text" id="login">&nbsp;{{$parent.shippingMethod}}</p>
	                </div>
	                <div class="account__info">
	                    <p class="account__text">PAYMENT METHOD:</p>
	                    <p class="account__text" id="login">&nbsp;{{$parent.paymentMethod}}</p>
	                </div>
	            </div>
            </div>
            <div class="checkout__order__log-actions">
				<a @click="$parent.makeOrder()" class="checkout__order__button">MAKE THE ORDER</a>
				<p class="checkout__order__answer" id="orderAnswer"></p>
			</div>
		</div>
    `
});