<template>
  <div  class="boxwarp" @click="clickselected(attrinfo)">
    <!-- //单元格背景色 1:白色 2:深色 -->
    <span class="isrequired" v-if="attrinfo.isRequired=='1' && $attrs.dataInfo.type=='1'">*</span>
    <span class="prefix"> {{ attrinfo.prefix }}</span>
    <el-checkbox-group   v-model="value1"   :max="attrinfo.limit" :class="{'el-readonly':isPreview==false}">
      <el-checkbox   v-bind="$attrs"  v-on="$listeners" :label="item.label" v-for="(item, index) in attrinfo.options" :key="index">{{item.label}}</el-checkbox>
    </el-checkbox-group>
    <span class="suffix"> {{ attrinfo.suffix }}</span>
  </div>
</template>

<script>
import occurrence from "@/mixins/occurrence";
export default {
  name: 'assemblyCheckbox',
  mixins: [occurrence],
  props: {
    attrinfo: {},
    value: {
      type: [String, Number],
      default: "",
    },
    moduleIndex:''
  },
  data() {
    return {
      value1:[],
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
el-readonly