<template>
  <div class="pay-box">
    <div>
      <!--输入的密码-->
      <div class="pas-box">
        <div v-for="(pas,i) in pasDigits" :key="i">
          <input type="password" :value="val[i]" disabled>
        </div>
      </div>

      <!--keyboard-->
      <div class="key-box">
        <div class="item" v-for="(item, i) in keyList" :key="i">
          <div class="key"
               v-for="(val, key) in item"
               :key="key"
               @touchstart="inputStart(val, $event)"
               @touchend="inputEnd($event)">
            {{val}}
          </div>
        </div>
        <div class="item">
          <div class="key" style="background: #ccc"></div>
          <div class="key"
               @touchstart="inputStart(0, $event)"
               @touchend="inputEnd($event)"
          >0
          </div>
          <div class="key" style="background: #999"
               @touchstart="del($event)"
               @touchend="inputEnd($event)"
          >-
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'vue-pay-keyboard',
        props: {
            highlightColor: {// 高亮颜色
                type: String,
                default: '#000'
            },
            pasDigits: {// 密码位数
                type: Number,
                default: 6
            }
        },
        data () {
            return {
                val: [],
                keyList: [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]
            }
        },
        methods: {
            inputEnd (e) {
                this.unhighLight(e.currentTarget)
            },
            // 恢复默认
            unhighLight (ele) {
                ele.style.backgroundColor = '#fff'
            },
            // 高亮
            highlight (ele) {
                ele.style.backgroundColor = this.highlightColor
            },
            // 用户输入
            inputStart (val, e) {
                if (this.val.length < this.pasDigits) {
                    this.val.push(val)
                }else {
                    // 密码输入完毕
                    this.$emit('pasEnd',this.val.join(''))
                }

                // 设置高亮
                this.highlight(e.currentTarget)
            },
            del () {
                this.val = this.val.slice(0, -1)
            }
        }

    }
</script>
<style lang="scss" scoped>
  * {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box
  }
  .pay-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: rgba(0, 0, 0, .1);
  }

  /*键盘盒子*/
  .key-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    .item {
      border-top: 1px solid #ccc;
      display: flex;
      text-align: center;
      line-height: 40px;
      height: 40px;
      .key:first-child {
        border-left: none;
      }
    }
    .key {
      background-color: #fff;
      cursor: pointer;
      border-left: 1px solid #ccc;
      width: 100%;
      height: 100%;
      flex: 1;
    }

  }

  /*输入密码框*/
  .pas-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 80%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 40px;
    display: flex;
    margin: 0 auto;
    background-color: #fff;
    text-align: center;
    > div:last-child {
      border-right: 1px solid #ccc;
    }
    > div {
      flex: 1;
      border-left: 1px solid #ccc;
      > input {
        width: 100%;
        font-size: 18px;
        text-align: center;
        height: 100%;
        display: block;
      }
    }
  }
</style>
