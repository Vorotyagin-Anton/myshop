'use strict'
// Компонент, реализующий блок "Social" сайта (цитаты дизайнеров, подписка на рассылку).
Vue.component('vcomp_social', {
    data(){
        return {
            // Введённый пользователем email.
            email: '',
            // Все дизайнеры товаров.
            designers: [],
            isLoaded: false,
            // Текущий отображаемый дизайнер.
            currentDesignerIndex: 0,
        }
    },

    methods: {
        // Валидация email.
        validateEmail(){
            let regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return regexp.test(String(this.email).toLowerCase());
        },
        // Вывести сообщение при попытке подписки на рассылку.
        answerSubscriber(msg){
            document.querySelector('.social__right__answer').innerText = "* " + msg;
            setTimeout(() => document.querySelector('.social__right__answer').innerText = '', 3000);
        },
        // Подписаться на рассылку.
        subscribe(){
            if(!this.validateEmail()){
                return this.answerSubscriber('Неверно указан email')
            }

            this.$parent.postJson('/social/subscribe', { email: this.email })
                .then(data => {
                    this.answerSubscriber(data);
                    this.email = '';
                });
        },
        // Методы переключения отображаемого дизайнера.
        increaseDesignerIndex(){
            if (this.currentDesignerIndex == this.designers.length - 1){
                return this.currentDesignerIndex = 0;
            }
            this.currentDesignerIndex++;
        },
        decreaseDesignerIndex(){
            if (this.currentDesignerIndex == 0){
                return this.currentDesignerIndex = this.designers.length - 1;
            }
            this.currentDesignerIndex--;
        }
    },

    mounted(){
        // Скачиваем данные о дизайнерах.
        this.$parent.getJson('/designer/all')
            .then(data => {
                for(let el of data){
                    this.designers.push(el);
                }
                this.isLoaded = true;
            });
        // Переключаем отображаемого дизайнера через опредеёлнный интервал времени.
        setInterval(() => this.increaseDesignerIndex(), 10000);
    },

    template: `
        <section class="social center">
        <div class="social__left">
            <img v-if="isLoaded" class="subscriber__foto" :src="designers[currentDesignerIndex].avatar" alt="photo">
            <div v-if="isLoaded" class="social__left__text">
                <p class="social__left__feedback">{{designers[currentDesignerIndex].quotation}}</p>
                <p class="social__left__name">{{designers[currentDesignerIndex].name}}</p>
                <p class="social__left__location">{{designers[currentDesignerIndex].address}}</p>
                <div class="social__left__slider">
                    <a @click='decreaseDesignerIndex()' class="social__left__navigation"></a>
                    <a @click='currentDesignerIndex = 0' class="social__left__navigation social__left__navigation__active"></a>
                    <a @click='increaseDesignerIndex()' class="social__left__navigation"></a>
                </div>
            </div>
        </div>
        <div class="social__right">
            <p class="social__right__head">SUBSCRIBE</p>
            <p class="social__right__text">FOR OUR NEWLETTER AND PROMOTION</p>
            <div class="social__right__form">
                <div>
                    <input v-model="email" type="text" class="social__right__input" placeholder="Enter Your Email">
                    <a class="social__right__button" @click='subscribe($event)'>Subscribe</a>
                </div>
                <p class="social__right__answer"></p>
            </div>
        </div>
    </section>
    `
});