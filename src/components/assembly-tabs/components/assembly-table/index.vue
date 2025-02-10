<template>
  <div>
      <!-- <assemblyrows :width="dataInfo.width" gap="0px" :name="'column'"> -->
        <draggable class="rowstyletable" :style="{'grid-gap': '0px','grid-template-columns':`repeat(${dataInfo.width},${setclass(dataInfo.width)}`,'grid-template-rows':`repeat(80,auto`}" v-model="dataInfo.tbody" :group="{ name: 'dragGroup'}" :disabled="isPreview"    @update="onDragUpdate" :move="checkContainerMove">
          <assemblycolumn @click.native="clickcolumn(item,dataInfo,index)" :class="[item.u_id==id && isPreview==false ? 'checksele' : 'nochecksele',{ 'tablebg': dataInfo.bgShow }, { 'noborder': dataInfo.borderShow == '0'&&  item.u_id!=id }, { 'bordertable': dataInfo.borderShow == '1' && item.u_id!=id }, { 'borderlevel': dataInfo.borderShow == '2' && item.u_id!=id }]"  :name="'column'" :width="item.width + ''" :tablewidth="dataInfo.width"   v-for="(item, index) in dataInfo.tbody" :key="index"       
            :style="{ 'background-color': item.cellBg == 1 ? '#fff' : '#e9eef3', 'margin': '-1px', 'border': 'dashed 1px #c0c4cc' }">
            <assblybasis ref="components" :dataInfo="dataInfo" :tabIndex="tabIndex" :attrinfo='item' :tableboxs="tableboxs" :tableIndex="tableIndex" :moduleIndex="index">
            </assblybasis>
          </assemblycolumn>
        </draggable>
      <!-- </assemblyrows> -->
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import assemblyrows from '@/components/assembly-rows'
import assemblycolumn from '@/components/assembly-column'
import assblybasis from '@/components/assembly-basis'
import assblychunking from '@/components/assembly-chunking'
import assblytheads from '@/components/assembly-thead'
import { createDesigner } from "@/views/root/component/designer"
import { mapGetters } from "vuex";
import {generateId} from "@/utils/util"
import occurrence from "@/mixins/occurrence";
export default {
  name: 'tableassmbly',
  inject: ['alldata'],
  mixins: [occurrence],
  components: {
    assemblyrows,
    assemblycolumn,
    assblybasis,
    assblychunking,
    assblytheads,
    Draggable
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
  props: {
    dataInfo: {},
    tableboxs:{
      typeof:[String,Array],
      default:""
    },
    tableIndex:{
      typeof:[String,Array],
      default:""
    },
    tabIndex:"",
  },
  data() {
    return {
      module_uid:'',
      designer: createDesigner(this),
    }
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
    checkContainerMove(evt) {
      return this.designer.checkWidgetMove(evt)
    }
   
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/module.scss";
.rowstyletable{
  display: grid;
}     
    .noborder{
      border: none !important;
    }
    .bordertable {
        border: dashed 1px #c0c4cc !important;
    }
    .borderlevel {
        border-left:none !important;
        border-right:none !important;
        border-top:dashed 1px #c0c4cc !important;
        border-bottom: dashed 1px #c0c4cc !important;
    }
</style>