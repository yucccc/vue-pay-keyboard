<template>
  <div id="app">
    <button @click="payShow()">点击支付</button>
    <vue-pay-keyboard :is-pay='isPay' @pas-end='pasEnd' @close='isPay=false'></vue-pay-keyboard>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isPay: false
    }
  },
  methods:{
    payShow () {
      this.isPay = true;
    },
    pasEnd (val) {
      console.log(val); //得到密码 可能会进行一些加密动作
      // 请求接口 验证密码是否正确
    }
  }
}
</script>

<style lang="scss">

button{
  border: 1px solid #ccc;
  height: 30px;
  width: 100px;
}
</style>
