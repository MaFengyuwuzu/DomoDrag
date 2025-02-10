<template>
  <div>
         <div @click="boxclick(dataInfo)">
            <div class="boxfrom">
              <span class="boxfromtext">
                <span>{{ dataInfo.title }}</span>
              </span>
              <span :key="index" class="boxitem" v-for="(item, index) in dataInfo.utils" :style="styleCss(item)">
                <assemblyText v-if="item.type == '1'" :attrinfo="item" :index="index"></assemblyText>
                <assemblybutton v-if="item.type == '2'" :attrinfo="item" :index="index"></assemblybutton>
              </span>
            </div>
          </div>
       <slot></slot>
  </div>
</template>

<script>
import assemblybutton from '../assembly-thead/components/button.vue';
import assemblyText from '../assembly-thead/components/text.vue';
export default {
  name: 'chunking',
  components: {
    assemblybutton,
    assemblyText
  },
  props:{
    dataInfo:{}
  },
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    styleCss(item) {
      // 'position':"1" ,//显示位置 1：左侧 2：右侧
      if (item.position == '1') {
        return { 'float': 'left', 'line-height': '50px' }
      } else {
        return { 'float': 'right', 'line-height': '50px' }
      }
    
  },
  boxclick(data){
         this.$emit('chunkingClick', data);
      }
}
}
</script>

<style lang="scss" scoped>
.bgthead {
  background: #eee;
}

.boxfrom::after {
  content: ''; //加空白内容
  display: block; //块级元素
  clear: both; //清除浮动
}

.boxfrom {
  .boxfromtext {
    height: 50px;
    line-height: 50px;
    display: inline-block;
    font-size:14px;
    float: left;
    margin: 0px 30px 0px 10px;
  }

  .boxcon {
    margin: 10px;
  }

  .boxitem {
    display: inline-block;
  }
}
</style>