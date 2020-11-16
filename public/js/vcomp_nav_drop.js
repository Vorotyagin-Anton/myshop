'use strict'
// Комопнент, реализующий выпадающее меню пунктов основного меню сайта. 
Vue.component('vcomp_nav_drop', {

    props: ['page', 'isLast'],

    data(){
        return {
            // При нажатии на имя категории из выпадающего меню имя категории сохраняется в это свойство.
            selectedSubCategory: {name: null, id: null},
        }
    },

    methods: {
        // Установить параметры выбранной подкатегории.
        setSelectedSubCategory(name, id = null){
            if (this.$root.$refs.vcomp_man){
                this.$root.$refs.vcomp_man.selectedSubCategory.name = name;
                this.$root.$refs.vcomp_man.filterGoods();
                return;
            }
            // Раскомментировать по мере готовности разделов.
            /*if (this.$root.$refs.vcomp_women){
                this.$root.$refs.vcomp_women.selectedSubCategory.name = name;
                this.$root.$refs.vcomp_women.filterGoods();
                return;
            }
            if (this.$root.$refs.vcomp_kids){
                this.$root.$refs.vcomp_kids.selectedSubCategory.name = name;
                this.$root.$refs.vcomp_kids.filterGoods();
                return;
            }
            if (this.$root.$refs.vcomp_accesories){
                this.$root.$refs.vcomp_accesories.selectedSubCategory.name = name;
                this.$root.$refs.vcomp_accesories.filterGoods();
                return;
            }
            if (this.$root.$refs.vcomp_featured){
                this.$root.$refs.vcomp_featured.selectedSubCategory.name = name;
                this.$root.$refs.vcomp_featured.filterGoods();
                return;
            }
            if (this.$root.$refs.vcomp_hotdeals){
                this.$root.$refs.vcomp_hotdeals.selectedSubCategory.name = name;
                this.$root.$refs.vcomp_hotdeals.filterGoods();
                return;
            }*/
            this.selectedSubCategory.name = name;
        },
        // Переводим скролл на начало документа.
        scrollToTop(){
            document.documentElement.scrollIntoView();
        },
    },

    template: `
        <div class="drop" :class='[{drop_last: isLast}]'>
            <div v-for='column of page.drop' class="drop-flex">
                <h3 class="drop__h3">{{ column.head }}</h3>
                <ul class="drop__ul">
                    <li v-for='item of column.list'><a @click="$root.changeCurrentPage($event, page.name), scrollToTop(), setSelectedSubCategory(item)" class="drop__link">{{ item }}</a></li>
                </ul>
            </div>
        </div>
    `
});