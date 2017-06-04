
# sell
## 组件 ##

> 组件是构成应用的基本单位，带有业务逻辑和数据的html

>尤神对组件的分类
```
* 展示型组件：数据进，dom出 ，props接收数据，直接渲染出视图

* 接入型组件：与数据层service打交道,包含一些跟服务器端，数据源打交道，再将数据往下出，传给展示型组件

* 交互型组件：典型例子 对表单组件一种封装和加强，大部分现成的组件库 如element ui, 通常强调复用

* 功能型组件：不渲染内容，作为一种展示、抽象机制存在，如router-view transition

> collocation概念

把该放一起的放一起，除了模版 和 js业务逻辑，还可以把 这个组件自己用到的其他静态资源，
```
> 项目组件
+ 购物车  shopcart/shopcart.vue
 
+ 购买物品小球飞入动画
 
+ 评价star组件 star/star.vue
 
+ 商品添加、删除组件 cartcontrol/cartcontrol
 
+ 优惠图标组件 icon/icon
 
+ 评论的是否满意和内容筛选  ratingselect/ratingselect
 
+ 商品列表页面 goods/goods
 
+ 店铺评价页面 rating/rating
 
+ 商家介绍页面 seller/seller
 
+ 商品详情页面 food/food
 
> 组件之间的通讯



> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
