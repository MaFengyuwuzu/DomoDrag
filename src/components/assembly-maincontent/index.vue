<template>
  <div class="mainbox">
        <assemblyTabs></assemblyTabs>
  </div>
</template>

<script>
import assemblyTabs from '@/components/assembly-tabs'
import templateJson from '@/assets/data.json'
import indexDb from "@/utils/indexDb";
export default {
  name: 'tabsindex',
 components:{
  assemblyTabs
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
</style>