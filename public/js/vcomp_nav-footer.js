'use strict'
// Компонент, реализующий блок ссылок "подвала" сайта.
Vue.component('vcomp_nav-footer', {
    data(){
        return {
            // Заглушка для списка ссылок.
            navMenu: [
                { head: 'Company', refs: [ 'Home', 'Shop', 'About', 'How It Works', 'Contact'] },
                { head: 'Information', refs: [ 'Tearms & Condition', 'Privacy Policy', 'How to Buy', 'How to Sell', 'Promotion'] },
                { head: 'Shop Category', refs: [ 'Men', 'Women', 'Child', 'Apparel', 'Brows'] }
            ],
        }
    },

    methods: {
        // Переводим скролл на начало документа.
        scrollToTop(){
            document.documentElement.scrollIntoView();
        },
    },

    template: `
        <nav class="nav__footer center">
        <article class="nav__footer__text">
            <a class="logo" @click="$root.changeCurrentPage($event, 'home'), scrollToTop()"><img class="logo__img" src="img/icons/logo.png" alt="logo">BRAN <span class="colortext bold">D</span></a>
            <p class="nav__footer__content">Objectively transition extensive data rather than cross functional solutions. Monotonectally syndicate multidisciplinary materials before go forward benefits. Intrinsicly syndicate an expanded array of processes and cross-unit partnerships.<br><br>
                Efficiently plagiarize 24/365 action items and focused infomediaries.
            Distinctively seize superior initiatives for wireless technologies. Dynamically optimize.</p>
        </article>
        <nav v-for="item of navMenu" :class="'nav__footer__' + item.head.toLowerCase().replace(/\\s+/g, '')">
            <h1 class="nav__footer__head">{{item.head}}</h1>
            <ul class="nav__footer__list">
                <li class="nav__footer__link nav__footer__link__first"><a class="nav__footer__link__link">{{item.refs[0]}}</a></li>
                <li v-for="(ref, index) of item.refs" v-if="index > 0" class="nav__footer__link"><a class="nav__footer__link__link">{{ref}}</a></li>
            </ul>
        </nav>
    </nav>
    `
});