'use strict'
// Компонент, реализующий "подвал" сайта.
Vue.component('vcomp_footer', {
    data(){
        return {
            date: new Date().getFullYear(),
        }
    },
    template: `
        <footer class="footer">
            <div class="footer__content center">
                <p class="footer__copyright"><i class="far fa-copyright"></i> {{date}} Brand All Rights Reserved.</p>
                <div class="social__links">
                    <a class="social__link"><i class="fab fa-facebook-f"></i></a>
                    <a class="social__link"><i class="fab fa-twitter"></i></a>
                    <a class="social__link"><i class="fab fa-linkedin-in"></i></a>
                    <a class="social__link"><i class="fab fa-google-plus-g"></i></a>
                    <a class="social__link"><i class="fab fa-google-plus-g"></i></a>
                </div>
            </div>
        </footer>
    `
});