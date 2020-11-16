'use strict'
// Компонент, реализующий блок основного меню сайта.
Vue.component('vcomp_nav', {
    data(){
        return {
            isLoaded: false,
            // Страницы в списке разделов меню сайта.
            pages: [{name: 'Home'}],
        }
    },

    props: ['currentPage'],

    methods: {
        // Изменить текущую страницу.
        changeCurrentPage(event){
            if(event.target.classList.contains('menu__link')){
                this.$emit('change-current-page', event);
            }
        },
        // Проверка текущей страницы.
        isCurrent(pageName){
            return this.currentPage == pageName.toLowerCase().replace( /\s/g, "");
        }
    },

    mounted(){
        // Скачать данные о разделах меню с сервера.
        this.$parent.getJson('/category/buildMenu')
            .then(data => {
                for(let el of data){
                    this.pages.push(el);
                }
                this.isLoaded = true;
            });
    },

    template: `
        <nav class="center">
            <ul class="menu" @click='changeCurrentPage($event)'>
                <li v-if="isLoaded" v-for='page of pages' class="menu__list"><a class="menu__link" :class='{menu__link__active: isCurrent(page.name)}'>{{ page.name }}</a>
                    <vcomp_nav_drop :ref="'vcomp_nav_drop_' + page.name.toLowerCase()" v-if='page.drop' :page='page' :isLast='(page == pages[pages.length - 1]) || (page == pages[pages.length - 2])'></vcomp_nav_drop>
                </li>
            </ul>
        </nav>
    `
});