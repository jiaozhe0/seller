<template>
  <div class="icon-wrapper">
    <span class="icon" :class="[classMap[index],iconClass]" :style="styles"></span>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default{
    props: [
      'index',
      'size',
      'styles'
    ],
    components: {},
    data() {
      return {};
    },
    created() {
      this.classMap = ['decrease', 'discount ', 'special', 'invoice', 'guarantee'];
    },
    methods: {},
    computed: {
      iconClass() {
        return 'icon-' + this.size;
      }
    }
  };
</script>
<style lang='less' scoped>
  @import  "../../common/less/mixin.less";
  .icon-wrapper{
    display: inline-block;
  }
  .icon{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    &.icon-12{
      .size(12px;12px);
      background-size: 12px 12px;
    &.decrease{
      .bg-image('icon/decrease_1')
    }
    &.discount{
      .bg-image('icon/discount_1')
    }
    &.guarantee{
      .bg-image('icon/guarantee_1')
    }
    &.invoice{
      .bg-image('icon/invoice_1')
    }
    &.special{
      .bg-image('icon/special_1')
    }
    }
    &.icon-16{
        .size(16px;16px);
         background-size: 16px 16px;
        &.decrease{
          .bg-image('icon/decrease_2')
        }
        &.discount{
          .bg-image('icon/discount_2')
        }
        &.guarantee{
          .bg-image('icon/guarantee_2')
        }
        &.invoice{
          .bg-image('icon/invoice_2')
        }
        &.special{
          .bg-image('icon/special_2')
        }
      }
    &.icon-18{
      .size(18px;18px);
      background-size: 18px 18px;
      &.decrease{
        .bg-image('icon/decrease_3')
      }
      &.discount{
        .bg-image('icon/discount_3')
      }
      &.guarantee{
        .bg-image('icon/guarantee_3')
      }
      &.invoice{
        .bg-image('icon/invoice_3')
      }
      &.special{
        .bg-image('icon/special_3')
      }
    }
    &.icon-24{
      .size(24px;24px);
      background-size: 24px 24px;
      &.decrease{
        .bg-image('icon/decrease_4')
      }
      &.discount{
        .bg-image('icon/discount_4')
      }
      &.guarantee{
        .bg-image('icon/guarantee_4')
      }
      &.invoice{
        .bg-image('icon/invoice_4')
      }
      &.special{
        .bg-image('icon/special_4')
      }
    }
  }
</style>
