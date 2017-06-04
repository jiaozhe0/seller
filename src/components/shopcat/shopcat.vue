<template>
  <div>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" @click="tooleList()">
          <div class="logo" :class="{highLight:totalCount}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
        <div class="desc">令需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" :class="payClass">{{payDesc}}</div>
    </div>

    <div class="ball-container">
      <transition name="drop"
                  v-on:before-enter="beforeEnter"
                  v-on:enter="enter"
                  v-on:after-enter="afterEnter"
                  v-for="(ball,index) in balls" :key="ball">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>

    //选中产品列表
    <transition name="fold" >
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title fl">购物车</h1><span class="empty fr" @click="empty"> 清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
        <li class="food" v-for="food in selectFoods">
          <span class="name">{{food.name}}</span>
          <div class="price"><span>￥{{food.price * food.count}}</span></div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" v-on:cartAdd="drop"></cartcontrol>
          </div>
        </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
    <transition name="fade" >
      <div class="list-mask" v-show="listShow" @click="tooleList()"></div>
    </transition>
  </div>
</template>
<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import CARTCONTROL from '../cartcontrol/cartcontrol.vue';
  export default{
    props: {
      'selectFoods': {
        type: Array,
        default() {
          return [];
        }
      },
      'minPrice': {
        type: Number,
        default: 0
      },
      'deliveryPrice': {
        type: Number,
        default: 0
      }
    },
    components: {
      'cartcontrol': CARTCONTROL
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    created () {
      this.$root.eventHub.$on('cart.add', this.drop);
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.querySelector('.inner-hook');
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {
        /* eslint-disable no-unused-vars */
        var rf = el.offsetHeight; // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.querySelector('.inner-hook');
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      tooleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      }
    },
    computed: {
      // 总价格
      totalPrice() {
        let total = 0;
        if (this.selectFoods.length > 0) {
          this.selectFoods.forEach((food) => {
            if (food.count) total += food.price * food.count;
          });
        }
        return total;
      },
      // 产品总数量
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          if (food.count) count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}配送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
//              console.log(this.$refs.listContent.nodeName);
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
          return show;
        }
      }
    }
  };

</script>
<style lang='less' scoped>
  @import  "../../common/less/mixin.less";
.shopcart{
  position: fixed;
  left:0;
  bottom: 0;
  z-index: 999999;
  .size(100%;48px);
  .content{
    display: flex;
    background: #141d27;
    .content-left{
      flex: 1;
      .logo-wrapper{
        display: inline-block;
        position: relative;
        top:-10px;
        margin:0 12px;
        padding: 6px;
        .size(56px;56px);
        box-sizing: border-box;
        vertical-align: top;
        border-radius:50%;
        background: #141d27;
        .logo{
           .size(100%;100%);
          background: rgba(255,255,255,.2);
          text-align: center;
          border-radius:50%;
          &.highLight{
            background: rgb(0,160,220);
            .icon-shopping_cart{
              color:#fff;
            }
          }
          .icon-shopping_cart{
            font-size:24px;
            line-height: 44px;
            color:#80858a;
          }
        }
        .num{
          position:absolute;
          top:0;
          right:0;
          .size(24px;16px);
          line-height:16px;
          border-radius: 16px;
          font-weight: 700;
          font-size:9px;
          color:#FFF;
          background: rgb(240,20,20);
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0,4);
          text-align: center;
        }
      }

      .price{
        display: inline-block;
        font-weight: 700;
        line-height: 24px;
        vertical-align: top;
        margin-top: 12px;
        box-sizing: border-box;
        padding-right:12px;
        border-right:1px solid rgba(155,155,155,.1);
        color:rgba(255,255,255,.2);
        &.highlight{
        color:#fff;
      }
      }
      .desc{
        display: inline-block;
        line-height: 24px;
        vertical-align: top;
        margin:12px 0 0 12px;
        color:rgba(255,255,255,.2);
        font-size: 10px;
      }
    }
    .content-right{
      flex:0 0 105px;
      color:rgba(255,255,255,.4);
      font-size:12px;
      line-height: 48px;
      font-weight:700;
      background: rgba(255,255,255,.2);
      text-align: center;
      &.not-enough{
        background: #2b333b;
      }
      &.enough{
        background: #00b43c;
        color: #fff;
      }
    }
  }
}
  .ball-container{
    .ball{
      position: fixed;
      left:32px;
      bottom:22px;
      z-index:200;
      /*transition: transform 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);*/
      .inner{
        .size(16px;16px);
        border-radius: 50%;
        background:rgb(0,160,220);
        transition:transform 0.4s linear;
      }
    }
   .drop-enter,.drop-enter-active{
      transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
    }
  }

  .shopcart-list{
    position: absolute;
    top:0;
    left:0;
    /*bottom: 0;*/
    z-index:-1 ;
    width:100%;
    transform: translate3d(0,-100%,0);
    .list-header{
      height:40px;
      line-height:40px;
      padding:0 18px;
      background:#f3f5f7;
      border-bottom:1px solid rgba(7,17,27,0.1);
    }
    .list-content{
      padding:0 10px;
      max-height:217px;
      background:#fff;
      overflow: hidden;
      .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        .border-1px(rgba(7,17,27,0.1));
        .name{
          line-height: 24px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .price{
          position:absolute;
          right:96px;
          bottom:12px;
          line-height:24px;
          font-size:14px;
          font-weight:700;
          color:rgb(240,20,20);
        }
        .cartcontrol-wrapper{
          position: absolute;
          right: 0px;
          bottom:6px;
        }
      }
    }
  }
  .list-mask{
    position: fixed;
    top:0;
    left:0;
    .size(100%;100%);
    z-index:40;
    opacity: 1;
    background: rgba(7,17,27,0.6);
    -webkit-backdrop-filter: blur(10px);
  }
  .fade-enter-active,.fade-leave-active{
    transition:all 1s;
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
  }
  .fold-enter-active,.fold-leave-active{
    transition:all 0.5s;
  }
  .fold-enter,.fold-leave-active{
    transform:translate3d(0,0,0) ;
  }
</style>
