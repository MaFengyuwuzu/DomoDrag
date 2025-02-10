const state = {
  name: localStorage.getItem("name") ? localStorage.getItem("name") : "搭配式电子病历", //标题
  container: 1, // 1：左右布局；2：上下布局
  isCollapse: true, // 侧边栏展开收起开关
  isHeader: true, // 头部导航栏展开收起开关
  drawer: sessionStorage.getItem("systempar") && JSON.parse(sessionStorage.getItem("systempar")).drawer ? JSON.parse(sessionStorage.getItem("systempar")).drawer : false, // 右侧抽屉开关
  fastNav: true, // 快速导航栏开关
  defaultActive: sessionStorage.getItem("systempar") && JSON.parse(sessionStorage.getItem("systempar")).defaultActive ? JSON.parse(sessionStorage.getItem("systempar")).defaultActive : "result", // 默认选中导航位置标识
  size: sessionStorage.getItem("systempar") && JSON.parse(sessionStorage.getItem("systempar")).size ? JSON.parse(sessionStorage.getItem("systempar")).size : "small", // 默认尺寸
  closeModel: sessionStorage.getItem("systempar") && JSON.parse(sessionStorage.getItem("systempar")).closeModel ? JSON.parse(sessionStorage.getItem("systempar")).closeModel : false, // 关闭模态框提示
  closeModelWithShadow: sessionStorage.getItem("systempar") && JSON.parse(sessionStorage.getItem("systempar")).closeModelWithShadow ? JSON.parse(sessionStorage.getItem("systempar")).closeModelWithShadow : true, // 点击模态框阴影关闭
  task: [],
  taskShow: true,
  taskArrShow: false,
  istemplate: false, //模板是否选中
  isboxing: false, //组块是否选中
  iscol: true, //是否选中单元格
  istable: false, //表格是否选中
  tabsIndex: '0', //tabs选中的Index
  boxingIndex: "", //组块的Index
  tableIndex: "", //选中表格的index
  colIndex: "", //选中单元格index
  id:"",//选中表单下id,
  tabsItem:{},//选中tabs数据
  blockIng:{}, //组块
  tableThead:{},//表格头
  modulesData:{},//选中表格内数据
  parentData:{},//选中父级
  isPreview:false, //是否预览
  isPrint:false
};

const mutations = {
  SET_NAME(state, payload) { //设置标题
    localStorage.setItem("name", payload);
    state.name = payload;
  },
  SET_DRAWER(state, payload) { //设置抽屉开关
    sessionStorage.setItem("drawer", payload);
    state.drawer = payload;
  },
  SET_SYSTEMPAR(state, payload) { //设置系统参
    let systempar = sessionStorage.getItem("systempar") ? JSON.parse(sessionStorage.getItem("systempar")) : {};
    if (!Object.keys(systempar).length) {
      //从后台获取参数后可删除
      systempar = {
        name: "鹏升科技搭配电子病例", //标题
        container: 2, // 1：左右布局；2：上下布局；
        isCollapse: true, // 侧边栏展开收起开关
        isHeader: true, // 头部导航栏展开收起开关
        fastNav: true, // 快速导航栏开关
        defaultActive: "result", // 默认选中导航位置标识
        size: "small", // 默认尺寸
        closeModel: false, // 关闭模态框提示
        closeModelWithShadow: true // 点击模态框阴影关闭
      };
    }
    Object.keys(systempar).forEach(key => {
      if (payload.hasOwnProperty(key) && !$utils.tool.isEmpty(payload[key])) {
        systempar[key] = payload[key];
        state[key] = payload[key];
      }
    });
    sessionStorage.setItem("systempar", JSON.stringify(systempar));
  },
  SET_TASK(state, payload) {
    state.task = payload;
  },
  SET_TASKSHOW(state, payload) {
    state.taskShow = payload;
  },
  SET_TASKARRSHOW(state, payload) {
    state.taskArrShow = payload;
  },

  LOGINOUT(state) {
    state.name = "鹏升科技搭配电子病例"; //标题
    state.container = 2; // 1：左右布局；2：上下布局
    state.isCollapse = true; // 侧边栏展开收起开关
    state.isHeader = true; // 头部导航栏展开收起开关
    state.drawer = false; // 右侧抽屉开关
    state.fastNav = true; // 快速导航栏开关
    state.defaultActive = "result"; // 默认选中导航位置标识
    state.size = "small"; // 默认尺寸
    state.closeModel = false; // 关闭模态框提示
    state.closeModelWithShadow = true; // 点击模态框阴影关闭
    state.task = [];
    state.taskShow = true;
    state.taskArrShow = false;
  },
  SET_ISTEMPLATE(state, payload) {
    state.istemplate = payload;
  },
  SET_ISBOXING(state, payload) {
    state.isboxing = payload;
  },
  SET_ISCOL(state, payload) {
    state.iscol = payload;
  },
  SET_ISTABLE(state, payload) {
    state.istable = payload;
  },
  SET_TABSINDEX(state, payload) {
    state.tabsIndex = payload;
  },
  SET_COLINDEX(state, payload) {
    state.colIndex = payload;
  },
  SET_ID(state, payload){
    state.id = payload
  },
  SET_TABLEINDEX(state, payload) {
    state.tableIndex = payload;
  },
  SET_BOXINGINDEX(state, payload) {
    state.boxingIndex = payload;
  },
  SET_MODULESDATA(state,payload){
    state.modulesData = payload
  },
  SET_TABLETHEAD(state,payload){
    state.tableThead = payload
  },
  SET_BLOCKING(state,payload){
    state.blockIng = payload
  },
  SET_TABSITEM(state,payload){
    state.tabsItem = payload
  },
  SET_ISPREVIEW(state,payload){
    state.isPreview = payload
  },
  SET_ISPRINT(state,payload){
    state.isPrint = payload
  },
  SET_PARENTDATA(state,payload){
    state.parentData = payload
  },
};

const actions = {
  _set_name({
    commit
  }, val) {
    commit("SET_NAME", val);
  },
  _set_drawer({
    commit
  }, val) {
    commit("SET_DRAWER", val);
  },
  _set_systempar({
    commit
  }, val) {
    commit("SET_SYSTEMPAR", val);
  },
  _add_task({
    commit,
    state
  }, val) {
    let task = state.task;
    task.push(val);
    commit("SET_TASK", task);
  },
  _remove_task({
    commit,
    state
  }, val) {
    let task = state.task;
    task.splice(val);
    commit("SET_TASK", task);
  },
  _set_task({
    commit,
    state
  }, val) {
    let task = state.task;
    state.task.forEach((item, idx) => {
      if (item.id === val.id) {
        task[idx] = val.content;
      }
    });
    commit("SET_TASK", task);
  },
  _set_taskShow({
    commit,
    state
  }, val) {
    commit("SET_TASKSHOW", val !== null ? val : !state.taskShow);
  },
  _set_taskArrShow({
    commit,
    state
  }, val) {
    commit("SET_TASKARRSHOW", val !== null ? val : !state.taskArrShow);
  },
  _loginOut({
    commit
  }) {
    sessionStorage.clear();
    commit("LOGINOUT");
  },

  _set_template({
    commit,
    state
  }, val) {
    commit("SET_ISTEMPLATE", val !== null ? val : val);
  },

  _set_isboxing({
    commit,
    state
  }, val) {
    commit("SET_ISBOXING", val !== null ? val : val);
  },

  _set_iscol({
    commit,
    state
  }, val) {
    commit("SET_ISCOL", val !== null ? val : val);
  },

  
  _set_istable({
    commit,
    state
  }, val) {
    commit("SET_ISTABLE", val !== null ? val : val);
  },
  _set_tabsIndex({
    commit,
    state
  }, val) {
    commit("SET_TABSINDEX", val !== null ? val : val);
  },

  _set_colIndex({
    commit,
    state
  }, val) {
    commit("SET_COLINDEX", val !== null ? val : val);
  },
  _set_id({
    commit,
    state
  }, val) {
    commit("SET_ID", val !== null ? val : val);
  },
  _set_tableIndex({
    commit,
    state
  }, val) {
    commit("SET_TABLEINDEX", val !== null ? val : val);
  },

  _set_boxingIndex({
    commit,
    state
  }, val) {
    commit("SET_BOXINGINDEX", val !== null ? val : val);
  },
  _set_modulesdata({
    commit,
    state
  },val){
    commit("SET_MODULESDATA", val !== null ? val : val);
  },
  _set_tableThead({
    commit,
    state
  },val){
    commit("SET_TABLETHEAD", val !== null ? val : val);
  },

  _set_blockIng({
    commit,
    state
  },val){
    commit("SET_BLOCKING", val !== null ? val : val);
  },
  
  _set_tabsitem({
    commit,
    state
  },val){
    commit("SET_TABSITEM", val !== null ? val : val);
  },
  //是否预览
  _set_isPreview({
    commit,
    state
  },val){
    commit("SET_ISPREVIEW", val !== null ? val : val);
  },
  _set_isprint({
    commit,
    state
  },val){
    commit("SET_ISPRINT", val !== null ? val : val);
  },
  
  _set_parentData({
    commit,
    state
  },val){
    commit("SET_PARENTDATA", val !== null ? val : val);
  },
  _init_app({
    commit,
    state
  }, val) {
    Object.keys(state).forEach(key => {
      if (key === "name") {
        commit("SET_NAME", val[key]);
      } else if (key === "drawer") {
        commit("SET_DRAWER", val[key]);
      } else if (key === "task") {
        commit("SET_TASK", val[key]);
      } else if (key === "taskShow") {
        commit("SET_TASKSHOW", val[key]);
      } else if (key === "taskArrShow") {
        commit("SET_TASKARRSHOW", val[key]);
      } else {
        commit("SET_TASKARRSHOW", val[key]);
      }
    });

  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
