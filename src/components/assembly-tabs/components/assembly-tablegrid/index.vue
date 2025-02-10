<template>
    <div class="maintable">
        <template  v-for="(item, index) in tabItem.tableboxs">
        <draggable :key="index" class="rowStylewarp"   ghostClass="ghost"  tag="div" :list="tabItem.tableboxs" :group="{name: 'dragGroupcon',sort:true}" :disabled="isPreview"   @update="onDragUpdatea" :move="checkContainerMovea">
            <assblychunking :key="index" :dataInfo="item" class="chunking" @chunkingClick="chunkingItem($event,tabItem,index)"
            :class="[item.u_id==id && isPreview==false ? 'checksele' : 'nochecksele']"
            >
                <!-- <assemblyrows gap="0px" :width="10" :name="'table'"> -->
                 <draggable  class="rowStyle" :style="{'grid-gap': 0,'grid-template-columns':`repeat(10,10%`,'grid-template-rows':`repeat(80,auto`}" :disabled="isPreview"   ghostClass="ghost"  tag="div" :list="item.table" :group="{name: 'dragGroupSpace',sort: true}" @update="onDragUpdate" :move="checkContainerMove"  @start="onDragStart($event,index)"  @end="onDragEnd($event,index)">
                    <assemblycolumn class="tablebox" :width="item1.width + ''" :key="index1" :name="'table'" v-for="(item1, index1) in item.table" :tablewidth="'10'"
                        :class="[item1.u_id==id && isPreview==false ? 'checksele' : 'nochecksele',{ 'tablebg': item1.bgShow }, { 'noborder': item1.borderShow == '0' && item1.u_id!=id }, { 'bordertable': item1.borderShow == '1' && item1.u_id!=id}, { 'borderlevel': item1.borderShow == '2' && item1.u_id!=id }]">
                        <!-- 组件类型   1:表格 2：表单 3：栅格  -->
                        <template>
                            <assblytheads :dataInfo="item1" v-show="item1.thead.show == '1'" @theadClick="theadClick($event,item,index1)"></assblytheads>
                        </template>
                        <template v-if="item1.type == '1'">
                                <!-- 单元格背景色 1:白色 2:深色 -->
                            <assblytable :tabIndex="tabIndex" :dataInfo="item1" :tableboxs="index" :tableIndex="index1"></assblytable>
                        </template>
                        <template v-if="item1.type == '2'">
                            <assblyfrom :tabIndex="tabIndex" :dataInfo="item1" :tableboxs="index" :tableIndex="index1"></assblyfrom>
                        </template>
                        <template v-if="item1.type == '3'">
                            <assblygrid :tabIndex="tabIndex" :dataInfo="item1" :tableboxs="index" :tableIndex="index1"></assblygrid>
                        </template>
                    </assemblycolumn>
                </draggable>
                <!-- </assemblyrows> -->
            </assblychunking>
        </draggable>
        </template>

    </div>
</template>

<script>
import Draggable from 'vuedraggable'
import assemblyrows from '@/components/assembly-rows'
import assemblycolumn from '@/components/assembly-column'
import assblytable from '@/components/assembly-tabs/components/assembly-table'
import assblyfrom from '@/components/assembly-tabs/components/assembly-from'
import assblygrid from '@/components/assembly-tabs/components/assembly-grid'
// import assblybasis from '@/components/assembly-basis'
import assblychunking from '@/components/assembly-chunking'
import {createDesigner} from "@/views/root/component/designer"
import assblytheads from '@/components/assembly-thead'
import { mapGetters } from "vuex";
import occurrence from "@/mixins/occurrence";
import {generateId} from "@/utils/util"
export default {
    name: 'maintable',
    mixins: [occurrence],
    inject: ['alldata'],
    components: {
        assemblyrows,
        assemblycolumn,
        assblytable,
        // assblybasis,
        assblychunking,
        assblyfrom,
        assblygrid,
        Draggable,
        assblytheads
    },
    props: {
        dataInfo: {},
        tabIndex:""
    },

    computed:{
    ...mapGetters([
      "isCol",
      "isPreview",
      "id"
    ])
  },
    data() {
        return {
            tabItem: this.dataInfo,
            designer: createDesigner(this)
        }
    },

    mounted() {
     this.tabItem.tableboxs.forEach((item)=>{
          item.u_id = generateId();
          item.table.forEach((item1,k)=>{
            item1.u_id = generateId();     
        })
      })
    },

    methods: {
     checkContainerMove(e){
        console.log('e :>> ', e);
      },
      checkContainerMovea(e){
        console.log('e :>> ', e);
      },
      onDragEnd(evt,index){
      return this.designer.onDragEnd(evt,index)
    },
     onDragStart(evt,index){
        return this.designer.onDragStart(evt,index)
     }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/module.scss";
.rowStylewarp{
  margin-bottom:20px;
  min-height: 200px;
}
.maintable {
    .tablebg {
        background: #000;
    }

    .bordertable {
        border: dashed 1px #c0c4cc;
    }

    .borderlevel {
        border-top: dashed 1px #c0c4cc;
        border-bottom: dashed 1px #c0c4cc;
    }
}

.chunking {
    border: dashed 1px #c0c4cc;
}
.rowStyle {
    display: grid;
    grid-template-rows: repeat(10,'10%');
    // border: dashed 1px #409EFF;
  }
</style>