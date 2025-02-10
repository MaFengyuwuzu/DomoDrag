<template>
  <!-- grid-area: 1 / 1 / 5 / 5 -->
  <!-- :style="{'grid-column-end': 'span ' + proportion ,'grid-row-end' : 'span ' + rowcol}" -->
  <div  :style="setclass()" class="bgcolor"> 
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "selfColumns",
    props: {
      width: {
        type: [String,Number],
        required: true
      },
      name: {
        type: String,
        required: true
      },
      tablewidth:{
        type: [String,Number],
        required: true
      }
    },
    methods:{
      setclass(){
          if(this.name=='table'){
            return {'grid-column-end': 'span ' + this.width}
          }else{
            if(Number(this.width) >= Number(this.tablewidth)){
              return {'grid-column-end': 'span ' + this.tablewidth,'display': 'grid','place-items': 'center'}
            }else {
              return {'grid-column-end': 'span ' + this.width,'display': 'grid','place-items': 'center'}

            }
           
          }
      } 
    }
  }
</script>

<style scoped>
.bgcolor{
  /* background-color: #fff; */
  /* border: dashed 1px #c0c4cc; */
  padding:5px;
  /* margin: 5px; */
}
</style>
