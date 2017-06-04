<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">
      <slot></slot>
    </div>
    <div class="line"></div>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default{
    props: [],
    components: {},
    data () {
      return {};
    },
    created () {},
    mounted () {},
    methods: {},
    computed: {}
  };

</script>
<style lang='less' scoped>
.title{
  width: 80%;
  margin:28px auto 24px auto;
  display: flex;
  .line{
    flex:1;
    position: relative;
    top:-6px;
    border-bottom:1px solid rgba(255,255,255,0.2);
  }
  .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
}
</style>
