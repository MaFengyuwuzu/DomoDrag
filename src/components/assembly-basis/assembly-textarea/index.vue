<template>
  <div  class="boxwarp" @click="clickselected(attrinfo)">
        <!-- //单元格背景色 1:白色 2:深色 -->
        <span class="isrequired" v-if="attrinfo.isRequired=='1' && $attrs.dataInfo.type=='1'">*</span>
        <span class="prefix"> {{ attrinfo.prefix }}</span>
          <el-input :readonly="isPreview==true ? false : true" class="textareaipt"  :placeholder="attrinfo.placeholder" :class="[{ 'modulebg': attrinfo.iptBg == '1' }, { 'modulebggray': attrinfo.iptBg == '2' }]" v-bind="$attrs" v-on="$listeners" :value="value" @input="handleInput"   type="textarea"></el-input>
        <span class="suffix"> {{ attrinfo.suffix }}</span>
  </div>
</template>

<script>
import occurrence from "@/mixins/occurrence";
export default {
  name: 'assemblyTextarea',
  mixins: [occurrence],
  props:{
    attrinfo:{},
    value: {
      type: [String, Number],
      default: ""
    },
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
::v-deep .textareaipt .el-textarea__inner{
  height: 40px;
}
</style>