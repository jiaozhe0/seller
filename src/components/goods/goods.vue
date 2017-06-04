<template>
  <div class="goods" >
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{on: index == currentIndex}" @click="selectMenu(index,$event)">
          <span class="text">
              <icon  v-show="item.type>0" :index="item.type" :size="18" :styles="{marginRight : '2px',
              width:'12px',height:'12px',backgroundSize:'12px 12px'}"></icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <!--产品图片-->
              <div class="icon">
                <img :src="food.icon" alt="" width="57px" height="57px">
              </div>
              <!--产品内容-->
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">${{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
                </div>
                <!--选择按钮-->
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:cartAdd="drop"></cartcontrol>
                </div>
              </div>

            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcat ref="shopcart" :selectFoods = "selectFoods" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice"></shopcat>

      <food :food = 'selectedFood' ref="food"  v-on:cartAdd="drop"></food>

  </div>
</template>
<script type='text/ecmascript-6'>
  import ICON from '../icon/icon.vue';
  import SHOPCAT from '../shopcat/shopcat.vue';
  import CARTCONTROL from '../cartcontrol/cartcontrol.vue';
  import FOOD from '../food/food.vue';
  import BScroll from 'better-scroll';
  const ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'icon': ICON,
      'shopcat': SHOPCAT,
      'cartcontrol': CARTCONTROL,
      'food': FOOD
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    created () {
      Axios.get('/api/goods').then((respone) => {
        let resData = respone.data;
        if (resData.errno === ERR_OK) {
          this.goods = resData.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount ', 'special', 'invoice', 'guarantee'];
    },
    mounted () {},
    methods: {
      selectMenu(index, event) {
        // pc端点击会触发两次点击事件，因为原生浏览器没有_constructed属性，用它来取消一次点击
        if (!event._constructed) {
          return false;
        }
        let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 3000);
        console.log(index);
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3,
          click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      drop(el) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(el);
        });
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return false;
        };
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    computed: {
      // 控制左侧菜单高亮
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count)foods.push(food);
          });
        });
        return foods;
      }
    }
  };
</script>
<style lang='less' scoped>
  @import  "../../common/less/mixin.less";
.goods{
  position: absolute;
  top:174px;
  width:100%;
  bottom:46px;
  display: flex;
  overflow: hidden;
  .menu-wrapper{
    flex: 0 0 80px;
    width:80px;
    background: #f3f5f7;
    .menu-item{
      padding: 0 12px;
      display: table;
      &.on{
        position: relative;
        z-index: 10;
        font-weight: 700;
        margin-top: -1px;
        background: #fff;
        .text{
          .border-none();
        }
      }
      .size(54px;56px);
      line-height: 14px;
      .text{
        font-size: 12px;
        display: table-cell;
        vertical-align: middle;
        width: 56px;
        .border-1px(rgba(7,17,87,.1));
      }
    }
  }
  .foods-wrapper{
    flex:1;
    .title{
      padding-left:14px;
      height:26px;
      line-height: 26px;
      border-left:2px solid #d9dde1;
      font-size:12px;
      color:rgb(147,153,159);
      background:#f3f5f7;
    }
    .food-item{
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      .border-1px(rgba(7,17,87,.1));
      &:last-child{
        .border-none();
        margin-bottom: 0;
      }
      .icon{
        flex:0 0 57px;
        margin-right: 10px;
      }
      .content{
        flex:1;
        .name{
          font-size: 14px;
          margin:2px 0 8px 0;
          line-height: 14px;
          height: 14px;
          color:rgb(7,17,27)
        }
        .desc,.extra{
          line-height:10px;
          font-size: 10px;
          color:rgb(147,153,159);
        }
        .desc{
          margin-bottom: 8px;
          line-height: 12px;
        }
        .extra{
          line-height: 10px;
          .count{
            margin-right: 12px ;
          }

        }
        .price{
          font-weight:700;
          line-height: 24px;
          .now{
            margin-right:8px;
            font-size:14px;
            color:rgb(240,20,20);
          }
          .old{
            text-decoration: line-through;
            font-size: 10px;
            color:rgb(147,153,159)
          }
        }
        .cartcontrol-wrapper{
          position: absolute;
          right: 0;
          bottom:12px;

        }
      }
    }
  }
}

</style>
