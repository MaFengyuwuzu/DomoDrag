<template>
  <div class="rowStyle" :style="{'grid-gap': gap,'grid-template-columns':`repeat(${width},${setclass()}`,'grid-template-rows':`repeat(80,auto`}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "selfRows",
    props: {
      gap: {
        type: String,
        required: true,
      },
      width: {
        type: [String,Number],
        required: true
      },
      name: {
        type: [String],
        required: true
      },
    },
    methods:{
      setclass(){
        if(this.name=='table'){
        return '10%'
        }else{
          var width = (100 / this.width)
          return width + '%'
       }
    }
  }
  }
</script>

<style scoped lang="scss">
  .rowStyle {
    display: grid;
    grid-template-rows: repeat(10,'10%');
    // border: dashed 1px #409EFF;
  }
</style>
