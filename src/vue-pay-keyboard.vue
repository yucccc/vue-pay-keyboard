<template>
    <div class="pay-box" v-if="isPay">
        <div>
            <!--输入的密码-->
            <div class="pas-box v-1px">
                <div v-for="(pas,i) in pasDigits" :key="i" :class="{'v-1px-l':i>0}">
                    <input type="password" :value="val[i]" disabled>
                </div>
            </div>

            <!--keyboard-->
            <transition name="slide">
                <div class="key-box">
                    <div class="item v-1px-t" v-for="(item, i) in keyList" :key="i">
                        <div class="key"
                             v-for="(val, key) in item"
                             :key="key"
                             @touchstart="inputStart(val, $event)"
                             @touchend="inputEnd($event)" :class="{'v-1px-l':key!=0}">
                            {{val}}
                        </div>
                    </div>
                    <div class="item v-1px-t">
                        <div class="key  " style="background: #e8e8e8"></div>
                        <div class="key v-1px-l"
                             @touchstart="inputStart(0, $event)"
                             @touchend="inputEnd($event)"
                        >0
                        </div>
                        <div class="key v-1px-l" style="background: #e8e8e8"
                             @touchstart="del($event)"
                             @touchend="inputEnd($event,'del')"
                        >-
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'vue-pay-keyboard',
        props: {
            highlightColor: {// 高亮颜色
                type: String,
                default: '#ccc'
            },
            pasDigits: {// 密码位数
                type: Number,
                default: 6
            },
            isPay: {
                type: Boolean,
                default: false
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
            inputEnd (e, d) {
                this.unhighLight(e.currentTarget, d)
            },
            // 恢复默认
            unhighLight (ele, d) {
                if (d) {
                    ele.style.backgroundColor = '#e8e8e8'
                } else {
                    ele.style.backgroundColor = '#fff'
                }

            },
            // 高亮
            highlight (ele) {
                ele.style.backgroundColor = this.highlightColor
            },
            // 用户输入
            inputStart (val, e) {
                if (this.val.length < this.pasDigits) {
                    this.val.push(val)
                } else {
                    // 密码输入完毕
                    this.$emit('pasEnd', this.val.join(''))
                }

                // 设置高亮
                this.highlight(e.currentTarget)
            },
            del () {
                if (this.val.length > 0) {
                    this.val.pop()
                }
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
        z-index: 111;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        background-color: rgba(0, 0, 0, .5);
        > div {
            position: absolute;
            width: 100%;
            height: 68%;
            left: 0;
            bottom: 0;
            background-color: #fff;
        }
    }

    .v-1px-t, .v-1px-l, .v-1px {
        position: relative;
    }

    .v-1px-t:before {
        z-index: 112;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        content: '';
        border-top: 1px solid #c7c7c7;
        transform: scaleY(.5);
        color: #c7c7c7;
        transform-origin: 0 0;
    }

    .v-1px-l:before {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        content: '';
        border-left: 1px solid #c7c7c7;
        transform: scaleX(.5);
        color: #c7c7c7;
        transform-origin: 0 0;
    }

    .v-1px:before {
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        content: '';
        border: 1px solid #c7c7c7;
        transform: scale(.5);
        color: #c7c7c7;
        transform-origin: left top;
    }

    /*键盘盒子*/
    .key-box {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        font-size: 16px;
        color: #363636;
        .item {
            display: flex;
            text-align: center;
            line-height: 50px;
            height: 50px;
        }
        .key {
            cursor: pointer;
            width: 100%;
            height: 100%;
            flex: 1;
        }

    }

    /*输入密码框*/
    .pas-box {
        width: 80%;
        height: 45px;
        display: flex;
        margin: 0 auto;
        line-height: 45px;
        text-align: center;
        > div {
            flex: 1;
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
