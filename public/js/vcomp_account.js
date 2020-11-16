'use strict'
// Компонент, реализующий личный кабинет пользователя.
Vue.component('vcomp_account', {
	data(){
		return {
            // Сведения о текущем авторизованном пользователе.
            user: '',
            // Заказы текущего авторизованного пользователя. 
            userOrders: [],
            displayOrders: false,
            // Введённые данные при логине.
            loginEmail: '',
            loginPassword: '',
            // Введённые данные при регистрации.
            regEmail: '',
            regLogin: '',
            regPassword: '',
            //
            // Свойства для работы функционала администратора.
            //
            // Все заказы для администратора.
            allOrders: [],
            displayAllOrders: false,
            // Форма добавления товара для администратора.
            displayAddForm: false,
            // Доступные для выбора категории товаров для администратора.
            firstCat: [],
            secondCat: [],
            thirdCat: [],
            // Доступные для выбора дизайнеры для администратора.
            designers: [],
            // Доступные для выбора бренды для администратора.
            brands: [],
            // Доступные для выбора размеры для администратора.
            sizes: [{id: 1, name: 'xxs'}, {id: 2, name: 'xs'}, {id: 3, name: 's'}, {id: 4, name: 'm'}, {id: 5, name: 'l'}, {id: 6, name: 'xl'}, {id: 7, name: 'xxl'},],
            // Выбранные размеры для администратора.
            checkedSizes: [],
		}
	},

	methods: {
        // Переводим скролл на начало документа.
        scrollToTop(){
            document.documentElement.scrollIntoView();
        },
        // Получить имя текущего авторизованного пользователя
        getCurrentUser(){
            this.$parent.getJson('/auth/getCurrentUser')
            .then(data => {
                this.user = data;
            });
        },
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
            this.$parent.postJson('/auth/login', { email: email, password: password, })
                .then(data => {
                    if (data != 'successfully') {
                        this.answerLogin(data);
                    }
                    this.getCurrentUser();
                    this.scrollToTop();
                });
        },
        // Восстановление пароля.
        changePassword(){
            this.answerLogin('Sorry. We can`t help you now.' );
        },
        // Выход из личного кабинета.
        logout(){
            this.$parent.executeServerAction('/auth/out')
                .then(data => {
                    console.log(data);
                    this.getCurrentUser();
                });
            this.loginEmail = '';
            this.loginPassword = '';
            this.userOrders = [];
            this.displayOrders = false;
        },
        // Попытка регистрации.
        register(){
            if(!this.validateEmail(this.regEmail)){
                return this.answerReg('Неверно указан email')
            }
            if (!this.regPassword || !this.regLogin) {
                return this.answerReg('Введите логин и пароль');
            }
            this.$parent.postJson('/user/add', { email: this.regEmail, login: this.regLogin, password: this.regPassword, })
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
        // Показать все заказы пользователя.
        showOrders(){
            if (this.userOrders.length == 0) {
                // Загружаем данные о заказах пользователя.
                this.$parent.getJson(`/order/one`)
                    .then(data => {
                        for(let el of data){
                            this.userOrders.push(el);
                        }
                    });
            }
            this.displayOrders = true;
        },
        //
        // Методы для функционала администратора.
        //
        // Показать все заказы для администратора.
        showAllOrders(){
            if (this.allOrders.length == 0) {
                // Загружаем данные о всех заказах.
                this.$parent.getJson(`/order/all`)
                    .then(data => {
                        for(let el of data){
                            this.allOrders.push(el);
                        }
                    });
            }
            this.displayAllOrders = true;
        },
        // Изменить статус заказа.
        changeStatus(event, orderID, orderIndex){
            let status = document.querySelector(`select[name = '${orderID}']`).value;
            this.$parent.postJson('/order/status', { orderID: orderID, status: status, })
                .then(data => {
                    console.log(data);
                });
            this.allOrders[orderIndex].status = status;
        },
        // Отправка формы.
        sendForm(){
            let formElem = document.querySelector('#addGood');

            if(!this.checkedSizes.length){
                return this.answerForm('Укажите доступные размеры товара');
            }

            fetch('/good/add', {
                  method: 'POST',
                  body: new FormData(formElem)
                }).then(result => result.json())
                    .then(data => this.answerForm(data))
                    .catch(error => {
                        this.$root.$refs.error.setError(error);
                    });
            formElem.reset();
        },
        // Вывести сообщение при попытке отправки формы.
        answerForm(msg){
            document.querySelector('#formAnswer').innerText = "* " + msg;
            setTimeout(() => document.querySelector('#formAnswer').innerText = '', 3000);
        },
        // Загрузить категории первого уровня.
        setFirstCat(){
            // Загружаем главные категории.
            this.$parent.getJson('/category/getAllSubcategoriesFirst')
                .then(data => {
                    for(let el of data){
                        this.firstCat.push(el);
                    };
                    // Загружаем подкатегории второго уровня.
                    this.$parent.getJson(`/category/getAllSubcategoriesSecond?id=${this.firstCat[0].id}`)
                        .then(data => {
                            for(let el of data){
                                this.secondCat.push(el);
                            };
                            // Загружаем подкатегории третьего уровня.
                            this.$parent.getJson(`/category/getAllSubcategoriesThird?id=${this.secondCat[0].id}`)
                                .then(data => {
                                    for(let el of data){
                                        this.thirdCat.push(el);
                                    };
                                });
                        });
                });
        },
        // Загрузить категории второго уровня.
        setSecondCat(){
            this.secondCat = [];
            let firstCat = document.querySelector('#firstCat').value;
            this.$parent.getJson(`/category/getAllSubcategoriesSecond?id=${firstCat}`)
            .then(data => {
                for(let el of data){
                    this.secondCat.push(el);
                };
                if(this.secondCat.length == 0){
                    this.secondCat.push({ name: 'нет категорий' });
                }
                // Загружаем подкатегории третьего уровня.
                this.thirdCat = [];
                this.$parent.getJson(`/category/getAllSubcategoriesThird?id=${this.secondCat[0].id}`)
                    .then(data => {
                        for(let el of data){
                            this.thirdCat.push(el);
                        };
                        if(this.thirdCat.length == 0){
                            this.thirdCat.push({ name: 'нет категорий' });
                        }
                    });
            });
        },
        // Загрузить категории третьего уровня.
        setThirdCat(){
            this.thirdCat = [];
            let secondCat = document.querySelector('#secondCat').value;
            this.$parent.getJson(`/category/getAllSubcategoriesThird?id=${secondCat}`)
            .then(data => {
                for(let el of data){
                    this.thirdCat.push(el);
                }
                if(this.thirdCat.length == 0){
                    this.thirdCat.push({ name: 'нет категорий' });
                }
            });
        },
        // Записать данные в буфер при переходе на страницу товара.
        wrighteToBuffer(id){
            this.$root.$refs.buffer.goodID = id;
        },
    },

	mounted(){
        // Загружаем сведения о текущем авторизованном пользователе.
        this.getCurrentUser();
        //
        // Для администратора.
        //
        // Загружаем бренды.
        this.$parent.getJson(`/brand/all`)
            .then(data => {
                for(let el of data){
                    this.brands.push(el);
                }
            });
        // Загружаем дизайнеров.
        this.$parent.getJson(`/designer/all`)
            .then(data => {
                for(let el of data){
                    this.designers.push(el);
                }
            });
    },

    template: `
	    <div id="account">
	    	<div class="path__man center">
				<div class="path__man__content">
					<p class="path__text">User Profile</p>
				</div>
			</div>
            <section v-if="user" class="account center">
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
                    <a @click="showOrders" class="account__button">show orders</a>
                    <a @click="displayOrders = false" class="account__button">hide orders</a>
                </div>
                <section v-if="displayOrders" class="account__orders">
                    <section v-for="order in userOrders" class="account__order">
                        <div class="checkout__order__head">Order № {{order.id}}. Status - {{order.status}}. Login - {{order.login}}.</div>
                        <div class="checkout__order__products">
                            <div class="checkout__order__head">order products:</div>
                            <header class="product-cart__header">
                                <div class="product-cart__head product-cart__head_first">product details</div>
                                <div class="product-cart__head">unite price</div>
                                <div class="product-cart__head">quantity</div>
                                <div class="product-cart__head">subtotal</div>
                            </header>
                            <section v-for="good in order.goods" class="product-cart__product">
                                <div class="product-cart__pc-details">
                                    <div class="product-cart__img"><img class="product-cart__img_img" :src="good.path"></div>
                                    <div class="product-cart__text">
                                        <a @click="wrighteToBuffer(good.id), $root.changeCurrentPage($event, 'sinpage'), scrollToTop()" class="pc-details__head">{{good.name}}</a>
                                        <p class="pc-details__feature-color">Color: <span class="grey">{{good.color}}</span></p>
                                        <p class="pc-details__feature-size">Size: <span class="grey">M</span></p>
                                    </div>
                                </div>
                                <div class="product-cart__price">$ {{good.price}}</div>
                                <div class="product-cart__quantity"><input type="text" class="product-cart__input" :value="good.count" readonly></div>
                                <div class="product-cart__subtotal">$ {{(good.price * good.count).toFixed(2)}}</div>
                            </section>
                        </div>
                        <div class="checkout__order__details">
                            <div class="checkout__order__head">order details:</div>
                            <div class="account__main">
                                <div class="account__info">
                                    <p class="account__text">GOODS PRICE:</p>
                                    <p class="account__text" id="login">&nbsp;$ {{order.goodsPrice}}</p>
                                </div>
                                <div v-if="order.discountPrice" class="account__info">
                                    <p class="account__text">DISCOUNT:</p>
                                    <p class="account__text" id="email">&nbsp;$ {{order.discountPrice}}</p>
                                </div>
                                <div class="account__info">
                                    <p class="account__text">SHIPPING:</p>
                                    <p class="account__text" id="email">&nbsp;$ {{order.shippingPrice}}</p>
                                </div>
                                <div class="account__info">
                                    <p class="account__text">GRAND TOTAL:</p>
                                    <p class="account__text" id="email">&nbsp;$ {{order.cost}}</p>
                                </div>
                                <div class="account__info">
                                    <p class="account__text">LOGIN:</p>
                                    <p class="account__text" id="login">&nbsp;{{order.login}}</p>
                                </div>
                                <div class="account__info">
                                    <p class="account__text">EMAIL:</p>
                                    <p class="account__text" id="login">&nbsp;{{order.email}}</p>
                                    <p v-if="!$parent.email" class="account__text"></p>
                                </div>
                                <div class="account__info">
                                    <p class="account__text">CONTACT NUMBER:</p>
                                    <p class="account__text" id="login">&nbsp;{{order.tel}}</p>
                                    <p v-if="!$parent.tel" class="account__text"></p>
                                </div>
                                <div class="account__info">
                                    <p class="account__text">ADDRESS:</p>
                                    <p class="account__text" id="login">&nbsp;{{order.address}}</p>
                                    <p v-if="!$parent.address" class="account__text"></p>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                <section v-if="displayOrders && userOrders.length == 0" class="account__orders">
                    <p class="account__notice">У вас пока нет заказов</p>
                </section>
            </section>
            <section v-else class="shipad__log center">
                <div class="login-form">
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
                </div>
                <hr>
                <div class="registration-form">
                    <h3 class="shipad__reg-head">Else register here below</h3>
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
                    </div>
                    <p class="account__answer" id="regAnswer"></p>
                </div>
            </section>
            <section v-if="Number(user.isAdmin)" class="account center">
                <div class="account__main">
                    <h2 class="account__head">Administrator instruments</h2>
                    <div class="account__info">
                        <p class="account__text">View all orders:</p>
                    </div>
                    <a @click="showAllOrders" class="account__button">show all orders</a>
                    <a @click="displayAllOrders = false" class="account__button">hide all orders</a>
                    <section v-if="displayAllOrders" class="account__orders">
                        <section v-for="(order, index) in allOrders" class="account__order">
                            <div class="checkout__order__head">Order № {{order.id}}.</div>
                            <div class="checkout__order__head">Status - {{allOrders[index].status}}.</div>
                            <div class="checkout__order__head">Login - {{order.login}}.</div>
                            <div>
                                <p>Изменить статус на:</p> 
                                <select :name="order.id" style="margin-top: 10px; margin-bottom: 10px; border: 1px solid black">
                                    <option>Заказ оформлен</option>
                                    <option>В работе</option>
                                    <option>В службе доставки</option>
                                    <option>Доставлено</option>
                                </select>
                                <a @click="changeStatus($event, order.id, index)" class="account__button">Изменить</a>
                            </div>
                            <div class="checkout__order__products">
                                <div class="checkout__order__head">order products:</div>
                                <header class="product-cart__header">
                                    <div class="product-cart__head product-cart__head_first">product details</div>
                                    <div class="product-cart__head">unite price</div>
                                    <div class="product-cart__head">quantity</div>
                                    <div class="product-cart__head">subtotal</div>
                                </header>
                                <section v-for="good in order.goods" class="product-cart__product">
                                    <div class="product-cart__pc-details">
                                        <div class="product-cart__img"><img class="product-cart__img_img" :src="good.path"></div>
                                        <div class="product-cart__text">
                                            <a @click="wrighteToBuffer(good.id), $root.changeCurrentPage($event, 'sinpage'), scrollToTop()" class="pc-details__head">{{good.name}}</a>
                                            <p class="pc-details__feature-color">Color: <span class="grey">{{good.color}}</span></p>
                                            <p class="pc-details__feature-size">Size: <span class="grey">M</span></p>
                                        </div>
                                    </div>
                                    <div class="product-cart__price">$ {{good.price}}</div>
                                    <div class="product-cart__quantity"><input type="text" class="product-cart__input" :value="good.count" readonly></div>
                                    <div class="product-cart__subtotal">$ {{(good.price * good.count).toFixed(2)}}</div>
                                </section>
                            </div>
                            <div class="checkout__order__details">
                                <div class="checkout__order__head">order details:</div>
                                <div class="account__main">
                                    <div class="account__info">
                                        <p class="account__text">GOODS PRICE:</p>
                                        <p class="account__text" id="login">&nbsp;$ {{order.goodsPrice}}</p>
                                    </div>
                                    <div v-if="order.discountPrice" class="account__info">
                                        <p class="account__text">DISCOUNT:</p>
                                        <p class="account__text" id="email">&nbsp;$ {{order.discountPrice}}</p>
                                    </div>
                                    <div class="account__info">
                                        <p class="account__text">SHIPPING:</p>
                                        <p class="account__text" id="email">&nbsp;$ {{order.shippingPrice}}</p>
                                    </div>
                                    <div class="account__info">
                                        <p class="account__text">GRAND TOTAL:</p>
                                        <p class="account__text" id="email">&nbsp;$ {{order.cost}}</p>
                                    </div>
                                    <div class="account__info">
                                        <p class="account__text">LOGIN:</p>
                                        <p class="account__text" id="login">&nbsp;{{order.login}}</p>
                                    </div>
                                    <div class="account__info">
                                        <p class="account__text">EMAIL:</p>
                                        <p class="account__text" id="login">&nbsp;{{order.email}}</p>
                                        <p v-if="!$parent.email" class="account__text"></p>
                                    </div>
                                    <div class="account__info">
                                        <p class="account__text">CONTACT NUMBER:</p>
                                        <p class="account__text" id="login">&nbsp;{{order.tel}}</p>
                                        <p v-if="!$parent.tel" class="account__text"></p>
                                    </div>
                                    <div class="account__info">
                                        <p class="account__text">ADDRESS:</p>
                                        <p class="account__text" id="login">&nbsp;{{order.address}}</p>
                                        <p v-if="!$parent.address" class="account__text"></p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                    <hr style="margin-top: 30px; margin-bottom: 30px;">
                    <div class="account__info">
                        <p class="account__text">Add product:</p>
                    </div>
                    <a @click="displayAddForm = true, setFirstCat()" class="account__button">Open form</a>
                    <a @click="displayAddForm = false, firstCat = [], secondCat = [], thirdCat = []" class="account__button">Close form</a>
                    <section v-if="displayAddForm" class="account__orders">
                        <h1>Добавление нового товара</h1>
                        <form class="account__form" id="addGood" enctype="multipart/form-data" method="post" @submit.prevent="sendForm">
                            <p class="account__form__head">Название товара:</p>
                            <input class="account__form__text" name="name" placeholder="name" required>
                            <p class="account__form__head">Цена товара:</p>
                            <input class="account__form__text" name="price" placeholder="price" required>
                            <p class="account__form__head">Описание товара:</p>
                            <textarea rows="10" class="account__form__text" name="description" placeholder="description" required></textarea>
                            <p class="account__form__head">Цвет товара:</p>
                            <input class="account__form__text" name="color" placeholder="color" required>
                            <p class="account__form__head">К какому полу относится:</p>
                            <select class="account__form__select" name="gender">
                                <option value="female">female</option>
                                <option value="male">male</option>
                            </select>
                            <p class="account__form__head">Основная категория товара:</p>
                            <select id="firstCat" class="account__form__select" name="firstCat" @change="setSecondCat">
                                <option v-for="cat in firstCat" :value="cat.id">{{cat.name}}</option>
                            </select>
                            <p class="account__form__head">Главная подкатегория товара:</p>
                            <select id="secondCat" class="account__form__select" name="secondCat" @change="setThirdCat">
                                <option v-for="cat in secondCat" :value="cat.id">{{cat.name}}</option>
                            </select>
                            <p class="account__form__head">Вспомогательная подкатегория товара:</p>
                            <select id="thirdCat" class="account__form__select" name="thirdCat">
                                <option v-for="cat in thirdCat" :value="cat.id">{{cat.name}}</option>
                            </select>
                            <p class="account__form__head">Бренд:</p>
                            <select class="account__form__select" name="brand">
                                <option v-for="brand in brands" :value="brand.id">{{brand.name}}</option>
                            </select>
                            <p class="account__form__head">Дизайнер:</p>
                            <select class="account__form__select" name="designer">
                                <option v-for="designer in designers" :value="designer.id">{{designer.name}}</option>
                            </select>
                            <div class="catalog__goods__features__size">
                                <p class="goods__features" style="margin-bottom: 0px;">SIZE</p>
                                <div class="size__selection">
                                    <div v-for="size of sizes" class="size__selection__input">
                                        <input type="checkbox" :name="size.id" :value="size.id" v-model="checkedSizes">
                                        <p class="size__selection__input__text">{{size.name}}</p>
                                    </div>
                                </div>
                            </div>
                            <input class="account__form__checkbox" type="checkbox" name="hotDeal"><p>Hot Deal</p>
                            <input class="account__form__checkbox" type="checkbox" name="featured"><p>Featured</p>
                            <input type="hidden" name="MAX_FILE_SIZE" value="900000" />
                            <p class="account__form__head">Главное изображение:</p>
                            <input class="account__form__file" name="userfile" type="file" />
                            <input class="account__form__submit" type="submit">
                            <p class="account__answer" id="formAnswer"></p>
                        </form>
                    </section>
                </div>
            </section>
	    </div>
    `
});