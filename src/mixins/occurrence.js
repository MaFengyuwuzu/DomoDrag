import { mapGetters } from "vuex";
import indexDb from "@/utils/indexDb";
/**
 * 单元格组件
 *
 */
let uploadMixin = {
  computed: {
    ...mapGetters([
       "isPreview",
       "colIndex",
       "boxingIndex"
    ]),
  },
  data() {
    return {
      uploadName: ""
    }
  },
  methods: {
    handleInput(value) {
      this.$nextTick(() => {
        this.$emit("input", value);
      })
    },
    //点击标签
    tabclick(e,item,data) {
      this.tabactive = e;
      this.$store.dispatch("app/_set_blockIng",{});
      this.$store.dispatch("app/_set_modulesdata", {});
      this.$store.dispatch("app/_set_tableThead", {});
      this.$store.dispatch("app/_set_tabsIndex", e);
      this.$store.dispatch("app/_set_tabsitem", item);
      this.$store.dispatch("app/_set_parentData",data)
      this.$store.dispatch("app/_set_id","")
    },

    //点击组块
    chunkingItem(item,data,index){
      this.$store.dispatch("app/_set_modulesdata", {});
      this.$store.dispatch("app/_set_tableThead", {});
      this.$store.dispatch("app/_set_tabsitem", {});
      this.$store.dispatch("app/_set_blockIng",item);
      this.$store.dispatch("app/_set_parentData",data)
      this.$store.dispatch("app/_set_boxingIndex",index)
      this.$store.dispatch("app/_set_id",item.u_id)

  },
    //点击表格
    theadClick(item,data,index){
      this.$store.dispatch("app/_set_blockIng",{});
      this.$store.dispatch("app/_set_tabsitem", {});
      this.$store.dispatch("app/_set_modulesdata", {});
      this.$store.dispatch("app/_set_tableThead", item);
      this.$store.dispatch("app/_set_parentData",data)
      this.$store.dispatch("app/_set_tableIndex",index)
      this.$store.dispatch("app/_set_id",item.u_id)
    },

    //点击单元格
    clickcolumn(data,dataInfo,index){
      this.$nextTick(()=>{
            this.$store.dispatch("app/_set_tableThead",{});
            this.$store.dispatch("app/_set_blockIng",{})
            this.$store.dispatch("app/_set_tabsitem", {});
            this.$store.dispatch("app/_set_id",data.u_id)
            this.$store.dispatch("app/_set_modulesdata", data);
            this.$store.dispatch("app/_set_colIndex",index)
            this.$store.dispatch("app/_set_parentData",dataInfo)
      })
    },
    onDragUpdate(e) { 
      this.$nextTick(()=>{
         let arr = [];
         arr.push(this.alldata.datatabs);
         indexDb.addData(this.$tableDb, "history", arr);
     })
   },
      onDragUpdatea(e){
        this.$nextTick(()=>{
          let arr = [];
          arr.push(this.alldata.datatabs);
          indexDb.addData(this.$tableDb, "history", arr);
      })
    },
    clickselected(){
    
    }
   
  }
}

export default uploadMixin