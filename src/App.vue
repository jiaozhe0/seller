<template>
  <div id="app" class="app">
    <!--Header-->
    <my-header :seller="seller"></my-header>
    <!--导航-->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
       <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>

  </div>
</template>

<script>
  import MyHeader from './components/header/header.vue';
  import { urlParse } from './common/js/url';
  const ERR_OK = 0;
  export default {
    name: 'app',
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      Axios.get('/api/seller?id=' + this.seller.id).then((respone) => {
        var resData = respone.data;
        if (resData.errno === ERR_OK) {
//          Object.assign(this.seller, resData.data);
//          this.seller = resData.data;
          let data = resData.data;
          this.seller = Object.assign({}, this.seller, data);
        }
      });
    },
    components: {
      'myHeader': MyHeader
    }
  };
</script>

<style lang='less' scoped>
  @import "./common/less/mixin.less";
  .app{
    .tab{
      display: flex;
      width:100%;
      height: 40px;
      line-height: 40px;
      .border-1px(rgba(7,17,27,.1));
      .tab-item{
        flex: 1;
        text-align: center;
        >a{
          display: block;
          font-size: 14px;
          color:rgb(77,83,93);
        }
        .active{
          color:#f01414;
        }
      }
    }
  }
</style>
