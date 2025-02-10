<template>
   <div>
      <el-card class="box-card example4Left" v-for="(item, index) in List" :key="index">
         <div>
            <div class="boxtitle">{{ item.label }}</div>
         </div>
      </el-card>
      <div class="btn">
         <el-button type="primary"  @click="add" size="mini">新增模板</el-button>
      </div>
   </div>
</template>

<script>
export default {
   name: 'PskjCasesIndex',
   props: {
      list: {
         type: Array
      }
   },
   data() {
      return {
         List: this.list
      };
   },

   mounted() {

   },

   methods: {
      add() {

      }
   },
};
</script>

<style lang="scss" scoped>
::v-deep .box-card {
   margin: 10px;
   height: 40px;
   cursor: pointer;
   font-size: 14px;
}
::v-deep .box-card div {
   line-height: 0px;
}
.example4Left {
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
   font-size: 16px;
}
.btn{
  display: flex;
  justify-content: center;
}
.boxtitle{
  font-size:14px;
}
</style>