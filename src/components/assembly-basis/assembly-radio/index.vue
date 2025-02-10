<template>
  <div @click="clickselected(attrinfo)">
     <!-- //单元格背景色 1:白色 2:深色 -->
     <span class="isrequired" v-if="attrinfo.isRequired=='1' && $attrs.dataInfo.type=='1'">*</span>
     <span class="prefix"> {{ attrinfo.prefix }}</span>
     <el-radio-group v-model="value" :class="{'el-readonly':isPreview==false}">
       <el-radio  v-bind="$attrs"  v-on="$listeners"   v-for="(item,index) in attrinfo.options" :key="index" :label="item.label">{{ item.label }}</el-radio>
    </el-radio-group>
    <span class="suffix"> {{ attrinfo.suffix }}</span>

  </div>
</template>

<script>
import occurrence from "@/mixins/occurrence";
export default {
  name: 'assemblyRadio',
  mixins: [occurrence],
    props:{
      value: {
        type: [String, Number],
        default: ""
      },
      attrinfo:{},
      moduleIndex:''
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
@import "~@/assets/css/module.scss";
</style>