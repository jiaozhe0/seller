<template>
  <transition  enter-active-class="animated slideInRight"
               leave-active-class="animated slideOutRight"  >
  <div v-show="showFlag" class="food" mode="out-in" ref="food">
    <div class="food-content">
    <div class="image-header">
      <img :src="food.image" alt="">
      <div class="back" @click="showFlag = !showFlag">
        <i class="icon-arrow_lift"></i>
      </div>

    </div>
    <div class="content">
      <h1 class="title">{{food.name}}</h1>
      <div class="detail">
        <span class="sell-count">月售{{food.sellCount}}</span>
        <span class="rating">好评率{{food.rating}}</span>
      </div>
      <div class="price">
        <span class="now">Y{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
      </div>
      <div class="cartcontrol-wrapper">
        <cartcontrol :food="food" ></cartcontrol>
      </div>
      <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst($event)">加入购物车</div>
    </div>
      <split v-show="food.info"></split>
      <!--商品信息-->
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split v-show="food.info"></split>
      <!--商品评价-->
      <div class="rating">
        <h1 class="title">商品评价</h1>

        <ratingselect :desc="desc"
                      :selectType.sync="selectTypes"
                      :onlyContent.sync="onlyContents"
                      :ratings="food.ratings"
                      >
        </ratingselect>
      </div>

      <div class="rating-wrapper">
        <ul v-show="food.ratings && food.ratings.length">
          <li v-show="needShow(rating.rateType, rating.text)"  v-for="rating in food.ratings" class="rating-item">
            <div class="user">
            <span class="name">{{rating.username}}</span>
            <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
          </div>
           <time class="time">{{rating.rateTime | formatDate}}</time>
            <p class="text">
              <span :class="{'icon-thumb_up':rating.rateType ===0,'icon-thumb_down':rating.rateType ===1}"></span>
              <span class="text">{{rating.text}}</span>
            </p>
          </li>
        </ul>
        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
        </div>
      </div>

    </div>
  </div>
  </transition>
</template>
<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import CARTCONTROL from '../cartcontrol/cartcontrol.vue';
  import RATINGSELECT from '../ratingselect/ratingselect.vue';
  import SPLIT from '../split/split.vue';
  import { formatDate } from '../../common/js/date.js';
  const ALL = 2;
  export default{
    props: {
      food: {
        type: Object
      }
    },
    components: {
      'cartcontrol': CARTCONTROL,
      'split': SPLIT,
      'ratingselect': RATINGSELECT
    },
    data() {
      return {
        showFlag: false,
        selectTypes: ALL,
        onlyContents: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        scroll: null
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectTypes = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      addFirst(event) {
        if (!event._constructed) {
          return false;
        };
        this.$set(this.food, 'count', 1);
        this.$root.eventHub.$emit('cart.add', event.target);
      },
      needShow(type, text) {
        // 只看有内容的介绍 并且 没有内容 就不显示
        if (this.onlyContents && !text) {
          return false;
        }
        // 如果选项卡的类型是all 就显示所有的
        if (this.selectTypes === ALL) {
          return true;
        } else {
          return type === this.selectTypes; // 评论的类型跟选项卡的类型是否相同
        }
      }
    },
    updated() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.food, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    computed: {},
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };

</script>
<style lang='less' scoped>
  @import  "../../common/less/mixin.less";
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
  .image-header {
    position: relative;
    .size(100%, 0);
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      .size(100%; 100%)
    }
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content {
    position: relative;
    padding: 18px;
    .title {
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 29px;
      margin-bottom: 8px;
    }
    .detail {
      margin-bottom: 18px;
      font-size: 10px;
      line-height: 10px;
      color: rgb(147, 153, 159);
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      font-weight: 700;
      line-height: 24px;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159)
      }
    }
  }
  .cartcontrol-wrapper{
    position:absolute ;
    right:12px;
    bottom:12px;
  }
  .buy{
    position:absolute ;
    right:18px;
    bottom:18px;
    z-index:10;
    line-height: 24px;
    height: 24px;
    padding:0 12px;
    box-sizing: border-box;
    font-size: 10px;
    border-radius: 12px;
    color: #ffffff;
    background: rgb(0,160,220);
  }
}
  .info{
    padding: 18px;
    .title{
      line-height: 14px;
      margin-bottom:6px;
      font-size:14px;
      color:rgb(7,17,27);
    }
    .text{
      color:rgb(77,85,93);
      line-height: 24px;
      padding:0 12px;
      font-weight: 200;
      font-size: 12px;
    }
  }
  .rating{
    padding-top:18px;
    .title{
      line-height: 14px;
      margin-left:6px;
      font-size:14px;
      color:rgb(7,17,27);
    }
  }
  .rating-wrapper{
    padding:0 18px;
    .rating-item{
      position:relative;
      padding:16px 0;
      .border-1px(rgba(7,17,27,0.1));
      .user{
        position: absolute;
        right: 0;
        top:16px;
        font-size: 0;
        line-height: 12px;
        .name{
          display: inline-block;
          margin-right: 6px;
          vertical-align: top;
          font-size: 10px;
          color:rgb(147,153,159);
        }
        .avatar{
          border-radius: 50%;
        }
      }
      .time{
        display: inline-block;
        line-height: 12px;
        font-size: 10px;
        color:rgb(147,153,159);
        margin-bottom:6px;
      }
      .text{
        line-height: 16px;
        font-size:12px;
        color:rgb(7,17,27);
      }
      .icon-thumb_up,icon-thumb_down{
        margin-right: 4px;
        line-height: 16px;
        font-size: 12px;
      }
      .icon-thumb_up{
        color:rgb(0,160,220);
      }
      .icon-thumb_down{
        color:rgb(147,153,159);
      }
    }
    .no-rating{
      font-size: 12px;
      padding:16px 0;
      color:rgb(147,153,159);
    }
  }
</style>
