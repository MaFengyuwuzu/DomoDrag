<template>
  <div>
    <!-- <assblythead :dataInfo="dataInfo" v-show="dataInfo.thead.show == '1'"></assblythead> -->
    <el-form ref="form" :model="dataInfo" :label-position="'left'"  label-width="60px">
      <!-- <assemblyrows :width="dataInfo.width" gap="0px" :name="'column'"> -->
        <draggable :disabled="isPreview"  class="rowstyle" :style="{'grid-gap': '0','grid-template-columns':`repeat(${dataInfo.width},${setclass(dataInfo.width)}`,'grid-template-rows':`repeat(80,auto`}"  ghostClass="ghost"  tag="div" :list="dataInfo.tbody" :group="{name:'dragGroup',sort: false}" @update="onDragUpdate" :move="checkContainerMove" style="width:100%;overflow: hidden;">
        <assemblycolumn  @click.native="clickcolumn(item,dataInfo,index)" :class="[item.u_id==id && isPreview==false  ? 'checkselegrid' : 'nochecksele']"  :name="'column'" :width="item.width + ''" :tablewidth="dataInfo.width"
          v-for="(item, index) in dataInfo.tbody" :key="index"
          :style="{ 'background-color': item.cellBg == 1 ? '#fff' : '#e9eef3', 'margin': '-1px', 'border': 'dashed 1px #c0c4cc' }">
                <el-form-item   :label="item.type=='1' ? '' :item.label + ':'"  style="width:100%;overflow: hidden;" :required="item.isRequired== 1 ? true : false">        
              <assblybasis :dataInfo="dataInfo" :tabIndex="tabIndex" :attrinfo='item' :tableboxs="tableboxs" :tableIndex="tableIndex"  :moduleIndex="index"></assblybasis>
                         </el-form-item>
        </assemblycolumn>
      </draggable>
      <!-- </assemblyrows> -->
</el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import assblythead from '@/components/assembly-thead'
import assblybasis from '@/components/assembly-basis'
import assemblyrows from '@/components/assembly-rows'
import assemblycolumn from '@/components/assembly-column'
import { createDesigner } from "@/views/root/component/designer"
import {generateId} from "@/utils/util"
import { mapGetters } from "vuex";
import occurrence from "@/mixins/occurrence";
import indexDb from "@/utils/indexDb";
export default {
  name: 'assembly-grid',
  mixins: [occurrence],
  inject: ['alldata'],
  components:{
    assblybasis,
    assemblyrows,
    assemblycolumn,
    assblythead,
    Draggable
  },
  props:{
      dataInfo:{},
      tableboxs:{
      typeof:[String,Array],
      default:""
    },
    tableIndex:{
      typeof:[String,Array],
      default:""
    },
    tabIndex:""
  },
  computed:{
    ...mapGetters([
      "colIndex",
      "boxingIndex",
      "tabsIndex",
      "id",
      "isPreview"
    ])
  },
  data() {
    return {
      designer: createDesigner(this),
    };
  },

  mounted() {
    this.dataInfo.tbody.forEach((item)=>{
       item.u_id = generateId();
     })
  },

  methods: {
    setclass(widths){
      var width = (100 / widths)
          return width + '%'
      },
    checkContainerMove(){
       this.$forceUpdate();
    },

     checkContainerMove(){

    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/module.scss";
::v-deep .el-form-item{
  margin-bottom:0px;
  margin: 0px;
}
.rowstyle{
  display: grid;
}
</style>