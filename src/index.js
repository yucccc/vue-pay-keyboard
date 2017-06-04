import payKeyboard from  './vue-pay-keyboard.vue'
// 导出模块
export default payKeyboard;
//global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('pay-keyboard', payKeyboard);
}