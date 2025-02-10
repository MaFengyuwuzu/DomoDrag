const getters = {
  // token: state => state.user.token,
  recall:state => state.recall.mbdata,
  name: state => state.app.name,
  container: state => state.app.container,
  isCollapse: state => state.app.isCollapse,
  isHeader: state => state.app.isHeader,
  fastNav:state => state.app.fastNav,
  isTemplate:state => state.app.istemplate,//模板是否选中
  isBoxing:state => state.app.isboxing,//组块是否选中
  isCol:state => state.app.iscol,//是否选中单元格
  isTable:state => state.app.istable,//表格是否选中
  tabsIndex:state => state.app.tabsIndex,//tabs选中的Index
  boxingIndex:state => state.app.boxingIndex, //组块的Index
  tableIndex:state => state.app.tableIndex,//选中表格的index
  colIndex:state => state.app.colIndex,//选中单元格index
  modulesData:state => state.app.modulesData,//选中单元格数据
  id:state => state.app.id,
  tableThead:state => state.app.tableThead,//选中表头数据
  blockIng:state => state.app.blockIng,//选中组块数据
  tabsItem:state => state.app.tabsItem,//选中组块数据
  parentData:state => state.app.parentData,//选中当前元素父级
  isPreview:state => state.app.isPreview, //是否预览
  isPrint:state => state.app.isPrint //是否预览
}
export default getters
  