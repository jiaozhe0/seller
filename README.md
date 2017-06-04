
# sell

技术栈 ：vue2 + less + node + axiso 

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
 
+ 评价star组件 star/star.vue
 
+ 商品添加、删除组件 cartcontrol/cartcontrol
 
+ 优惠图标组件 icon/icon
 
+ 评论的是否满意和内容筛选  ratingselect/ratingselect
 
+ 商品列表页面 goods/goods
 
+ 店铺评价页面 rating/rating
 
+ 商家介绍页面 seller/seller
 
+ 商品详情页面 food/food
 
> 组件之间的通讯
```
props : 父组件向子组件 传送数据

自定事件 ：子组件向父组件传递数据  
>使用 $on(eventName,fn) 监听事件(注意：回调函数名后面是不加（）和参数) 
>使用 $emit(eventName，argument) 触发事件 

.sync修饰符：2.23新加的语法糖 ，会被扩展为一个自动更新父组件属性的 v-on 侦听器
语法：:for.sync='bar'
      thia.$emit('update:for',newval)
    
ref:用ref给子组件添加一个索引id，父组件直接接访问子组件，也可以使用ref给html标签加索引，获取dom元素
    组件里调用：this.$refs.索引id，

非父子间通讯：可以使用一个空的 Vue 实例作为中央事件总线，在 商品添加、删除组件 cartcontrol/cartcontrol 里有用到
简单的用法介绍：https://segmentfault.com/a/1190000008018314 

mixins:
```
>计算属性
```
该项目用到的频率比较高，他的使用场景是响应数据变动的频率比较高，依托他的计算缓存

```


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
