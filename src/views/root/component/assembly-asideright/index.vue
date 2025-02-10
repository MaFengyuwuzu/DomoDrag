<template>
  <!--  noSelect：禁止选中文字-->
  <div class="demo-aside noSelect" style="height: 100%;">
      <el-tabs v-model="activeName">
        <el-tab-pane label="组件设置" name="0" style="height:87vh">
          <el-scrollbar class="scrollbar">
            <moduleSeting></moduleSeting>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import cardAsside from '@/components/assembly-cardaside'
import templateAsside from '@/components/assembly-template'
import moduleSeting from '@/components/assembly-setting'
export default {
  name: "right-aside",
  computed: {
    ...mapGetters([
      "container",
      "globalTheme",
      "name",
      "isCollapse",
      "defaultActive",
      "isHeader",
      
    ]),
  },
  mounted() {
    this.scrollbarHeight =
      this.container === 1 ? "scrollbarHeight-60" : "scrollbarHeight-50";
  },
  watch: {

  },
  components: {
    cardAsside,
    templateAsside,
    moduleSeting
  },
  data() {
    return {
      activeName:'0',
      scrollbarHeight: '',
      templeateList:[{
        label:'模板'
    }],
      moduleList: [
        {
          label: "容器",
          childeren: [
            {
              type: "1", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label:"标签页"
            }
          ]
        },
        {
          label: "基础",
          childeren: [
            {
              type: "1", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label:"文本"
            },
            {
              type: "2", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label:"输入框"
            },
            {
              type: "3", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label:"选择框"
            }
          ]
        }
      ]//组件
    };
  },
  methods: {
    handleClick(){}
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/themeify.scss";

.demo-aside {
  height: 100%;
  width: 260px;
  overflow: hidden;
  // border-right: 1px solid;

  @include themeify {
    background-color: themed("aside-bg-color");
    border-color: themed("aside-bd-color");
  }

  .collapse-style {
    height: 50px;
    line-height: 45px;
    font-size: 24px;
    text-align: right;
    border-bottom: 1px solid;

    @include themeify {
      color: themed("aside-text-color");
      border-color: themed("aside-bd-color");
    }

    i {
      padding: 15px 20px 15px 15px;
      cursor: pointer;
    }

    .el-select {
      width: 145px;
    }
  }

  .scrollbarHeight-0 {
    height: 100%;
  }

  .scrollbarHeight-50 {
    height: calc(100% - 50px);
  }

  .scrollbarHeight-60 {
    height: calc(100% - 60px);
  }

  .el-menu {
    border: none;

    @include themeify {
      background-color: themed("aside-bg-color");
    }

    i {
      @include themeify {
        color: themed("aside-text-color");
      }
    }

    &:not(.el-menu--collapse) {
      width: 260px;
    }

    .el-submenu {
      ul {
        @include themeify {
          background-color: themed("aside-open-color");
        }

        ul {
          @include themeify {
            background-color: themed("aside-open-color2");
          }
        }
      }

      .el-submenu__title {
        @include themeify {
          color: themed("aside-text-color");
        }

        &:hover {
          @include themeify {
            background-color: themed("aside-hover-color");
          }
        }
      }

      .el-submenu__title {
        .front-i {
          padding: 8px;
        }
      }
    }

    .el-menu-item {
      background-color: transparent;

      i {
        padding: 8px;
      }

      @include themeify {
        color: themed("aside-text-color");
      }

      &:hover {
        @include themeify {
          background-color: themed("aside-hover-color");
        }
      }
    }

    .is-active {
      &:not(.el-submenu) {
        @include themeify {
          background-color: themed("aside-active-color");
          color: themed("aside-active-text-color");
        }
      }
    }
  }

  .horizontal-collapse-transition {
    transition: 150ms width ease-in-out, 150ms padding-left ease-in-out,
      150ms padding-right ease-in-out;
  }

  .logo {
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    max-width: 248px;

    @include themeify {
      border-color: themed("aside-bd-color");
    }
  }

  .name-width {
    width: 110px;
    margin-left: 50px;
    white-space: nowrap;
  }

  .name-width1 {
    width: 0;
    white-space: nowrap;
  }

  .search-width {
    width: 204px;
    position: absolute;
    left: 10px;
  }

  .search-width1 {
    width: 0;
  }
}

.scrollbar {
   height: 100%;
   overflow-y: hidden;
}
</style>