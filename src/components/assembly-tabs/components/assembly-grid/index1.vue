<template>
  <div>
       <div class="boxwarp">
             <div v-for="(item,index) in flexlist" :key="index" :style="setwidth(item,index)" class="boxitem">
                 {{ item.label }}
            </div> 
         </div> 
  </div>
</template>

<script>
export default {
  name: 'WorkspaceJsonIndex',
  data() {
    return {
      flexlist: [  //单元格数组
         {
          width:5,
          label:0
         },
         {
          width:5,
          label:1
         },
         {
          width:3,
          label:1
         },
         {
          width:7,
          label:1
         },
         {
          width:7,
          label:1
         },
         {
          width:3,
          label:1
         },
         {
          width:2,
          label:1
         },
         {
          width:8,
          label:1
         },
         {
          width:9,
          label:1
         },
         {
          width:3,
          label:1
         },
         {
          width:1,
          label:1
         },
         {
          width:1,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         },
         {
          width:10,
          label:1
         }
         
      ]
    }
  },

  mounted() {
    
  },

  methods: {
    setwidth(item,index){
     var width =  (item.width / 11) * 100
     console.log(width + '%')
      return {flex:0 + 0 + width + '%'}
    }
  },
};
</script>

<style lang="scss" scoped>
.boxwarp{
    /* 使用flex布局，设置gap*/
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    .boxitem{
      background: #fff;
    }
}
</style>