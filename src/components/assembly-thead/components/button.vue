<template>
  <div class="buttonWarp">
    <div v-if="attrinfo.btnType==1">
      <el-button  size="medium" type="primary" @click="uploadfile">上传</el-button>
    </div>
    <div v-if="attrinfo.btnType==2">
      <el-button  size="medium" type="primary">设备</el-button>
      <el-select v-model="value" multiple placeholder="请选择" style="margin: 0px 10px;" :class="[{'el-readonly':isPreview==false}]">
          <el-option
            v-for="item in attrinfo.deviceList"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
    </div>
    <div v-if="attrinfo.btnType==3">
      <el-button  size="medium" type="primary">一键正常</el-button>
    </div>
    <assemblyDialog  id="dialog" dialogTitle="上传" :dialogVisible="uploadOpen" width="800px"  @before-close="uploadOpen = false" v-if="uploadOpen">
                 <assemblyUpload  v-model="attrinfo.title" :fileTypes="attrinfo.uplaodType" :hasVideo ="attrinfo.uplaodType.includes('2')"></assemblyUpload>
     </assemblyDialog>
  </div>
</template>

<script>
import assemblyUpload from "@/components/assembly-upload";
import assemblyDialog  from "@/components/assembly-dialog";
import { mapGetters } from "vuex";
export default {
  name: 'assbutton',
  computed:{
    ...mapGetters([
      "isPreview"
    ])
  },
  props:{
    attrinfo:{},
    index:''
  },
  components: {
    assemblyUpload,
    assemblyDialog
  },
  data() {
    return {
      value:'',
      uploadOpen:false
    };
  },

  mounted() {
    
  },

  methods: {
    uploadfile(){
      if(this.attrinfo.uplaodType.length==0){
       this.$message.warning('请选择上传类型')
      }else{
        this.uploadOpen = true;
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/module.scss";
</style>