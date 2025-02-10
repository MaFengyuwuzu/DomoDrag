<template>
  <div>
     <!-- 公共头部start -->
     <div class="tabC">
        <div >
           <div class="tabimg">
              <el-tooltip class="item" effect="dark" content="撤销" placement="top-start">
                 <img src="../../assets/images/chexiao.png" alt="" srcset="" @click="revocation">
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="重做" placement="top-start">
                 <img src="../../assets/images/fanchexiao.png" alt="" srcset="" @click="recover">
              </el-tooltip>
              <el-radio-group   v-model="radio" size="small" style="margin-left: 50px;">
               <el-radio-button label="PC">PC</el-radio-button>
               <el-radio-button label="Pad">Pad</el-radio-button>
               <el-radio-button label="H5">H5</el-radio-button>
            </el-radio-group>
           </div>
        </div>
        <div class="flexT">
           <el-button size="mini" type="text" icon="el-icon-delete" @click="deleEmpty">清空</el-button>
           <el-button size="mini" type="text" icon="el-icon-view" @click="viewModel(isPreview)">预览</el-button>
           <el-button size="mini" type="text" icon=" el-icon-document" @click="createJson">生成JSON</el-button>    
           <el-button size="mini" type="text" v-print="print"  icon="el-icon-printer" @click="viewprinter">打印</el-button>
        </div>
     </div>
     <slot></slot>
     <!-- 公共头部end -->
      <assemblyDlalog :dialogTitle="dialogJson.dialogTitle" :dialogVisible="dialogJson.dialogVisible" :width="dialogJson.width" @before-close="beforeclose">
         <vueJson    :showBtns="false"   v-model="datatabs" mode="text" @json-save="onJsonSave" />
      </assemblyDlalog>
  </div>
</template>
 <script>
 import vueJson  from "vue-json-editor";
 import assemblyDlalog from '@/components/assembly-dialog'
 import templateJson from '@/assets/data.json'
 import { mapGetters } from "vuex";
export default {
  name: "Herders",
  components:{
   vueJson,
   assemblyDlalog
 },
 inject: ['dataInfo'],
 computed: {
    ...mapGetters([
       "isPreview"
    ]),
  },
  data() {
     return {
      radio:"PC",
      datatabs:{},
      dialogJson: {
            dialogTitle: "生成JSON",
            dialogVisible: false,
            width: "60%",
      },
      print: {
        id: 'printArea',
        popTitle: '打印', // 打印配置页上方标题
        extraHead: '', //最上方的头部文字，附加在head标签上的额外标签,使用逗号分隔
        preview: '', // 是否启动预览模式，默认是false（开启预览模式，可以先预览后打印）
        previewTitle: '', // 打印预览的标题（开启预览模式后出现）,
        previewPrintBtnLabel: '', // 打印预览的标题的下方按钮文本，点击可进入打印（开启预览模式后出现）
        zIndex: '', // 预览的窗口的z-index，默认是 20002（此值要高一些，这涉及到预览模式是否显示在最上面）   
        previewBeforeOpenCallback() {}, //预览窗口打开之前的callback（开启预览模式调用）
        previewOpenCallback() {}, // 预览窗口打开之后的callback（开启预览模式调用）
        beforeOpenCallback() {}, // 开启打印前的回调事件
        openCallback() {}, // 调用打印之后的回调事件
        closeCallback(vue) {
         vue.$store.dispatch("app/_set_isprint",false)
        }, //关闭打印的回调事件（无法确定点击的是确认还是取消）
        url: '',
        standard: '',
        extraCss: '',
      }
     };
  },
  mounted() {
   this.$nextTick(()=>{
      this.datatabs = this.dataInfo.datatabs;
   })
  },
  methods: {
      revocation(){
        this.$emit("revocation",true)
      },
      recover(){
         this.$emit("recover",true)
      },
      deleEmpty(){
         this.$emit("deleEmpty",true)

      },
      viewModel(flag){
         // let isflag = !flag
         // this.$store.dispatch("app/_set_isPreview", isflag);
         var route = this.$router.resolve({ 
            name: 'preview',
         })
         //主要实现存储参数的功能
         sessionStorage.setItem("previewdata", JSON.stringify(this.dataInfo.datatabs));
         window.open(route.href, '_blank')
         
      },
      createJson(){
         this.dialogJson.dialogVisible = true;
         this.$nextTick(()=>{
               this.datatabs = this.dataInfo.datatabs;
           })
      },
      beforeclose(flag){
         this.dialogJson.dialogVisible = false;
      },
      viewprinter(){
        this.$store.dispatch("app/_set_isprint",true)
        this.$emit("viewprinter",true)
      },
      onJsonSave(value){
         this.$nextTick(()=>{
            console.log('value :>> ', value);
            // this.datatabs = value;
            this.dialogJson.dialogVisible = false;
         })
         
      }
  },
};
</script>
<style scoped lang="scss">
.tabC {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 40px;
  border: solid 1px #eee;
  padding: 0px 20px;
}
.flexT {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.tabimg {
  display: flex;
  align-items: center;
  img {
     width: 15px;
     height: 15px;
     margin-left: 15px;
  }
}
.boxgroup{
  display: flex;
  align-items: center;
}
</style>
