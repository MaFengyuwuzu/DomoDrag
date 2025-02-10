<template>
   <div>
      <div style="font-size:14px;margin-left:12px;">组件</div>
      <div style="display:flex;flex-wrap:wrap;padding-bottom:30px;">
         <div v-for="(item, k) in asideList" :key="k" style="width:50%;">
            <div  class="components-list">                       
                  <draggable tag="div" :list="item.childeren" :group="{name:item.name, pull: 'clone', put: false}"
                     :clone="handleContainerWidgetClone"  :sort="false"
                     :move="checkContainerMove" @end="onContainerDragEnd" class="draggable-from" ghostClass="ghost">
                  <div v-for="(val, i) in item.childeren" :key="i" class="form-edit-widget-label"
                     :class="{ activehover: i == contentIndex && k == warpIndex, noactivehover: i != contentIndex && k != warpIndex }"
                     @mouseenter="changeborder(k, i)" @mouseleave="clearcolor">
                     <el-tooltip class="item" effect="dark" :content="val.label" placement="top-start">
                        <span>{{ val.label }}</span>
                     </el-tooltip>
                  </div>                  
               </draggable>  
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Draggable from 'vuedraggable'
import {createDesigner} from "@/views/root/component/designer"
import indexDb from "@/utils/indexDb";
export default {
   name: 'PskjCasesIndex',
   props: {
      list: {
         type: Array
      }
   },
   inject: ['dataInfo'],
   components:{
      Draggable
   },
   data() {
      return {
         designer: createDesigner(this),
         warpIndex: -1,
         contentIndex: -1,
         asideList: this.list
      };
   },
   computed: {
      activeNames() {
         return this.asideList.map((i) => {
            return i.label;
         });
      },
   },
   mounted() {
   //   console.log("this.dataInfo1111111111",this.dataInfo)
   },

   methods: {
      //当前选中更改颜色
      changeborder(k, i) {
         this.warpIndex = k;
         this.contentIndex = i;
      },
      // 清除当前选中更改颜色
      clearcolor() {
         this.warpIndex = -1;
         this.contentIndex = -1;
      },
      handleFieldWidgetClone(origin) {
        return this.designer.copyNewFieldWidget(origin)
      },
      checkContainerMove(evt) {
        return this.designer.checkWidgetMove(evt)
      },

      checkFieldMove(evt) {
        return this.designer.checkFieldMove(evt)
      },

      handleContainerWidgetClone(origin) {
        return this.designer.copyNewContainerWidget(origin)
      },
      onContainerDragEnd(evt) {
         console.log(this.dataInfo.datatabs)
           this.$nextTick(()=>{
               let data = this.dataInfo.datatabs;
               let arr = [];
               arr.push(data);
               indexDb.addData(this.$tableDb, "history", arr);
           })
       
      }
   },
};
</script>

<style lang="scss" scoped>
.box {
   margin-bottom: 30px;
}
/* 解决最后一排分开排列 */
.components-list .draggable-from:after {
    content: "";
    width: 80%;//和上面的宽度时间
}

.label {
   font-size: 15px;
}

.components-list {
   width: 100%;
   height: 100%;
   margin: auto;
   margin-top: 10px;

   .widget-cate {
      padding: 8px 12px;
      text-align: left;
      font-size: 15px;
      margin-top: 30px;
   }
  .draggable-from{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
   }
   ul {
      padding: 0;
      margin: 0;
      padding: 0px 10px;
   }
   list-style: none;
}

.components-list .form-edit-widget-label {
   font-size: 13px;
   display: block;
   width: 80%;
   line-height: 30px;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   margin: 1%;
   color: #333;
   border: 1px solid #f4f6fc;
   background-color: #f4f6fc;
   cursor: pointer;
   text-align: center;
   list-style: none;
}
.components-list li{
  list-style: none;
}

.activehover {
   border: dashed 1px #028ade !important;
   cursor:move !important;
}
.noactivehover {
   border-color: none;
}</style>