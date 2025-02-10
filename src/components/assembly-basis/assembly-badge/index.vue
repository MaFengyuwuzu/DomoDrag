<template>
  <div class="badge" >
      <i class="el-icon-rank"></i><i style="font-size: 12px;">{{ title }}</i> 
  </div>
</template>

<script>
export default {
  name: 'bagdge',
  props:{
    title:{
      typeof:String,
      default:""
    }
  },
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.badge{
  background-color: #409EFF;
  position: relative;
  left: 0px;
  top: 0px;
  color: #fff;
  width:70px;
}
</style>