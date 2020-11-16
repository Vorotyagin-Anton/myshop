'use strict'
// Подключение кода к шаблону.
const vue_app = new Vue({
    el: '#vue_app',

    data: {
        currentPage: 'home',
    },

    computed: {
        // Текущая страница (отображаемый компонент основного контента).
        getCurrentPage(){
            return `vcomp_${this.currentPage}`;
        },
    },

    methods: {
        // Переключение текущей страницы.
        changeCurrentPage(event, name = null){
            if (name) {
                this.currentPage = name.toLowerCase().replace( /\s/g, "");    
            } else {
                this.currentPage = event.target.innerText.toLowerCase().replace( /\s/g, "");
            }
            document.head.querySelector('title').innerText = this.currentPage.toUpperCase();
        },
        // Выполнить действие на сервере.
        executeServerAction(url){
            console.log(url);
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        // Реализация основных методов взаимодействия с сервером.
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },

    },

    mounted() {
    }
});