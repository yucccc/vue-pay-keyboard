<template>
    <div class="pay-box" v-if="isPay">
        <!-- <transition v-on:before-enter="beforeEnter"> -->
        <div v-if="isPay">
            <!-- 标题 -->
            <div class="title v-1px-b pr">
                <span>{{payTitle}}</span>
                <span class="pa" @click="close">
                    <svg t="1501505446265" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1904" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18">
                        <path d="M550.659 490.565l324.395-324.386c10.945-10.945 10.945-28.699 0-39.644-10.948-10.95-28.704-10.95-39.648-0.004L511.01 450.916 186.625 126.53c-10.946-10.947-28.703-10.947-39.648 0-10.946 10.95-10.946 28.703 0 39.648l324.385 324.386-324.385 324.401c-10.946 10.944-10.946 28.703 0 39.65 10.945 10.943 28.702 10.943 39.648 0L511.01 530.213l324.396 324.401c10.944 10.944 28.7 10.944 39.648 0 10.945-10.946 10.945-28.705 0-39.649L550.66 490.565z" p-id="1905"></path>
                    </svg>
                </span>
            </div>
            <!--输入的密码-->
            <div class="pas-box v-1px" v-show="keyShow">
                <div v-for="(pas,i) in pasDigits" :key="i" :class="{'v-1px-l':i>0}">
                    <input type="password" :value="val[i]" disabled>
                </div>
            </div>
    
            <!--keyboard-->
            <div class="key-box" v-if="keyShow">
                <div class="item v-1px-t" v-for="(item, i) in keyList" :key="i">
                    <div class="key" v-for="(val, key) in item" :key="key" @touchstart="inputStart(val, $event)" @touchend="inputEnd($event)" :class="{'v-1px-l':key!=0}">
                        {{val}}
                    </div>
                </div>
                <div class="item v-1px-t">
                    <div class="key  " style="background: #e8e8e8"></div>
                    <div class="key v-1px-l" @touchstart="inputStart(0, $event)" @touchend="inputEnd($event)">0
                    </div>
                    <div class="key v-1px-l" style="background: #e8e8e8" @touchstart="del($event)" @touchend="inputEnd($event,'del')">-
                    </div>
                </div>
            </div>
            <div style="text-align: center;" v-show='paySuc'>
                <slot name='pay-status'>
                    {{payStatusText}}
                </slot>
            </div>
            <!-- 密码输入完毕动画 -->
            <div class="loading" v-show="lodingShow" ref="loading">
                <slot name='loading-ani'>
                    <svg t="1501508156392" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1936" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">
                        <path d="M914.9 682.1c-22 52.1-53.5 98.8-93.7 139s-86.9 71.7-139 93.7c-53.9 22.8-111.1 34.3-170.2 34.3s-116.3-11.5-170.1-34.3c-52.1-22-98.8-53.5-139-93.7s-71.7-86.9-93.7-139C86.4 628.3 74.8 571.1 74.8 512s11.5-116.3 34.3-170.2c22-52.1 53.5-98.8 93.7-139s86.9-71.7 139-93.7c43.3-18.3 88.8-29.4 135.7-33C497 74.6 512 58.4 512 38.9l0 0c0-21.8-18.6-39-40.3-37.3C207.8 22.1 0 242.8 0 512c0 282.8 229.2 512 512 512 269.2 0 489.9-207.8 510.4-471.7 1.7-21.7-15.5-40.3-37.3-40.3l0 0c-19.5 0-35.8 15-37.3 34.4C944.2 593.3 933.2 638.8 914.9 682.1z" p-id="1937" fill="#6A8FE5"></path>
                    </svg>
                </slot>
            </div>
        </div>
        <!-- </transition> -->
    </div>
</template>
<script>
let timer = null;
export default {
    name: 'vue-pay-keyboard',
    props: {
        payTitle: {
            type: String,
            default: '请输入支付密码'
        },
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
    data() {
        return {
            keyShow: true,
            lodingShow: false,
            paySuc: false,
            val: [],
            keyList: [
                [1, 2, 3],
                [4, 6, 6],
                [7, 8, 9]
            ],
            payStatus: false
        }
    },
    computed: {
        payStatusText() {
            return this.payStatus ? '支付成功!' : '支付失败,请重输密码!'
        }
    },
    methods: {
        inputEnd(e, d) {
            this.unhighLight(e.currentTarget, d)
        },
        // 恢复默认
        unhighLight(ele, d) {
            if (d) {
                ele.style.backgroundColor = '#e8e8e8'
            } else {
                ele.style.backgroundColor = '#fff'
            }

        },
        // 高亮
        highlight(ele) {
            ele.style.backgroundColor = this.highlightColor
        },
        // 用户输入
        inputStart(val, e) {
            if (this.val.length < this.pasDigits) {
                this.val.push(val)
                if (this.val.length === this.pasDigits) {
                    // 密码输入完毕
                    this.$emit('pas-end', this.val.join(''))
                    this.keyShow = false;
                    this.lodingShow = true;
                    this.$refs.loading.classList.add('loading-ani')
                    this.val = [];
                }
            } else {
                this.$emit('pas-end', this.val.join(''))
            }
            // 设置高亮
            this.highlight(e.currentTarget)
        },
        // 删除输入
        del() {
            if (this.val.length > 0) {
                this.val.pop()
            }
        },
        close() {
            this.$emit('close')
        },
        $payStatus(flag) {
            if (typeof flag != 'boolean') return;
            this.payStatus = flag;
            this.lodingShow = false;
            this.paySuc = true;
            if (flag) {
                timer = setTimeout(() => {
                    clearTimeout(timer)
                    this.$emit('close')
                    this.keyShow = true;
                    this.paySuc = false;
                    this.$refs.loading.classList.remove('loading-ani')
                }, 800)
            } else {
                timer = setTimeout(() => {
                    clearTimeout(timer)
                    this.keyShow = true;
                    this.paySuc = false;
                    this.$refs.loading.classList.remove('loading-ani')
                }, 800)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
div,
span,
input {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box
}

input {
    background: none;
    outline: none;
    border: none;
    background-color: transparent;
    border-color: transparent;
    -webkit-appearance: none;
}

@keyframes loadingRotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg)
    }
}

.title {
    text-align: center;
    height: 50px;
    line-height: 50px;
    margin-bottom: 25px;
    position: relative;
}

.pa {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-content: center;
    justify-content: center;
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading-ani {
    animation: loadingRotate .8s infinite;
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
    z-index: 999;
    >div {
        position: absolute;
        width: 100%;
        height: 68%;
        left: 0;
        bottom: 0;
        color: #363636;
        background-color: #fff;
    }
}

.v-1px-t,
.v-1px-l,
.v-1px-b,
.v-1px {
    position: relative;
}

.v-1px-b:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #C7C7C7;
    color: #C7C7C7;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
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
    z-index: 1000;
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
    >div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        >input {
            width: 100%;
            font-size: 18px;
            text-align: center;
            height: 100%;
            display: block;
        }
    }
}

// 进入动画
.slide-enter-active {
    transition: all 10s ease; //   transform: translateY(0px)
}

.slide-enter {
    transform: translateY(500px)
}
</style>
