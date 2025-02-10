<template>
  <div style="padding: 0px 10px 30px 10px">
      <modules v-if="JSON.stringify(modulesData)!='{}'" :modulesData="modulesData"></modules>
      <theadsseting  v-if="JSON.stringify(tableThead)!='{}'" :modulesData="tableThead"></theadsseting>
      <chunking v-if="JSON.stringify(blockIng)!='{}'"  :modulesData="blockIng"></chunking>
      <tabsSeting v-if="JSON.stringify(tabsItem)!='{}'" :modulesData="tabsItem"></tabsSeting>
      <el-empty v-if="JSON.stringify(modulesData)=='{}' &&  JSON.stringify(tableThead)=='{}' && JSON.stringify(blockIng)=='{}' && JSON.stringify(tabsItem)=='{}'" description="暂无组件设置"></el-empty>
  </div>
</template>
<script>
import modules from '@/components/assembly-setting/modules'
import tabsSeting from '@/components/assembly-setting/tabsseting'
import theadsseting from '@/components/assembly-setting/theadsseting'
import chunking from '@/components/assembly-setting/chunking'
import { mapGetters } from "vuex";
export default {
  name: 'assseting',
  components:{
    modules,
    theadsseting,
    chunking,
    tabsSeting
  },
  computed:{
    ...mapGetters([
      "isTemplate",
      "isBoxing",
      "isCol",
      "isTable",
      "isTable",
      "tabsIndex",
      "boxingIndex",
      "tableIndex",
      "colIndex",
      "modulesData",
      "blockIng",
      "tableThead",
      "tabsItem"
    ])
  },
  data() {
    return {
      type:""
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>