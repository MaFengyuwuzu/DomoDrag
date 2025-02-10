<template>
  <div v-if="dataInfo.thead.titleShow == 1" :class="[{ 'bgthead': dataInfo.thead.bgShow == '1' }]"
    @click="theadClick(dataInfo)">
    <div class="boxfrom">
      <span class="boxfromtext">
        <span>{{ dataInfo.thead.title }}</span>
      </span>
      <span :key="index" class="boxitem" v-for="(item, index) in dataInfo.thead.utils" :style="styleCss(item)">
        <assemblyText v-if="item.type == '1'" :attrinfo="item" :index="index"></assemblyText>
        <assemblybutton v-if="item.type == '2'" :attrinfo="item" :index="index"></assemblybutton>
      </span>
    </div>
  </div>
</template>

<script>
import assemblybutton from './components/button.vue';
import assemblyText from './components/text.vue';
export default {
  name: 'assthead',
  components: {
    assemblybutton,
    assemblyText
  },
  props: {
    dataInfo: {}
  },
  data() {
    return {

    };
  },

  mounted() {
    // console.log(this.dataInfo)
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
    theadClick(data) {
      this.$emit("theadClick", data)
    }
  },
};
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
    margin: 0px 10px;
  }
}</style>