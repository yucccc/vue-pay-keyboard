# vue-pay-keyboard

A Vue component to pay-keyboard
一个虚拟数字支付键盘插件
### 安装
```
npm install vue-pay-keyboard -S
```
### 使用
```
// 导入
import vuePayKeyboard from './lib/index.js'
var vuePayKeyboard = require('PayKeyboard')
Vue.use(vuePayKeyboard)
或者直接使用script导入
// 作为组件的方式使用
<vue-pay-keyboard></vue-pay-keyboard>
```

### Options
|    Property    |    Description   |   type   |	default	|
| -----------------  | ---------------- | :--------: | :----------: |
| highlightColor       | Click on the highlighted the background color |String| #000
| pasDigits        | The password to enter digits |Number | 6
| isPay        | According to the keyboard |Boolean | false
| payTitle        | Pay the title |String | 请输入支付密码

### Functions
| Function Name | Description   |
| :--------:   | -----  |
|    pasEnd    |  Password to complete
|    close    |  Close the keyboard
