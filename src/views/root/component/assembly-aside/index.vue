<template>
  <div class="demo-aside noSelect" style="height: 100%;border-top: solid 1px #eee;">
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" class="TabsW">
        <el-tab-pane label="组件库" name="0"  style="height:87vh">
          <el-scrollbar class="scrollbar">
             <cardAsside :list="moduleList"></cardAsside>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="模板" name="1"  style="height:87vh">
          <el-scrollbar class="scrollbar">
          <templateAsside :list="templeateList" style="height: 100%;"></templateAsside>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import cardAsside from '@/components/assembly-cardaside'
import templateAsside from '@/components/assembly-template'
export default {
  name: "leftaside",
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
    templateAsside
  },
  data() {
    return {
      activeName: '0',
      scrollbarHeight: '',
      templeateList: [{
        label: '模板'
      }],
      moduleList: [
    {
        label: "标签页",
        name: "dragGrouptabs",
        childeren: [
            {
              title: "新增标签页",
              label: "标签页",
              sort: 3,
              tableboxs: [
                    {
                    title: "新增组块",
                    label: "组块",
                    sort: "1",
                    utils: [
                            {
                            type: "2",
                            labelType: "2",
                            btnType: "2",
                            uplaodType: "",
                            label: "",
                            sort: "1",
                            position: "1",
                            deviceList: [
                                    {
                                    id: "0",
                                    label: "测试"
                                    }
                                ]
                            }
                        ],
                    table: [
                            {
                            sort: "",
                            bgShow: "",
                            borderShow: "2",
                            width: "10",
                            type: "1",
                            inlineForm: "",
                            thead: {
                                show: "1",
                                title: "表头",
                                titleShow: "1",
                                bgShow: "1",
                                utils: [
                                        {
                                        type: "2",
                                        labelType: "2",
                                        btnType: "0",
                                        uplaodType: "",
                                        label: "",
                                        sort: "1",
                                        position: "1",
                                        deviceList: [
                                                {
                                                id: "",
                                                label: ""
                                                }
                                            ]
                                        }
                                    ]
                                },
                            tbody: [
                                    {
                                    label: "新增",
                                    width: "5",
                                    prefix: "@",
                                    suffix: "@LA",
                                    iptBg: "#eeeee",
                                    type: "2",
                                    placeholder: "测试1",
                                    options: [
                                            {
                                            label: "",
                                            sort: ""
                                            }
                                        ],
                                    limit: 0,
                                    isRequired: "",
                                    isPrintShow: ""
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: "组块",
        name: "dragGroupcon",
        childeren: [
            {
                    title: "新增组块",
                    label: "组块",
                    sort: "1",
                    utils: [
                    {
                            type: "2",
                            labelType: "2",
                            btnType: "2",
                            uplaodType: "",
                            label: "",
                            sort: "1",
                            position: "1",
                            deviceList: [
                            {
                                    id: "0",
                                    label: "测试"
                            }
                        ]
                    }
                ],
                    table: [
                    {
                            sort: "",
                            bgShow: "",
                            borderShow: "2",
                            width: "10",
                            type: "1",
                            inlineForm: "",
                            thead: {
                                show: "1",
                                title: "表头三",
                                titleShow: "1",
                                bgShow: "1",
                                utils: [
                                {
                                        type: "2",
                                        labelType: "2",
                                        btnType: "0",
                                        uplaodType: "",
                                        label: "",
                                        sort: "1",
                                        position: "1",
                                        deviceList: [
                                        {
                                                id: "",
                                                label: ""
                                        }
                                    ]
                                }
                            ]
                        },
                            tbody: [
                            {
                                    label: "表单32",
                                    width: "5",
                                    prefix: "@",
                                    suffix: "@LA",
                                    iptBg: "#eeeee",
                                    type: "7",
                                    placeholder: "测试1",
                                    options: [
                                    {
                                            label: "",
                                            sort: ""
                                    }
                                ],
                                    limit: 0,
                                    isRequired: "",
                                    isPrintShow: ""
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
          label: "容器",
          name: "dragGroupSpace",
           childeren: [
            {
              sort: "",
              bgShow: "",
              label: "表单",
              type: "2",
              borderShow: "2",
              width: "10",
              inlineForm: "1",
              thead: {
                show: "1",
                title: "表单头",
                titleShow: "1",
                bgShow: "1",
                utils: [
                        {
                    type: "2",
                    labelType: "2",
                    btnType: "0",
                    uplaodType: "",
                    label: "",
                    sort: "1",
                    position: "1",
                    deviceList: [
                                {
                        id: "",
                        label: ""
                                }
                            ]
                        }
                    ]
                },
              tbody: [
                    {
                        label: "新增表单项",
                        width: "10",
                        prefix: "",
                        suffix: "",
                        iptBg: "1",
                        cellBg: "1",
                        type: "2",
                        placeholder: "",
                        options: [
                                    {
                            label: "",
                            sort: ""
                                    }
                                ],
                        limit: 0,
                        isRequired: "",
                        isPrintShow: ""
                    }
                ]
            }
        ]
    },
    {
          label: "容器",
          name: "dragGroupSpace",
            childeren: [
            {
              sort: "",
              bgShow: "",
              type: "3",
              label: "栅格",
              borderShow: "2",
              width: "10",
              inlineForm: "0",
              thead: {
                show: "1",
                title: "栅格头",
                titleShow: "1",
                bgShow: "1",
                utils: [
                        {
                    type: "2",
                    labelType: "2",
                    btnType: "0",
                    uplaodType: "",
                    label: "",
                    sort: "1",
                    position: "1",
                    deviceList: [
                                {
                        id: "",
                        label: ""
                                }
                            ]
                        }
                    ]
                },
              tbody: [
                    {
                  label: "新增栅格项",
                  width: "10",
                  prefix: "",
                  suffix: "",
                  iptBg: "1",
                  cellBg: "1",
                  type: "2",
                  placeholder: "",
                  options: [
                            {
                      label: "",
                      sort: ""
                            }
                        ],
                  limit: 0,
                  isRequired: "",
                  isPrintShow: ""
                    }
                ]
            },
        ]
    },
    {
          label: "容器",
          name: "dragGroupSpace",
            childeren: [
            {
              sort: "",
              bgShow: "",
              label: "表格",
              type: "1",
              borderShow: "2",
              width: "10",
              inlineForm: "0",
              thead: {
                show: "1",
                title: "表格头",
                titleShow: "1",
                bgShow: "1",
                utils: [
                        {
                    type: "2",
                    labelType: "2",
                    btnType: "0",
                    uplaodType: "",
                    label: "",
                    sort: "1",
                    position: "1",
                    deviceList: [
                                {
                        id: "",
                        label: ""
                                }
                            ]
                        }
                    ]
                },
              tbody: [
                    {
                  label: "单元格",
                  width: "10",
                  prefix: "",
                  suffix: "",
                  iptBg: "1",
                  cellBg: "1",
                  type: "2",
                  placeholder: "",
                  options: [
                            {
                      label: "",
                      sort: ""
                            }
                        ],
                  limit: 0,
                  isRequired: "",
                  isPrintShow: ""
                    }
                ]
            },
        ]
    },
    {
          label: "基础",
          name: "dragGroup",
          childeren: [
            {
              type: "2", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label: "输入框",
              width: "5",
              prefix: "",
              suffix: "",
              iptBg: "1",
              placeholder: "",
              options: [
                    {
                  label: "",
                  sort: ""
                    }
                ],
              limit: 0,
              isRequired: "",
              isPrintShow: ""
            },
        ]
    },
    {
          label: "基础",
          name: "dragGroup",
          childeren: [
            {
              type: "3", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label: "选择框",
              width: "5",
              prefix: "",
              suffix: "",
              iptBg: "1",
              placeholder: "",
              options: [
                    {
                  label: "测试1",
                  sort: "0"
                    },
                    {
                  label: "测试2",
                  sort: "1"
                    },
                    {
                  label: "测试3",
                  sort: "2"
                    }
                ],
              limit: 0,
              isRequired: "",
              isPrintShow: ""
            },
        ]
    },
    {
          label: "基础",
          name: "dragGroup",
          childeren: [
            {
              type: "4", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label: "单选框",
              width: "5",
              prefix: "",
              suffix: "",
              iptBg: "1",
              placeholder: "",
              options: [
                    {
                  label: "",
                  sort: ""
                    }
                ],
              limit: 0,
              isRequired: "",
              isPrintShow: ""
            }
        ]
    },
    {
          label: "基础",
          name: "dragGroup",
          childeren: [
            {
              type: "5", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label: "多选框",
              width: "5",
              prefix: "",
              suffix: "",
              iptBg: "1",
              placeholder: "",
              options: [
                    {
                  label: "",
                  sort: ""
                    }
                ],
              limit: 0,
              isRequired: "",
              isPrintShow: ""
            }
        ]
    },
    {
          label: "基础",
          name: "dragGroup",
          childeren: [
            {
              type: "6", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label: "文本框",
              width: "10",
              prefix: "",
              suffix: "",
              iptBg: "1",
              placeholder: "",
              options: [
                    {
                  label: "",
                  sort: ""
                    }
                ],
              limit: 0,
              isRequired: "",
              isPrintShow: ""
            }
        ]
    },
    {
          label: "基础",
          name: "dragGroup",
          childeren: [
            {
              type: "7", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label: "时间日期选择器",
              width: "10",
              prefix: "",
              suffix: "",
              iptBg: "1",
              placeholder: "",
              options: [
                    {
                  label: "",
                  sort: ""
                    }
                ],
              limit: 0,
              isRequired: "",
              isPrintShow: ""
            }
        ]
    },
    {
          label: "基础",
          name: "dragGroup",
          childeren: [
            {
              type: "1", //单元格显示内容 1:文本 2:输入框 3：选择框 4：单选框 5：多选框 6：文本框 7：时间选择器 【8：多输入框】
              label: "静态文本",
              width: "10",
              prefix: "",
              suffix: "",
              iptBg: "1",
              placeholder: "",
              options: [
                    {
                  label: "",
                  sort: ""
                    }
                ],
              limit: 0,
              isRequired: "",
              isPrintShow: ""
            }
        ]
    }
] //组件
   
    };
  },
  methods: {
    handleClick() { },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/themeify.scss";

.demo-aside {
  height: 100%;
  width: 260px;
  overflow: hidden;
  padding:0 10px;
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