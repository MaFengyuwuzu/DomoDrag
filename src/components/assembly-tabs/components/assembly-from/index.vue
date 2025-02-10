<template>
  <div>
    <!-- <assblythead :dataInfo="dataInfo" v-show="dataInfo.thead.show == '1'"></assblythead> -->
    <el-form :inline="dataInfo.inlineForm == '1' ? true : false" style="background-color: #fff;padding: 10px;"
      label-position="'left'" label-width="80px">
      <draggable ghostClass="ghost" tag="div" :list="dataInfo.tbody" :group="{ name: 'dragGroup', sort: false }"
        @update="onDragUpdate" :move="checkContainerMove" style="width:100%;overflow: hidden;" :disabled="isPreview">
        <el-form-item @click.native="clickcolumn(item, dataInfo, index)"
          :class="[item.u_id == id && isPreview==false  ? 'checkselefrom' : 'nochecksele']" style="overflow: hidden;"
          :label="item.type == '1' ? '' : item.label + ':'" v-for="(item, index) in dataInfo.tbody" :key="index"
          :required="item.isRequired == 1 ? true : false">
          <assblybasis :dataInfo="dataInfo" :tabIndex="tabIndex" :attrinfo='item' :tableboxs="tableboxs"
            :tableIndex="tableIndex" :moduleIndex="index"></assblybasis>
        </el-form-item>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import assblythead from '@/components/assembly-thead'
import assblybasis from '@/components/assembly-basis'
import { mapGetters } from "vuex";
import occurrence from "@/mixins/occurrence";
import { generateId } from "@/utils/util"
import indexDb from "@/utils/indexDb";
export default {
  name: 'assembly-from',
  mixins: [occurrence],
  inject: ['alldata'],
  components: {
    assblybasis,
    assblythead,
    Draggable
  },
  computed: {
    ...mapGetters([
      "colIndex",
      "boxingIndex",
      "tabsIndex",
      "id",
      "isPreview"
    ])
  },
  props: {
    dataInfo: {},
    tableboxs: {
      typeof: [String, Array],
      default: ""
    },
    tableIndex: {
      typeof: [String, Array],
      default: ""
    },
    tabIndex: ""
  },
  data() {
    return {

    };
  },

  mounted() {
    this.dataInfo.tbody.forEach((item) => {
      item.u_id = generateId();
    })
  },

  methods: {
    checkContainerMove() {
      this.$forceUpdate();
    },
    checkContainerMove() {

    }
  },
};
</script>

<style lang="scss" scoped>@import "~@/assets/css/module.scss";</style>