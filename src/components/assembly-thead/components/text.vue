<template>
  <div>
    <div v-if="attrinfo.labelType==1" class="time">
      {{  $formatDate("YY-MM-DD hh:mm") }}
    </div>
    <div v-if="attrinfo.labelType==2">
          <assemblyInput :attrinfo="attrinfo" :value ='attrinfo.label'></assemblyInput>
    </div>
  </div>
</template>

<script>
import assmblyTime from '@/components/assembly-basis/assembly-time'
import assemblyInput from '@/components/assembly-basis/assembly-input'

export default {
  name: 'asstext',
  components: {
    assmblyTime,
    assemblyInput
  },
  props:{
    attrinfo:{},
    index:'',
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

 .time{
  font-size:14px;
  }
</style>