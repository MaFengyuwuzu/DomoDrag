/**
 * 删除组件
 *
 */
import indexDb from "@/utils/indexDb";
import {
  mapGetters
} from "vuex";
let deleMixin = {
  computed: {
    ...mapGetters([
      "colIndex",
      "parentData",
      "boxingIndex",
      "tableIndex",
      "tabsIndex"
    ]),
  },
  data() {
    return {

    }
  },
  methods: {
    removeItem(data, index, type,dataInfo) {
      this.$confirm('此操作将删除该组件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!type) return;
        if (type == '1') {
          this.removetabs(data, index, this.parentData,dataInfo)
        } else if (type == '2') {
          this.removeboxing(data, index, this.parentData,dataInfo)
        } else if (type == '3') {
          this.removetable(data, index, this.parentData,dataInfo)
        } else if (type == '4') {
          this.removecell(data, index, this.parentData,dataInfo)
        }
      }).catch(() => {
          
      });
     
    },
    removetabs(data, index, parentData,dataInfo) {
      console.log("dataInfo00000000000",dataInfo)
      if(parentData.tabs.length==1){
        this.$message({
          message: '最后一项不可删除',
          type: 'warning'
        });
        return
      }
      this.setIndexdb(dataInfo)
      parentData.tabs.splice(index, 1)
      this.$store.dispatch("app/_set_tabsitem", {});
    },
    removeboxing(data, index, parentData,dataInfo) {
      if(parentData.tableboxs.length==1){
        this.$message({
          message: '最后一项不可删除',
          type: 'warning'
        });
        return
      }
      this.setIndexdb(dataInfo)
      parentData.tableboxs.splice(index, 1)
      this.$store.dispatch("app/_set_blockIng", {});
    },
    removetable(data, index, parentData,dataInfo) {
      if(parentData.table.length==1){
        this.$message({
          message: '最后一项不可删除',
          type: 'warning'
        });
        return
      }
      this.setIndexdb(dataInfo)
      parentData.table.splice(index, 1)
      this.$store.dispatch("app/_set_tableThead", {});
    },
    removecell(data, index, parentData,dataInfo) {
      if(parentData.tbody.length==1){
        this.$message({
          message: '最后一项不可删除',
          type: 'warning'
        });
        return
      }
      this.setIndexdb(dataInfo)
      parentData.tbody.splice(index, 1)
      this.$store.dispatch("app/_set_id", {})
      this.$store.dispatch("app/_set_modulesdata", {});
    },

    setIndexdb(dbdata){
      this.$nextTick(()=>{
        let data = dbdata.datatabs;
        let arr = [];
        arr.push(data);
        indexDb.addData(this.$tableDb, "history", arr);
        this.dataInfo.setdata(this.dataInfo.datatabs)
      })

    
    }


  }
}

export default deleMixin
