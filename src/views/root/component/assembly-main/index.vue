<template>
  <div class="boxmain">
    <mainHeaders @revocation="revocation" @recover="recover" @deleEmpty="deleEmpty" @viewprinter="viewprinter"></mainHeaders>
    <el-scrollbar class="scrollbar">
    <div class="maincontent">
          <mainContents id="printArea"></mainContents>
    </div>
  </el-scrollbar>
  </div>
</template>
<script>
import mainHeaders from '@/components/assembly-header'
import mainContents from '@/components/assembly-maincontent'
import { mapGetters } from "vuex";
import indexDb from "@/utils/indexDb";
export default {
  name: "assmain",
  inject: ['dataInfo'],
  computed: {
    ...mapGetters([
      "container",
      "globalTheme",
      "name",
      "isCollapse",
      "defaultActive",
      "isHeader",
    ]),
  },
  mounted() {

  },
  watch: {

  },
  components: {
    mainHeaders,
    mainContents
  },
  data() {
    return {
      isreload: true
    };
  },
  mounted() {
    console.log("执行了")

  },
  methods: {
    //打印
    viewprinter(){
      console.log("打印")
    },
    //清空
    deleEmpty(){
      this.dataInfo.cleardata();
    },
    //撤销
    async revocation(isflag) {
      let allDbData = [];
      this.getallcxdata();
      try {
        const resa = await indexDb.getAllDatakey(this.$tableDb, "history");
        let delekey = resa[0][resa[0].length - 1];
        if (resa[0].length > 1) {
          indexDb.deleteData(this.$tableDb, "history", delekey);
        }
      } catch { }
      try {
        const res = await indexDb.getAllData(this.$tableDb, "history");
        allDbData = res;
      } catch { }
      let enddata = allDbData[allDbData.length - 1];
      this.dataInfo.setdata(enddata)
    },

    // 撤销的全部数据
    async getallcxdata() {
      let allDbData = [];
      try {
        const res = await indexDb.getAllData(this.$tableDb, "history");
        allDbData = res;
      } catch { }
      if (allDbData.length > 1) {
        let enddata = allDbData[allDbData.length - 1];
        this.publicAddcz(enddata);
      }
    },

    // 撤销的添加
    async publicAdd(item) {
      let allDbData = [];
      let arr = [];
      arr.push(item);
      indexDb.addData(this.$tableDb, "history", arr);
      try {
        const res = await indexDb.getAllData(this.$tableDb, "history");
        allDbData = res;
        let enddata = allDbData[allDbData.length - 1];
        this.dataInfo.setdata(enddata)
      } catch { }
    },



    // 重做的添加
    publicAddcz(item) {
      let arr = [];
      arr.push(item);
      indexDb.addData(this.$tableDba, "history", arr);
    },

    // 重做获取全部数据
    async getallczdata() {
      let allDbData = [];
      try {
        const res = await indexDb.getAllData(this.$tableDba, "history");
        allDbData = res;
      } catch { }
      let enddata = allDbData[allDbData.length - 1];
      if (enddata) {
        this.publicAdd(enddata);
      }
    },
    //重做
    async recover(isflag) {
       let allDbData = [];
      this.getallczdata();
      try {
        const resa = await indexDb.getAllDatakey(this.$tableDba, "history");
        let delekey = resa[0][resa[0].length - 1];
        indexDb.deleteData(this.$tableDba, "history", delekey);
      } catch { }     
    }
  },
};
</script>

<style lang="scss" scoped>
.boxmain {
  width: 100%;
  height: 90vh;
  padding-bottom: 50px;

  .maincontent {
    padding: 10px;
  }
}
.scrollbar {
   height: 100%;
   overflow-y: hidden;
}
</style>