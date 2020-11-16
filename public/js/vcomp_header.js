'use strict'
// Компонент, реализующий "шапку" сайта.
Vue.component('vcomp_header', {
    methods: {
        // Переводим скролл на начало документа.
        scrollToTop(){
            document.documentElement.scrollIntoView();
        },
        // Вывести сообщение при попытке поиска.
        answerForm(msg){
            document.querySelector('#formAnswer').innerText = "* " + msg;
            setTimeout(() => document.querySelector('#formAnswer').innerText = '', 3000);
        },
    },
    template: `
        <header class="header center">
        <div class="header__left">
            <a class="logo" @click="$root.changeCurrentPage($event, 'home'), scrollToTop()"><img class="logo__img" src="img/icons/logo.png" alt="logo">BRAN<span class="colortext bold">D</span></a>
            <form class="header__form">
                <a @click="answerForm('Function in progress. Will be elastic search soon.')" class="button__browse__form">Browse</a>
                <input type="text" class="header__form__input" placeholder="Search for Item...">
                <a @click="answerForm('Function in progress. Will be elastic search soon.')" class="button__submit__form"><img src="img/icons/search.png" alt="search"></a>
                <p class="account__answer" id="formAnswer"></p>
            </form>
        </div>
        <div class="header__right">
            <a @click="$root.changeCurrentPage($event, 'cart'), scrollToTop()" class="header__cart"><img src="img/icons/cart.svg" alt="cart"></a>
            <a @click="$root.changeCurrentPage($event, 'account'), scrollToTop()" class="button__account">My Account</a>
        </div>
    </header>
    `
});