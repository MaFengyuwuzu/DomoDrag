<template>
  <div style="width: 100%;overflow: hidden;">
    <component  :is="getComputedname()" :attrinfo="attrinfo" v-model="attrinfo.value" :value="attrinfo.value"
      v-bind="$attrs" :moduleIndex="moduleIndex"  :key="moduleIndex"  v-on="$listeners" @input="handleInput" ref="component">
    </component>
  </div>
</template>

<script>
import assemblyInput from '@/components/assembly-basis/assembly-input'
import assemblyCheckbox from '@/components/assembly-basis/assembly-checkbox'
import assemblyTime from '@/components/assembly-basis/assembly-time'
import assemblyInputtext from '@/components/assembly-basis/assembly-inputtext'
import assemblyRadio from '@/components/assembly-basis/assembly-radio'
import assemblySelect from '@/components/assembly-basis/assembly-select'
import assemblyTextarea from '@/components/assembly-basis/assembly-textarea'
import assemblyText from '@/components/assembly-basis/assembly-text'
import { mapGetters } from "vuex";
import {generateId} from "@/utils/util"
export default {
  name: 'basis',
  computed:{
    ...mapGetters([
      "colIndex",
      "boxingIndex",
      "tabsIndex",
      "id"
    ])
  },
  components: {
    assemblyInput,
    assemblyCheckbox,
    assemblyTime,
    assemblyInputtext,
    assemblyRadio,
    assemblySelect,
    // assemblyTextarea,
    assemblyText
  },
  props: {
    attrinfo: {
      type: Object
    },
    tableboxs:{
      typeof:[String,Array],
      default:""
    },
    tableIndex:{
      typeof:[String,Array],
      default:""
    },
    moduleIndex:{
      typeof:[String,Array],
      default:""
    },
    tabIndex:""
  },
  data() {
    return {
      isfocus:'',
      infoObj: {},
      // 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 ==8：多输入框
      staffInfoArr: [
        { label: "静态文本", type: '1', compontentName: "assemblyText" },
        { label: "输入框", type: '2', compontentName: "assemblyInput" },
        { label: "选择框", type: '3', compontentName: "assemblySelect" },
        { label: "单选框", type: '4', compontentName: "assemblyRadio" },
        { label: "多选框", type: '5', compontentName: "assemblyCheckbox" },
        { label: "文本框", type: '6', compontentName: "assemblyInputtext" },
        { label: "时间日期选择器", type: '7', compontentName: "assemblyTime" },
        // { label: "多输入框", type: '8', compontentName: "assemblyTextarea" },
      ],
    };
  },

  mounted() {
   
  },
  methods: {
    getComputedname() {
      var name;
      this.staffInfoArr.forEach(val => {
        if (val.type == this.attrinfo.type) {
          name = val.compontentName
        }
      })
      return name
    },
    handleInput(value) {
      console.log(value)
    },
    // modulefocus(e,data){
    //  this.$nextTick(()=>{
    //     this.$store.dispatch("app/_set_id",data.u_id)
    //     this.$store.dispatch("app/_set_modulesdata", data);
    //     this.$store.dispatch("app/_set_tableThead",{});
    //     this.$emit('getuid', data.u_id);
    //   })
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/module.scss";
</style>