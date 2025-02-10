<template>
  <div>
    <el-form v-if="modulesData" ref="form" :model="modulesData" label-width="80px" :label-position="'left'" size="small">
          <!-- // 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 ==8：多输入框 -->
      <el-form-item label="类型">
        {{ getcomLable(modulesData.type) }}
      </el-form-item>
      <el-form-item label="占位宽度" v-if="parentData.type!='2' && modulesData.type!='1'">
        <el-input-number v-model="modulesData.width" :min="1" :max="Number(parentData.width)"></el-input-number>
      </el-form-item>
      <el-form-item label="标题" v-if="modulesData.type!='1'">
        <el-input v-model="modulesData.label"></el-input>
      </el-form-item>
      <el-form-item label="文本内容" v-if="modulesData.type=='1'">
        <el-input v-model="modulesData.label"></el-input>
      </el-form-item>
      <el-form-item label="背景色" v-if="modulesData.type!='1'">
        <el-radio-group v-model="modulesData.iptBg">
          <el-radio :label="'1'">白色</el-radio>
          <el-radio :label="'2'">深色</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否必填" v-if="modulesData.type!='1'">
        <el-radio-group v-model="modulesData.isRequired">
          <el-radio :label="'0'">否</el-radio>
          <el-radio :label="'1'">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="前缀" v-if="modulesData.type!='1'">
        <el-input v-model="modulesData.prefix"></el-input>
      </el-form-item>
      <el-form-item label="后缀" v-if="modulesData.type!='1'">
        <el-input v-model="modulesData.suffix"></el-input>
      </el-form-item>
      <el-form-item label="占位符" v-if="modulesData.type!='1'">
        <el-input v-model="modulesData.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="打印页是否显示" >
        <el-radio-group v-model="modulesData.isPrintShow">
          <el-radio :label="'0'">否</el-radio>
          <el-radio :label="'1'">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider content-position="center" v-if="modulesData.type=='3' ||  modulesData.type=='4' || modulesData.type=='5'">选项设置</el-divider>

      <el-form-item label-width="0px" v-for="(item,index) in modulesData.options" :key="index"  v-show="modulesData.type=='3' ||  modulesData.type=='4' || modulesData.type=='5'">
         <div style="display:flex;align-items: center;padding:0px 10px 0px 5px">
            <el-input v-model="item.label"></el-input>
            <el-input v-model="item.sote"></el-input>
            <i class="el-icon-remove-outline" style="font-size:20px;" @click="deleOptions(index)"></i>
         </div>
      </el-form-item>
      <el-button type="text" @click="addOptions"  v-show="modulesData.type=='3' ||  modulesData.type=='4' || modulesData.type=='5'">增加选项</el-button>
    
      <el-form-item label="选中数量"   v-if="modulesData.type=='5'">
        <el-input v-model="modulesData.limit"></el-input>
      </el-form-item>
      <el-form-item>
                 <el-button type="primary" @click="removeItem(modulesData,colIndex,'4',dataInfo)" size="mini">删除此项</el-button>
      </el-form-item>
   </el-form>
  </div> 
</template>

<script>
import theremove from "@/mixins/theremove";
export default {
  name: 'modules',
  mixins: [theremove],
  inject:["dataInfo"],
  props:{
      modulesData:{
        typeof:Object,
        default:{}
      }
  },
  data() {
    return {
      // 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 ==8：多输入框
      typeList:[
         {
            label:"文本",
            value:'1'
         },
         {
            label:"输入框",
            value:'2'
         },
         {
            label:"选择框",
            value:'3'
         },
         {
            label:"单选框",
            value:'4'
         },
         {
            label:"多选框",
            value:'5'
         },
         {
            label:"文本框",
            value:'6'
         },
         {
            label:"时间选择器",
            value:'7'
         }       
      ]
    };
  },

  mounted() {
    this.modulesData.width= Number(this.modulesData.width);
  },

  methods: {
    addOptions(){
      let obj = {
        label:"",
        sote:""
      }
      this.modulesData.options.push(obj)
    },
    deleOptions(index){
      this.modulesData.options.splice(index,1)
    },
    getcomLable(type){
       if(!type) return;
        let obj = this.typeList.find(item => item.value == type);
        return obj.label
    }
  },
};
</script>

<style lang="scss" scoped>

</style>