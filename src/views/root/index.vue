<template>
  <div class="index" v-if="isreset" >
    <el-scrollbar>
      <el-container class="container" :direction="container === 1 ? 'horizontal' : 'vertical'"
        :style="{ height: container === 1 ? '100%' : 'calc(100% - 60px)' }">
        <el-container :direction="container === 1 ? 'vertical' : 'horizontal'"
          :style="{ height: container === 1 ? '100%' : 'calc(100% - 60px)' }">
          <el-header class="header" v-if="container === 1">
            <v-header></v-header>
          </el-header>
          <el-container>
            <el-aside width="250" class="aside-shadow" v-if="container === 1">
              <v-aside></v-aside>
            </el-aside>
            <!-- :style="{ minWidth: isCollapse ? '900px' : '900px' }" -->
            <el-main class="main">
                <vMain  style="width: 100%;"></vMain>
            </el-main>
            <el-aside width="300" class="aside-shadow" v-if="container === 1">
              <vRside></vRside>
            </el-aside>
          </el-container>
        </el-container>
      </el-container>
      <el-backtop></el-backtop>
    </el-scrollbar>
  </div>
</template>

<script>
import vAside from "./component/assembly-aside";
import vRside from "./component/assembly-asideright";
import vHeader from "./component/assembly-header";
import vMain from "./component/assembly-main";
// import vFastNav from "./component/assembly-fast-nav";
import { mapGetters } from "vuex";
import templateJson from '@/assets/data.json'
import indexDb from "@/utils/indexDb";

export default {
  name: "index",
  computed: {
    ...mapGetters(["fastNav", "container", "isCollapse"])
  },
  // 父组件中返回要传给下级的数据
  provide() {
    return {
      dataInfo: this,
      alldata: this,
      setdata: this.setdata,
      cleardata:this.cleardata
    }
  },
  data() {
    return {
      switchApp: false,
      datatabs: {},
      oldData:{},
      isreset:true
    };
  },
  components: {
    vHeader,
    vAside,
    vMain,
    vRside
  },
  mounted() {
    this.datatabs = templateJson;
    this.oldData =  JSON.stringify(templateJson); 
    this.firstload();
  },
  methods: {
    firstload() {
      this.$nextTick(() => {
        indexDb.clearData(this.$tableDb, "history");
        indexDb.clearData(this.$tableDba, "history");
        let arr = [];
        arr.push(this.datatabs);
        indexDb.addData(this.$tableDb, "history", arr);
      });
    },
   setdata(data) {
      this.datatabs = {};
      this.$nextTick(() => {
        this.$set(this.datatabs,'title',data.title);
        this.$set(this.datatabs,'tabs',data.tabs);
      })
    },
    cleardata(){
      this.isreset = false;
      this.$nextTick(() => {
        this.firstload();
        this.isreset = true;
        this.$set(this.datatabs,'title', JSON.parse(this.oldData).title);
        this.$set(this.datatabs,'tabs',JSON.parse(this.oldData).tabs);
      })
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/css/themeify.scss";

.index {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;

  .container {
    height: 100%;
  }

  .header {
    padding: 0;
    // height: auto !important;
    position: relative;

    // border-bottom: 1px solid;
    @include themeify {
      background-color: themed("header-bg-color");
      color: themed("header-text-color");
      border-color: themed("header-bd-color");
    }
  }

  .aside-shadow {
    height: calc(100vh - 80px); // 设置左侧 aside 高度
    overflow: hidden;
  }

  .main {
    padding: 0px !important;
    overflow: hidden;
    background-color: #f2f6fc;
  }

  .main-card {
    border-radius: 0;
    // overflow: auto;
  }
}
</style>
