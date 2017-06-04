<template>

  <div class="rating" ref="ratingsWrapper">
    <div class="ratings-content" >
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="time-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

    <split></split>
    <ratingselect :selectType.sync="selectTypes"
                  :onlyContent.sync="onlyContentes"
                  :ratings="ratings"
    >
    </ratingselect>

    <div class="rating-wrapper">
      <ul >
        <li  v-show="needShow(rating.rateType, rating.text)"  v-for="rating in ratings" class="rating-item">
          <div class="avatar">
            <img  :src="rating.avatar" alt=""  width="28" height="28">
          </div>
          <div class="content">
          <div class="user">
            <span class="name">{{rating.username}}</span>
            <time class="time fr" >{{rating.rateTime | formatDate}}</time>
            <div>
              <star :size="24" :score="rating.score"></star>
              <span class="deliverytime">{{rating.deliveryTime}}分钟送达</span>
            </div>
          </div>
          <p class="text">{{rating.text}}</p>
            <div class="commend">
              <span :class="{'icon-thumb_up':rating.rateType ===0,'icon-thumb_down':rating.rateType ===1}"></span>
              <ul>
                <li v-for="item in rating.recommend" class="category">{{item}}</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div class="no-rating" v-show=" !ratings.length">
      </div>
    </div>
  </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import SPLIT from '../split/split.vue';
  import STAR from '../star/star.vue';
  import RATINGSELECT from '../ratingselect/ratingselect.vue';
  import { formatDate } from '../../common/js/date.js';
  import BScroll from 'better-scroll';

  const ALL = 2;
  const ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'split': SPLIT,
      'ratingselect': RATINGSELECT,
      'star': STAR
    },
    data() {
      return {
        ratings: [],
        selectTypes: ALL,
        onlyContentes: false.valueOf(),
        scroll: null
      };
    },
    created() {
      Axios.get('/api/ratings').then((respone) => {
        let resData = respone.data;
        if (resData.errno === ERR_OK) {
          this.ratings = resData.data;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratingsWrapper, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      });
    },
    methods: {
      needShow(type, text) {
        // 只看有内容的介绍 并且 没有内容 就不显示
        if (this.onlyContentes && !text) {
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
        this.scroll = new BScroll(this.$refs.ratingsWrapper, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };

</script>
<style lang='less' scoped>
.rating{
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview{
    display: flex;
    padding: 18px 0;
    .overview-left{
      flew:0 0 137px;
      width:137px;
      padding: 6px 0;
      border-right:1px solid rgba(7,17,27,0.2);
      text-align: center;
      @media only screen and (max-width:320px){
        flew:0 0 120px;
        width: 120px;
      }
      .score{
        font-size: 24px;
        color:rgb(255,153,0);
        line-height: 28px;
        margin-bottom: 6px;
      }
      .title{
        font-size: 12px;
        color:rgb(7,17,27);
        line-height: 12px;
        margin-bottom: 8px;
      }
      .rank{
        font-size: 10px;
        color:rgb(147,153,159);
        line-height: 10px;
      }
    }
    .overview-right{
      flex:1;
      padding:6px 0 6px 24px;
      @media only screen and (max-width:320px){
        padding-left: 6px;
      }
      .score-wrapper{
        margin-bottom:8px;
        line-height:18px;
        font-size:0;
        .title{
          font-size:12px;
          color:rgb(7,17,27);
        }
        .star{
          display: inline-block;
          margin:0 12px;
          vertical-align: top;
        }
        .score{
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
          color:rgb(255,153,0)
        }
      }
      .time-wrapper{
        .title{
          font-size:12px;
          color:rgb(7,17,27);
        }
        .time{
          font-size:12px;
          color:rgb(147,153,159);
          line-height:18px;
          margin: 0 12px;
          }
      }
    }
  }
  .rating-wrapper{
    .rating-item{
      display: flex;
      padding: 18px;
      .avatar{
        flex: 0 0 28px;
        width:28px;
        margin-right: 12px;
        img{
          border-radius: 50%;
        }
      }
      .name{
        font-size: 10px;
        color:rgb(7,17,27);
        line-height: 12px;
        margin-bottom: 4px;
      }
      .time{
        font-size: 10px;
        font-weight: 200;
        color:rgb(147,153,159);
        line-height:24px;
      }
      .star{
        display: inline-block;
        margin:0 6px 6px 0;
      }
      .deliverytime{
        font-size: 10px;
        font-weight: 200;
        color:rgb(147,153,159);
        line-height: 12px;
      }
      .text{
        font-size: 12px;
        color:rgb(7,17,27);
        line-height:18px;
        margin-bottom: 8px;
      }
      .category{
        display: inline-block;
        padding: 2px 6px;
        margin-right: 8px;
        border: 1px solid rgba(7,17,27,0.1);
        font-size: 9px;
        color: rgb(147,153,159);
        line-height: 16px;
        border-radius: 2px;
        white-space: nowrap;
        overflow: hidden;

      }
    }
  }
}
</style>
