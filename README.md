# vue-pay-keyboard

A Vue component to pay-keyboard
一个虚拟数字支付键盘插件

## demo演示

[demo](http://yucccc.com/vuepayboard/)

## 安装

```JS
npm install vue-pay-keyboard -S
```

## 使用

```js
// ES6
import vuePayKeyboard from './lib/index.js'
// require
var vuePayKeyboard = require('PayKeyboard')

Vue.use(vuePayKeyboard)

// 或者直接使用script导入
<script src="./node_modules/vue/dist/vue-pay-keyboard.js"></script>

// 作为组件的方式使用
<vue-pay-keyboard></vue-pay-keyboard>
```

### Options

|    Property    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| highlightColor       | 点击时高亮颜色 |String| #000
| pasDigits        | 密码位数 |Number | 6
| isPay        | 显示键盘 |Boolean | false
| payTitle        | 支付标题 |String | 请输入支付密码

### Functions

| Function Name | Description   |
| :--------:   | -----  |
|    pasEnd    |  密码输入完毕
|    close    |  关闭键盘
