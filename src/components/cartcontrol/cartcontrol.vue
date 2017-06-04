<template>
  <div class="cartcontrol">
    <transition enter-active-class="animated rollIn"
                leave-active-class="animated rollOut">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCart">

      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart($event)">
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default{
    props: {
      food: {
        type: Object
      }
    },
    components: {},
    data () {
      return {};
    },
    created () {
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return false;
        }
        if (!this.food.count) {
          this.$set(this.food, 'count', 1); // 设置一个响应式的数据
        } else {
          this.food.count++;
        }
        // 自定义事件
//        this.$emit('cartAdd', event.target);
        this.$root.eventHub.$emit('cart.add', event.target);
      },
      decreaseCart() {
        // 阻止pc端 点击事件2次触发
        if (!event._constructed) {
          return false;
        }
        this.food.count--;
      }
    }
  };

</script>
<style lang='less' scoped>
  .cartcontrol{
    font-size: 24px;
    line-height: 24px;
    color:rgb(0,160,200);
    .cart-decrease{
      display: inline-block;
      padding: 6px;
    }
    .cart-count{
      display: inline-block;
      width:12px;
      padding-top:6px;
      vertical-align: top;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147,153,159);
    }
    .cart-add{
      display: inline-block;
      padding: 6px;
    }
  }
  .show-enter-active{

  }
  .show-leave-active{

  }

</style>
