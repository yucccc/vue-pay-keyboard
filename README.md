# vue-pay-keyboard

A Vue component to pay-keyboard
一个虚拟数字支付键盘插件

## demo演示

[demo](http://mall.yucccc.com/vuepayboard/)

## 安装

```JS
npm install vue-pay-keyboard -S
```

## 使用

```js
// ES6
import vuePayKeyboard from 'vue-pay-keyboard.js'
// require
var vuePayKeyboard = require('PayKeyboard')

Vue.use(vuePayKeyboard)

// 或者直接使用script导入
<script src="./node_modules/vue/dist/vue-pay-keyboard.js"></script>

// 作为组件的方式使用
<vue-pay-keyboard></vue-pay-keyboard>
```

### 配置

```html
   <vue-pay-keyboard
   ref="pay"
   :is-pay='isPay'
   @pas-end='pasEnd'
   @close='isPay=false'>
    <!-- 自定义支付动画 -->
      <div slot="loading-ani">
        <svg></svg>
      </div>
    </vue-pay-keyboard>
```

```javascript
methods:{
    pasEnd(val) {
      console.log(val);  //得到密码 可能会进行一些加密动作
      setTimeout(() => { // 模拟请求接口验证密码中 ..
        if (val === '111111') { // 密码正确
          this.$refs.pay.$payStatus(true) // 拿到子组件的事件
        } else {
          this.$refs.pay.$payStatus(false)
        }
      }, 1000)
    }
}
```

### Props

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| highlight-color       | 点击时高亮颜色 |String| #000
| pas-digits        | 密码位数 |Number | 6
| is-pay        | 显示键盘 |Boolean | false
| pay-title        | 支付标题 |String | 请输入支付密码

### Slots 支持自定义插槽

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| loading-ani       | 支付请求中 || loading
| pay-status        | 支付成功或者失败|| 支付成功

### Events

| name | Description   |
| :--------:   | -----  |
|    pas-end    |  密码输入完毕后触发事件,接收所输密码
|    close    |  关闭键盘
