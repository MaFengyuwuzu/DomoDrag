<template>
  <div class="boxwarp" @click="clickselected(attrinfo)">
   <!-- //单元格背景色 1:白色 2:深色 -->
   <span class="isrequired" v-if="attrinfo.isRequired=='1' && $attrs.dataInfo.type=='1'">*</span>

   <span class="prefix"> {{ attrinfo.prefix }}</span>
    <el-date-picker
      :class="[{ 'modulebg': attrinfo.iptBg == '1' }, { 'modulebggray': attrinfo.iptBg == '2' },{'el-readonly':isPreview==false}]"
      v-bind="$attrs" v-on="$listeners" v-model="value"
      type="datetime"
      :placeholder="attrinfo.placeholder">
    </el-date-picker>
    <span class="suffix"> {{ attrinfo.suffix }}</span>
  </div>
</template>

<script>
import occurrence from "@/mixins/occurrence";
export default {
  name: 'assemblyTime',
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
::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner{
width: auto;
}
</style>