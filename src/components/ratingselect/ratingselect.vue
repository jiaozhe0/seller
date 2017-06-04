<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive " @click='select(2,$event)' :class="{'active':selectType===2}">{{desc.all}} <span>{{ratings.length}}</span></span>
      <span class="block positive"  @click='select(0,$event)' :class="{'active':selectType===0}">{{desc.positive}}<span>{{positives.length}}</span></span>
      <span class="block negative" @click='select(1,$event)'  :class="{'active':selectType===1}">{{desc.negative}}<span>{{nagatives.length}}</span></span>
    </div>
   <div class="switch">
     <span class="icon-check_circle" :class="{'on':onlyContent}" @click="toggleContent($event)"></span>
     <span class="text">只看内容的评价{{onlyContent}}</span>
   </div>

  </div>
</template>
<script type='text/ecmascript-6'>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default{
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      },
      selectType: {
        type: Number,
        default: ALL
      }
    },
    components: {},
    data() {
      return {};
    },
    created() {
      console.log(this.onlyContent);
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
//        this.selectType = type;
        this.$emit('update:selectType', type);
      },
      toggleContent(event) {
        console.log('dddddd');
        if (!event._constructed) {
          return;
        }
        this.$emit('update:onlyContent', !this.onlyContent);
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      nagatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };

</script>
<style lang='less' scoped>
  @import  "../../common/less/mixin.less";
.ratingselect{
  .rating-type{
    padding:18px 0;
    margin:0 18px;
    .border-1px(rgba(7, 17, 27, 0.1));
    .block{
      display: inline-block;
      padding:8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      color:rgb(77,85,93);
      font-size:12px;
      &.active{
        color:#fff;
      }
      &>span{
        font-size: 8px;
      }
      &.positive{
        background:rgba(0, 160, 220, 0.2);
        &.active{
          background: rgb(0,160,220);
        }
      }
      &.negative{
        background: rgba(77,85,93,0.2);
        &.active{
          background: rgb(77,85,93);
        }
      }
    }
  }
  .switch{
    padding:12px 18px;
    line-height:24px;
    border-bottom:1px solid rgba(7,17,27,0.1);
    color:rgb(147,153,159);
    font-size: 0;
    .icon-check_circle{
      font-size: 24px;
      margin-right: 4px;
      display: inline-block;
      &.on{
        color:#00c850;
      }
    }
    .text{
      font-size: 12px;
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
