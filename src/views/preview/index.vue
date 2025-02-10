<template>
  <div class="box">
    <!-- 外层滚动条 -->
    <div class="yl"><span>预览</span><span><i class="el-icon-close" @click="closeView"></i></span></div>
    <el-scrollbar class="scrollbar">
      <div class="previewbox">
        <el-scrollbar class="scrollbar">
          <div class="previewcon">
            <!-- tabs组件 -->
            <assemblyTabs></assemblyTabs>
          </div>
        </el-scrollbar>
      </div>
      <div  class="previewsbtn">
        <el-button plain @click="closeView" size="medium">关闭</el-button>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
 import { mapGetters } from "vuex";
 import assemblyTabs from '@/components/assembly-tabs'
export default {
  name: 'previewdata',
    components:{
      assemblyTabs
  },
  computed: {
    ...mapGetters([
       "isPreview"
    ]),
  },
  provide() {
    return {
      dataInfo: this,
      alldata:this
    }
  },

  data() {
    return {
      datatabs:{}
    };
  },
  created () {
    

  },
  mounted() {
      //设置预览开启 
      this.$store.dispatch("app/_set_isPreview", true);
      //获取浏览数据
      this.datatabs =  JSON.parse(sessionStorage.getItem("previewdata"));
  },

  methods: {
    // 关闭预览
    closeView(){
      window.open("",'_self').close()
    }
  },
};
</script>

 <style lang="scss" scoped>
 .yl {
   text-align: center;
   background: #f1f5fa;
   height:45px;
   line-height: 45px;
   font-size: 14px;
   z-index: 1000;
   .el-icon-close {
      position: absolute;
      right: 30px;
      font-size: 15px;
      line-height: 45px;
   }
}
 .box{
   height: calc(100vh - 20px);
}
 .scrollbar{
   height: 100%;
  //  height: calc(100vh - 1000px);
 }
.previewbox{
    background-color: #f2f6fc;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 15px;
    box-shadow: 0 0 1px 10px #495060;
    height: 800px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 960px;
    .previewcon{
      padding: 5px;
    }
}
.previewsbtn{
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 960px;
  margin-top: 20px;
}
</style>