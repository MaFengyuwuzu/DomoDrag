<!--
 * @Descripttion: 弹窗组件二次封装
 * @Author:
 * @Date: 2022-04-13 09:21:59
-->
<template>
  <div class="assembly-dialog">
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :width="width"
        :top="top"
        :close-on-click-modal="$store.getters.closeModelWithShadow"
        :close-on-press-escape="$store.getters.closeModelWithShadow"
        :before-close="handleBeforeClose"
        :destroy-on-close="destroyOnClose"
        :append-to-body="appendToBody">
      <span slot="title" v-if="$slots.title">
        <slot name="title"></slot>
      </span>
      <slot></slot>
      <span slot="footer">
        <slot name="footer"></slot>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "assembly-dialog",
  props:{
    //弹窗ID，页面内唯一
    id:{
      type: String,
      default:()=>{
        return ''
      }
    },
    //弹窗标题
    dialogTitle:{
      type: String,
      default:()=>{
        return '标题'
      }
    },
    //显隐开关
    dialogVisible:{
      type: Boolean,
      default:()=>{
        return false
      }
    },
    //弹窗宽度【详见elementUI】
    width:{
      type: String,
      default:()=>{
        return '30%'
      }
    },
    //继承elementUI
    top:{
      type: String,
      default:()=>{
        return '15vh'
      }
    },
    //继承elementUI
    // destroy-on-close
    destroyOnClose:{
      type: Boolean,
      default:()=>{
        return false
      }
    },
    //继承elementUI
    appendToBody:{
      type: Boolean,
      default:()=>{
        return false
      }
    }
  },
  methods:{
    handleBeforeClose(){
      if (this.$store.getters.closeModel) {
        this.$confirm('关闭后数据不会保存,确认关闭？')
            .then(_ => {
              this.$emit('before-close', this.id)
            }).catch(_ => {
        });
      } else {
        this.$emit('before-close', this.id)
      }
    }
  }
}
</script>

<style lang="scss">
.assembly-dialog{
}
</style>