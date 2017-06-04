<template>
  <div class="seller" ref="sellerWapper">
    <div class="seller-content">
      <div class="overview">
        <!--商家描述-->
        <div class="desc">
          <h1 class="title">{{seller.name}}</h1>
          <star :size="24" :score="seller.score"></star>
          <span class="ratingCount">（{{seller.ratingCount}}）</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
          <div class="collect">
            <span class="icon-favorite" :class="{'collected':favorite}" @click="collect($event)"></span>
            <p class="text">{{favoriteText}}</p>
          </div>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              {{seller.minPrice}}
              <span class="unit">元</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              {{seller.deliveryPrice}}
              <span class="unit">元</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              {{seller.deliveryTime}}
              <span class="unit">分钟</span>
            </div>
          </li>
        </ul>
         <!--分割线-->
        <split></split>
        <!--公告-->
        <div class="bulletin margin">
          <h2 class="title">公告与活动</h2>
          <p class="text">{{seller.bulletin}}</p>
          <ul class="support">
            <li v-for="item in seller.supports" class="text-item">
              <iocn :size="18" :index="item.type"></iocn><span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <!--分割线-->
        <split></split>
        <!--商家实景-->
        <div class="pic">
          <h1 class="title">
            商家实景
          </h1>
          <div class="pic-wrapper" ref="picsWrapper">
          <ul class="pics" ref="picList">
            <li v-for="pic in seller.pics" class="pic-item"><img :src="pic" alt=""></li>
          </ul>
          </div>
        </div>
        <split></split>
        <div class="info margin">
          <h1 class="title">
            商家信息
          </h1>
          <ul>
            <li v-for="info in seller.infos" class="text-item">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import STAR from '../star/star.vue';
  import SPLIT from '../split/split.vue';
  import ICON from '../icon/icon.vue';
  import { saveToLocal, loadFromLocal } from '../../common/js/store';
  export default{
    props: {
      'seller': {
        type: Object
      }
    },
    components: {
      'star': STAR,
      'split': SPLIT,
      'iocn': ICON
    },
    data () {
      return {
        scroll: null,
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    created () {
      console.log(this.seller.id);
    },
    mounted() {
      this._initScroll();
    },
    watch: {
      'seller'() {
        this._initScroll();
      }
    },
    methods: {
      _initScroll() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.sellerWapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
          this._initPicScroll();
        });
      },
      _initPicScroll() {
        if (this.picsScroll) {
          return;
        }
        if (this.seller.pics) {
          const PIC_WIDTH = 120;
          const MARGIN = 6;
          let picLen = this.seller.pics.length;
          this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px';
          this.picsScroll = new BScroll(this.$refs.picsWrapper, {
            scrollX: true
          });
        }
        ;
      },
      collect(event) {
        if (!event._constructed) {
          return false;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    }
  };

</script>
<style lang='less' scoped>
  @import '../../common/less/mixin.less';
  .margin{
   margin: 18px;
  }
  .seller {
    position: absolute;
    top: 174px;
    bottom: 45px;
    left: 0;
    width: 100%;
    overflow: hidden;
    h1.title{
      font-size: 14px;
      color:@textColor;
      line-height: 14px;
    }
    .text-item{
      border-top: 1px solid rgba(2,17,27,0.1);
      padding: 16px;
      font-weight: 200;
      line-height: 16px;
      .text{
        color:rgb(7,17,27)!important;
      }
    }
    .seller-content{
      width: 100%;
      .desc{
        margin: 18px;
        position: relative;
        .border-1px(@bdColor);
        padding-bottom: 18px;
        h1.title{
          margin-bottom: 8px;
        }
        .star{
          display: inline-block;
          margin-right: 8px;
        }
        .ratingCount{
          margin-right: 12px;
        }
        .sellCount, .ratingCount{
          font-size: 10px;
          line-height: 18px;
          color:rgb(77,85,93);
        }
        .collect{
          position: absolute;
          right: 0;
          top:0;
          width: 50px;
          text-align: center;
          .icon-favorite{
            font-size: 24px;
            line-height: 24px;
            margin-bottom: 4px;
            color:rgba(7,17,27,0.4);
            &.collected{
              color: rgb(240,20,20);
            }
          }
          .text{
            font-size: 10px;
            color:rgb(77,85,93);
            line-height: 24px;
          }
        }
      }
      .remark{
        font-size: 0;
        text-align: center;
        margin-bottom: 18px;
        display: flex;
        .block{
          flex: 1;
          display: inline-block;
          font-size: 24px;
          font-weight: 200;
          color:@textColor;
          line-height: 12px;
          border-right: 1px;
          .title{
            font-size: 10px;
            color:rgba(7,17,27,0.4);
            line-height: 12px;
            margin-bottom: 8px;
          }
          .unit{
            font-size: 10px;
          }
        }
      }
      .bulletin{
        margin-bottom: 0px;
        .title{
          margin-bottom: 8px;
        }
        .text{
          font-size: 12px;
          font-weight:200;
          color:rgb(240,20,20);
          line-height: 24px;
          margin-bottom: 16px;
        }

      }
      .pic{
        padding: 18px;
        box-sizing: border-box;
        white-space: nowrap;
        font-size: 0;
          .title{
            margin-bottom: 12px;
          }
        .pic-wrapper{
          width: 100%;
          overflow: hidden;
        }
        li.pic-item{
          display: inline-block;
          .size(120px;90px);
          overflow:hidden;
          margin-right: 6px;
          &:last-child{
            margin-right: 0;
          }
        }
      }
      .info{
        .title{
          margin-bottom: 12px;
        }
      }

    }
  }
</style>
