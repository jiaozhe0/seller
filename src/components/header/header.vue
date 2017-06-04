<template>
  <div class="header">
    <div class="content-wrapper"  v-if="seller">
      <div class="avatar"><img :src="seller.avatar" alt="" width="64" height="64"></div>
      <div class="content">
        <div class="title"><span class="brand"></span><span class="name">{{seller.name}}</span></div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail()">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <!--<transition  enter-active-class="animated slideInLeft"-->
                 <!--leave-active-class="animated infinite bounce">-->
    <transition name="slide">
        <div class="detail" v-show="detailShow">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48"  :score="seller.score"></star>
              </div>
              <split-line>优惠信息</split-line>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item,index) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[index].type]" ></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <split-line>商家公告</split-line>
              <div class="bulletin center-block">
                <p class="content">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="detailShow = !detailShow">
            <i class="icon-close"></i>
          </div>
        </div>
    </transition>
  </div>
</template>
<script type='text/ecmascript-6'>
  import Star from '../star/star.vue';
  import SplitLine from '../splitLine/index.vue';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'star': Star,
      'splitLine': SplitLine
    },
    data() {
      return {
//        classMap: null
        detailShow: false
      };
    },
    created() {
      console.log(this.seller);
      this.classMap = ['decrease', 'discount ', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      }
    },
    computed: {}
  };

</script>
<style lang='less' scoped>
 @import  "../../common/less/mixin.less";
  .header{
    color:#fff;
    overflow: hidden;
    position: relative;
    background: rgba(7,17,27,.5);
    .content,.avatar{
     display: inline-block;
    }
    .avatar{
      vertical-align: top;
      img{
        border-radius:2px;
      }
    }
    .content{
      margin-left:16px;
      font-size: 14px;
      .title{
        margin:2px 0 8px 0;
        .brand{
          width:30px;
          height:18px;
          display:inline-block;
          background-size:30px 18px;
          .bg-image("header/brand");
          background-repeat: no-repeat;
          vertical-align: top;
        }
        .name{
          font-size: 16px;
          line-height: 18px;
          font-weight:bold;
          margin-left: 6px;
        }
      }
      .description{
        margin-bottom:10px;
        line-height:12px;
        font-size:12px;
      }
    }
    .content-wrapper{
      padding:24px 12px 18px 24px;
      position: relative;
      .support{
        .icon{
          display: inline-block;
          vertical-align: middle;
          width:12px;
          height:12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease{
            .bg-image('header/decrease_1')
          }
          &.discount{
            .bg-image('header/discount_1')
          }
          &.guarantee{
            .bg-image('header/guarantee_1')
          }
          &.invoice{
            .bg-image('header/invoice_1')
          }
          &.special{
            .bg-image('header/special_1')
          }
        }
        .text{
          line-height: 12px;
          font-size: 10px;
        }
      }
      .support-count{
        position: absolute;
        right:12px;
        bottom: 14px;
        padding:0 5px;
        height:24px;
        line-height:28px;
        border-radius: 14px;
        background: rgba(0,0,0,.2);
        text-align: center;
        .count{
          vertical-align: top;
          font-size: 10px;
          .icon-keyboard_arrow_right{
            line-height:28px;
            font-size: 10px;
            margin-left: 2px;
          }
        }
      }
    }
  }
  .bulletin-wrapper{
    height:28px;
    line-height: 28px;
    padding:0 22px 0 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    background: rgba(7,17,27,.2);
    .bulletin-title{
      display: inline-block;
      .size(22px;12px);
      margin-top: 8px;
      background-size: 22px 12px;
      background-repeat: no-repeat;
      .bg-image('header/bulletin');
    }
    .bulletin-text{
      vertical-align: top;
      font-size: 10px;
      margin:0 4px ;
    }
    .icon-keyboard_arrow_right{
      position: absolute;
      font-size: 10px;
      right:12px;
      top:8px;
    }

  }
  .background{
    position: absolute;
    top:0;
    left:0;
    .size(100%;100%);
    z-index: -1;
    filter:blur(10px);

  }
  .detail{
    position: fixed;
    z-index: 100;
    .size(100%;100%);
    background: rgba(7,17,27,.8);
    top:0;
    left:0;
    overflow: auto;
    backdrop-filter:blur(10px);
    .detail-wrapper{
      min-height: 100%;
      width: 100%;
      .detail-main{
        margin-top:64px;
        padding-bottom:64px;
        .name{
          line-height:16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper{
          margin-top: 18px;
          padding:2px 0;
          text-align: center;
        }
      }
    }
    .detail-close{
      position: relative;
      .size(32px;32px);
      margin:-64px auto 0 auto;
      clear:both;
      font-size: 32px;
    }
  }
  .supports{
    width: 80%;
    margin:0 auto;
    .support-item{
      padding:0 12px;
      margin-bottom:12px;
      font-size:0;
      &:last-child{
        margin-bottom: 0;
      }
      .icon{
        display: inline-block;
        .size(16px;16px);
        vertical-align: top;
        margin-right: 6px;
        background-size: 16px 16px;
        &.decrease{
          .bg-image('header/decrease_2')
        }
        &.discount{
          .bg-image('header/discount_2')
        }
        &.guarantee{
          .bg-image('header/guarantee_2')
        }
        &.invoice{
          .bg-image('header/invoice_2')
        }
        &.special{
          .bg-image('header/special_2')
        }

      }
      .text{
        line-height: 16px;
        font-size:12px;
      }
    }
  }
  .bulletin{
   width:80%;
    .content{
      padding: 0 12px;
      line-height: 24px;
      font-size: 12px;
    }
  }
 /*.fade-enter,.fade-leave-active{*/
    /*opacity: 0;*/
  /*}*/
 /*.fade-enter-active,.fade-leave-active{*/
   /*transition:opacity 0.5s;*/
 /*}*/
.slide-enter-active{
  animation:slideInLeft 0.5s ease;
}
 .slide-leave-active{
   animation:slideOutRight 0.5s ease;
 }
</style>
