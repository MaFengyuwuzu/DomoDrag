<template>
   <div>
    <!-- <badGe :title="'输入框'" v-show="isfocus"></badGe> -->
    <div class="boxwarp"  @click="clickselected(attrinfo)">
    <!-- //单元格背景色 1:白色 2:深色 -->
    <span class="isrequired" v-if="attrinfo.isRequired=='1' && $attrs.dataInfo.type=='1'">*</span>
    <span class="prefix"> {{ attrinfo.prefix }}</span>
    <el-input v-bind="$attrs"  :readonly="isPreview==true ? false : true" v-on="$listeners" :value="value" @input="handleInput" :placeholder="attrinfo.placeholder"
      :class="[{ 'modulebg': attrinfo.iptBg == '1' }, { 'modulebggray': attrinfo.iptBg == '2' }]">
      <template v-for="(item, key) in $slots" :slot="key">
        <slot :name="key" />
      </template>
    </el-input>
    <span class="suffix"> {{ attrinfo.suffix }}</span>
  </div>
  </div>
</template>
<script>
// import badGe from '@/components/assembly-basis/assembly-badge'
import occurrence from "@/mixins/occurrence";
export default {
  name: 'assemblyInput',
  inject: ['dataInfo'],
  props: {
    attrinfo: {},
    value: {
      type: [String, Number],
      default: ""
    },
    moduleIndex:''
  },
  components:{
    // badGe
  },
  mixins: [occurrence],
  data() {
    return {
      infoObj: {},
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