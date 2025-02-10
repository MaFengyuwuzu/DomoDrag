<template>
  <div class="tab">
        <el-scrollbar v-if="!isPrint" >
          <ul class="tabsbox" v-if="changesort">
                 <draggable  class="dragbox" v-model="dataInfo.datatabs.tabs" :group="{name: 'dragGrouptabs',sort:true}" :disabled="isPreview" @update="onDragUpdatea">
                      <li  @click="tabclick(index,item,dataInfo.datatabs)" :class="{'active':tabactive==index}" v-for="(item, index) in dataInfo.datatabs.tabs">{{item.title}}</li>
                </draggable>
          </ul>
        </el-scrollbar>
    <assemblyTablegrid v-for="(item, index) in dataInfo.datatabs.tabs" :key="index" v-if="tabactive==index && changesort && !isPrint" :dataInfo="item" :tabIndex="tabactive"></assemblyTablegrid>
    <assemblyTablegrid v-if="isPrint"  v-for="(item, index) in dataInfo.datatabs.tabs" :key="index" :dataInfo="item" :tabIndex="tabactive"></assemblyTablegrid>
  </div>
</template>

<script>
import assemblyGrid from '@/components/assembly-tabs/components/assembly-grid'
import assemblyTablegrid from '@/components/assembly-tabs/components/assembly-tablegrid'
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
import occurrence from "@/mixins/occurrence";
import indexDb from "@/utils/indexDb";
export default {
  name: 'tabssss',
  inject: ['dataInfo'],
  mixins: [occurrence],
  components: {
    assemblyGrid,
    assemblyTablegrid,
    draggable
  },
  computed: {
    dragOptions() {
      return {
        group: 'nested',
        ghostClass: 'ghost',
        animation: 150,
        fallbackOnBody: false,
        swapThreshold: 0.65,
      };
    },
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
      "tabsItem",
      "isPreview",
      "isPrint"
    ])
  },
  data() {
    return {
      tabslist: [],
      tabactive: "0",
      changesort:true
    };
  },
  mounted() {

  },
  methods: {
    onDragUpdatea(evt){
       let newIndex = evt.newIndex;
       let oldIndex = evt.oldIndex;
       this.changesort = false;
       this.$nextTick(() => {
          let arr = [];
          arr.push(this.dataInfo.datatabs);
          indexDb.addData(this.$tableDb, "history", arr);
            let oldItem = this.dataInfo.datatabs.tabs[oldIndex];
            let newItem = this.dataInfo.datatabs.tabs[newIndex];
            this.$set(this.dataInfo.datatabs.tabs,newIndex,newItem)
            this.$set(this.dataInfo.datatabs.tabs,oldIndex,oldItem)
            this.tabclick(newIndex)
            this.$store.dispatch("app/_set_tabsitem", newItem);
            this.changesort = true;
            
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  padding: 0px 10px;
  // border: dashed 1px #c0c4cc;
}
.tabsbox,.dragbox{
  display: flex;
  list-style: none;
  background-color: #fff;
  border-bottom: solid 1px #eee;
  padding: 0px;
  li{
    flex-shrink:0;
     border: solid 1px #eee;
     padding: 12px 21px;
     font-size:14px;
     margin: -1px;
     background-color: #fff;
     cursor: pointer;

  }
}
::v-deep .el-tabs__nav-wrap .is-top {
  background: #fff !important;
  margin-bottom: 0px !important;
}
.active{
 color: #409EFF;
}
</style>