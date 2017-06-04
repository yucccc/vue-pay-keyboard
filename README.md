# vue-pay-keyboard

A Vue component to pay-keyboard
一个虚拟数字支付键盘插件
### 安装
```
npm install vue-pay-keyboard -S
```
### 使用
```
import payKeyboard from 'vue-pay-keyboard'
components: {
  payKeyboard
}
```
### Options
|    Property    |    Description   |   type   |	default	|
| -----------------  | ---------------- | :--------: | :----------: |
| highlightColor       | Click on the highlighted the background color |String| #000
| pasDigits        | The password to enter digits |Number | 6
| isPay        | According to the keyboard |Boolean | false


### Functions
| Function Name | Description   |
| :--------:   | -----  |
|    pasEnd    |  Password to complete
