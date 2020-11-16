'use strict'
// Реализация буфера для обмена данными при переходе от одного компонента к другому.
Vue.component('vcomp_buffer', {
	data(){
		return {
			// Данные со страницы корзины товаров при переходе к оформлению заказа.
			goodsBasket: [],
			basketTotalPrice: 0,
			shippingPrice: 0,
			discount: 0,
			// Данные о товаре при переходе на страницу товара.
			goodID: 0,
		}
	},
	template: '<div></div>',
});