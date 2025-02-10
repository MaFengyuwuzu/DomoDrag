<template>
  <div>
    <el-form v-if="modulesData" ref="form" :model="modulesData" label-width="90px" size="small" :label-position="'left'" >
      <!-- // 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 ==8：多输入框 -->
      <el-form-item label="标题">
        <el-input v-model="modulesData.title"></el-input>
      </el-form-item>
      <div v-for="(item, index) in modulesData.utils">
        <el-divider content-position="center">扩展内容{{ index + 1 }}</el-divider>
        <el-form-item label="显示类型">
          <el-radio-group v-model="item.type">
            <el-radio :label="'1'">文本</el-radio>
            <el-radio :label="'2'">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本类型" v-show="item.type == '1'">
          <el-radio-group v-model="item.labelType">
            <el-radio :label="'1'">当前时间</el-radio>
            <el-radio :label="'2'">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本内容" v-show="item.labelType == '2' && item.type == '1'">
          <el-input v-model="item.label"></el-input>
        </el-form-item>

        <el-form-item label="文本顺序" v-show="item.type == '1'">
          <el-input v-model="item.sort" @input="sortset($event,index)"></el-input>
        </el-form-item>
        <el-form-item label="按钮类型" v-show="item.type == '2'">
          <el-radio-group v-model="item.btnType">
            <el-radio :label="'1'">上传按钮</el-radio>
            <el-radio :label="'2'">设备对接按钮</el-radio>
            <el-radio :label="'3'">一键正常按钮</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上传类型" v-show="item.btnType == '1' && item.type == '2'">
          <el-checkbox-group v-model="item.uplaodType">
            <el-checkbox :label="'1'">图片</el-checkbox>
            <el-checkbox :label="'2'">视频</el-checkbox>
            <el-checkbox :label="'3'">PDF</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="显示位置">
          <el-radio-group v-model="item.position">
            <el-radio :label="'1'">左侧</el-radio>
            <el-radio :label="'2'">右侧</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="预设设备列表" v-show="item.btnType == '2' && item.type == '2'">
          <el-select multiple placeholder="请选择" v-model="value">
            <el-option v-for="(item1, index) in item.deviceList" :key="item1.id" :label="item1.label" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="text" @click="deleOptions(index)">删除选项</el-button>

      </div>
      <el-form-item label-width="36px">
        <el-button type="primary"  size="mini" @click="addOptions">增加选项</el-button>
        <el-button type="primary"  size="mini" @click="removeItem(modulesData,boxingIndex,'2',dataInfo)">删除组块</el-button>
      </el-form-item>


      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">保存</el-button>
        <el-button size="mini">取消</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import theremove from "@/mixins/theremove";
export default {
  name: 'blockIngItem',
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
      value:""
    };
  },

  mounted() {
    
  },

  methods: {
    addOptions() {
      let obj = {
        type: "1", //显示类型   1：文本 2：按钮
        labelType: "1",//文本类型 1：当前时间 2：自定义
        btnType: "", //按钮类型 1：上传按钮 2：设备对接按钮    3：一键正常按钮
        uplaodType:[], //允许上传类型  1：图片 2：视频 3：pdf   btnType===1生效【多选】
        label: "", //文本内容   type===1&&labelType===1时生效
        sort: "1",//文本显示顺序  type===1生效
        position: "1",//显示位置 1：左侧 2：右侧
        deviceList: [  //预设设备列表  【下拉多选，由后台返回】
          {
            id: "",
            label: ""
          }
        ]
      }
      this.modulesData.utils.push(obj)
    },
    deleOptions(index) {
      this.modulesData.utils.splice(index, 1)
    },
    sortset(e,index){
      this.modulesData.utils.sort((a,b)=>{
        if(!a.sort || !b.sort)return;
        return a.sort-b.sort
      })//升序
    }
  },
};
</script>

<style lang="scss" scoped>

</style>