<template>
  <div  class="boxwarp"  @click="clickselected(attrinfo)">
    <!-- //单元格背景色 1:白色 2:深色 -->
    <span class="isrequired" v-if="attrinfo.isRequired=='1' && $attrs.dataInfo.type=='1'">*</span>
    <span class="prefix"> {{ attrinfo.prefix }}</span>
         <el-select  v-bind="$attrs"  v-on="$listeners"   v-model="value" :placeholder="attrinfo.placeholder"  style="width: 100%;" :class="[{ 'modulebg': attrinfo.iptBg == '1' }, { 'modulebggray': attrinfo.iptBg == '2' },{'el-readonly':isPreview==false}]">
          <el-option
            v-for="(item,index) in attrinfo.options"
            :key="index"
            :label="item.label"
            :value="item.sort">
          </el-option>
        </el-select>
      <span class="suffix"> {{ attrinfo.suffix }}</span>
  </div>
</template>

<script>

import occurrence from "@/mixins/occurrence";
export default {
  name: 'assemblySelect',
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