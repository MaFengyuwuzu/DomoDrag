<template>
  <div  :class="[{ 'modulebg': attrinfo.iptBg == '1' }, { 'modulebggray': attrinfo.iptBg == '2' }]" style="text-align: center;" @click="clickselected(attrinfo)">
     <span class="isrequired" v-if="attrinfo.isRequired=='1' && $attrs.dataInfo.type=='1'">*</span>
      <span class="prefix"  v-bind="$attrs"  v-on="$listeners">{{ attrinfo.prefix }}</span><span class="textcontent"> {{ attrinfo.label }}</span><span class="suffix">{{ attrinfo.suffix }}</span>
  </div>
</template>

<script>
import occurrence from "@/mixins/occurrence";
export default {
  name: 'assemblyText',
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
.textcontent{
 text-align: center;
}
</style>