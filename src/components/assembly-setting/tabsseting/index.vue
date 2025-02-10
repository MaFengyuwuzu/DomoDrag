<template>
  <div>
    <el-form v-if="modulesData" ref="form" :model="modulesData" label-width="80px" :label-position="'left'" size="small">
      <el-form-item label="标题">
        <el-input v-model="modulesData.title"></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="removeItem(modulesData,tabsIndex,'1',dataInfo)" size="mini">删除标签页</el-button>
      </el-form-item>
   </el-form>
  </div>
</template>

<script>
import theremove from "@/mixins/theremove";;
export default {
  name: 'tabsseting',
  mixins: [theremove],
  inject:["dataInfo"],
  props:{
      modulesData:{
        typeof:Object,
        default:{}
      }
  },
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    onSubmit(){}
  },
};
</script>

<style lang="scss" scoped>

</style>