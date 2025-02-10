<!--
 * @Descripttion: 上传组件
 * @Tips: 使用时可引入mixins/uploadMixin
 * @Author:
 * @Date: 2022-04-13 09:21:59
-->
<template>
  <div class="upload-file">
    <el-upload ref="upload" :class="{ mini: isMini,'btn-uplaod':isBtnUplaod }" style="width: 100%" drag
               :action="uploadurl"
               :multiple="multiple" :file-list="uploadFileList" :before-upload="handleBeforeUpload"
               :on-preview="handlePreview"
               :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" list-type="picture"
               :show-file-list="false" :limit="10" :on-exceed="exceedLimit"
               :disabled="!isEdit"
    >
      <div v-show="!fileList.length && isEdit">
        <template v-if="!isBtnUplaod">
          <i class="el-icon-upload"></i>
          <template v-if="!isMini">
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
              <div v-for="item in fileList" :key="item.name">{{ item.url }}</div>
            </div>
            <div class="el-upload__tip" slot="tip">
              <div>
                只能上传{{ fileType.toString() }}文件
              </div>
              <div>
                {{ this.hasVideo ? '图片不超过10M，视频不超过100M' : '且不超过10M' }}
              </div>
            </div>
          </template>
        </template>
      </div>
      <el-scrollbar style="height: 100%" v-show="fileList.length" :view-style="viewStyle">
        <div v-for="item in fileList" :key="item.url"
             :style="{ width: multiple ? '160px' : '100%', position: 'relative' }" @mousemove="handlemove($event)"
             @mouseout="handleout($event)">
          <el-image v-if="item.type == 'jpg' || item.type == 'png' || item.type == 'mp4'" style="width: 100%"
                    :src="$utils.tool.getThumbnails(item.url)" fit="cover"
                    @click.stop="() => {!isEdit && imgClick(item)}"
          ></el-image>
          <el-image v-else style="width: 100%"
                    :src="pdfImg"
                    fit="cover"
                    @click.stop="() => {!isEdit && imgClick(item)}"
          ></el-image>
          <div class="mask-box" style="opacity: 0"
               v-if="(item.type == 'jpg' || item.type == 'png' || item.type == 'mp4'  || item.type == 'pdf') && isEdit ">
            <i class="el-icon-zoom-in" @click.stop="imgClick(item)"></i>
            <i class="el-icon-delete" @click.stop="imgDel(item.url)"></i>
          </div>
        </div>
      </el-scrollbar>
      <template v-if="isBtnUplaod && isEdit">
        <el-button type="primary" :size="$store.getters.size" plain>上传文件</el-button>
      </template>
    </el-upload>
    <template v-if="isMini && !isBtnUplaod && isEdit">
      <div class="upload-tips-box">
        <div class="el-upload__text">将文件拖到上传框内，或点击上传</div>
        <div class="el-upload__tip" slot="tip">
          <div>只能上传{{ fileType.toString() }}文件</div>
          <div>{{ this.hasVideo ? '图片不超过10M，视频不超过100M' : '且不超过10M' }}</div>
        </div>
      </div>
    </template>
    <!-- <assembly-dialog id="upload" dialogTitle="裁剪图片" :dialogVisible="dialogVisible" width="550px" append-to-body
                     destroy-on-close @before-close="dialogVisible = false">
      <assembly-vue-cropper ref="assembly-vue-cropper" @getCropBlob="getCropBlob" :fixed="fixed"
                            :img="img"></assembly-vue-cropper>
      <span slot="footer" class="dialog-footer">
            <el-button :size="$store.getters.size" @click="clearForm('upload')">重 置</el-button>
            <el-button :size="$store.getters.size" type="primary" @click="saveSubmit('upload')">确 定</el-button>
         </span>
    </assembly-dialog> -->
    <div>
      <el-image-viewer v-if="showViewer" :z-index="9999" :on-close="closeViewer" :url-list="imgViewer"/>
    </div>
  </div>
</template>

<script>
// import {upload} from "@/api/http-server";
// import AssemblyDialog from "@/components/assembly-dialog";
// import AssemblyVueCropper from "@/components/assembly-vue-cropper";
// import AssemblyVideo from "@/components/assembly-video";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import {mapGetters} from "vuex";

export default {
  name: "upload-file",
  components: {
    // AssemblyVueCropper,
    // AssemblyDialog,
    // AssemblyVideo,
    ElImageViewer
  },
  props: {

    //按钮类型
    isBtnUplaod: {
      type: Boolean,
      default: false
    },
    //小型上传组件
    isMini: {
      type: Boolean,
      default: false
    },
    //是否可多选
    multiple: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    //是否是视频
    hasVideo: {
      type: Boolean,
      default: () => {
        return false;
      }
    },

    fileTypes: {
       type: Array,
       default: () => {
          return [];
       }
    },
    // fileSize: {
    //    type: Number,
    //    default: () => {
    //       return 20;
    //    }
    // },
    //固定比例
    fixed: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    //多选下不可使用
    cropper: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    //图片地址
    value: {
      type: [Array, String],
      required: true,
      default: () => {
        return "";
      }
    },
    //能否编辑
    isEdit: {
      type: Boolean,
      default: true
    }

  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          let getFileName = (val) => {
            let idx = this.fileList.findIndex(item => {
              return item.url === val;
            });
            if (idx === -1) {
              let fileList = this.fileList;
              let fileInfo = this.$utils.tool.getFileInfo(val);
              if (fileInfo) {
                fileList.push({
                  name: fileInfo.name,
                  type: fileInfo.type,
                  url: val
                });
                this.$nextTick(() => {
                  this.$set(this.$data, "fileList", fileList);
                });
              }
            }
          };
          if (typeof val === "string") {
            getFileName(val);
          } else {
            val.forEach(item => {
              getFileName(item);
            });
          }


        } else {
          this.$nextTick(() => {
            this.$set(this.$data, "fileList", []);
          });
        }
      },
      immediate: true,
      deep: true
    }

  },
  computed: {
    uploadurl() {
      return process.env.NODE_ENV === "production" ? "/qgxtapi/commonInterface/upload" : process.env.NODE_ENV === "preview" ? "/qgxtapi/commonInterface/upload" : "/api/commonInterface/upload"
    },
    pdfImg(){
      return process.env.NODE_ENV === "production" ? "/qgxt/static/img/pdf.png" : "/static/img/pdf.png"
    },
    fileType() {
      let  data  = []
      this.fileTypes.forEach((item)=>{
        if(item=='1'){
          data.push('图片')
        }else if(item=='2'){
          data.push('视频')
        }else if(item=='3'){
          data.push('PDF')
        }
      })
      return this.hasVideo ? data : data
    },
  },
  data() {
    return {
      fileList: [],
      uploadFileList: [],
      dialogVisible: false,
      img: "",
      viewStyle: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px"
      },
      cropperFile: {},
      showViewer: false,
      imgViewer: []
    };
  },
  methods: {
    handleBeforeUpload(file) {
      const index = file.name.lastIndexOf(".");
      const type = file.name
          .substring(index + 1, file.name.length)
          .toLowerCase();
      let hasType = this.fileType.includes(type);
      let errorStr = this.hasVideo ? `上传文件只能是 jpg/png/mp4 格式!` : `上传文件只能是 jpg/png 格式!`;
      if (!hasType) {
        this.$message.error(errorStr);
        return false;
      }
      let isLt = true;
      const fileSize = file.size / 1024 / 1024;
      let maxSize = type === "mp4" ? 100 : 10;
      if (fileSize > maxSize) {
        this.$message.error(`上传${type === 'mp4' ? '视频' : '图片'}不能超过${maxSize}MB`);
        return false;
      }
      //避免重复上传
      let isRepeat = false;
      this.fileList.forEach((item) => {
        if (file.name == item.name && file.size == item.size) {
          isRepeat = true;
        }
      });
      if (isRepeat) {
        this.$message.error("避免重复上传！");
        return false;
      }
      if (!this.multiple && this.cropper && (type == "jpg" || type == "png")) {
        this.cropperFile = file;
        this.$utils.common.getBase64(file).then((res) => {
          this.img = res;
        });
        this.dialogVisible = true;
        return false;
      } else {
        return true;
      }
    },
    handlePreview(file) {
      console.log("==下载文件==");
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log("==删除文件==");
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      console.log('response :>> ', response);
      console.log('file :>> ', file);
      console.log('fileList :>> ', fileList);
      this.$message.success("上传成功");
      this.setFileList(file);
      // let size = "";
      // if (parseInt(file.size / 1024 / 1024) !== 0) {
      //   size = parseInt(file.size / 1024 / 1024) + "MB";
      // } else if (parseInt(file.size / 1024) !== 0) {
      //   size = parseInt(file.size / 1024) + "KB";
      // } else {
      //   size = parseInt(file.size) + "B";
      // }
    },
    handleError(err, file, fileList) {
      this.$message.warning("上传失败:" + err);
    },

    getFileList() {
      let list = [];
      for (const item of this.fileList) {
        list.push({name: item.name, url: item.response.msg});
      }
    },
    setFileList(file) {
      const index = file.name.lastIndexOf(".");
      let newFile = {
        name: file.name,
        url: file.response.data.urlPaths ? file.response.data.urlPaths : "",
        type: file.name.substring(index + 1, file.name.length).toLowerCase(),
        size: file.size
      };
      if (this.multiple) {
        this.fileList.push(newFile);
      } else {
        this.fileList = [newFile];
      }
      if (typeof this.value === "string") {
        this.$emit("input", this.fileList[0].url);
      } else {
        let fileList = this.fileList.map(item => item.url);
        this.$emit("input", fileList);
      }
    },
    pushFileList(urlPaths) {
      let urlPathsArr = urlPaths.split('/');
      let nameArr = urlPathsArr[urlPathsArr.length - 1].split('.');

      let newFile = {
        name: urlPathsArr[urlPathsArr.length - 1],
        url: urlPaths,
        type: nameArr[1],
        size: 0
      };
      if (this.multiple) {
        this.fileList.push(newFile);
      } else {
        this.fileList = [newFile];
      }
      if (typeof this.value === "string") {
        this.$emit("input", this.fileList[0].url);
      } else {
        let fileList = this.fileList.map(item => item.url);
        this.$emit("input", fileList);
      }
    },
    getCropBlob(blob) {
      const file = new File([blob], this.cropperFile.name, {
        type: this.cropperFile.type
      });
      this.upload(file)
      this.dialogVisible = false;
    },
    toBlobUplaod(blob,name,type) {
      const file = new File([blob], name, {
        type: "image/" + type
      });
      this.upload(file)
    },
    upload(file){
        var form = new FormData(); // FormData 对象
        form.append("file", file); // 文件对象
        upload(this.uploadurl, form)
            .then((res) => {
              if (res.code === 200) {
                file.response = res;
                this.setFileList(file);
              } else {
                this.$message.error(res.msg ? res.msg : "上传失败");
              }
            })
            .catch((err) => {
              console.log(err);
            });

    },
    saveSubmit() {
      this.$refs["assembly-vue-cropper"].getCropBlob();
    },
    clearForm() {
      this.$refs["assembly-vue-cropper"].reload();
    },
    //关闭预览时间
    closeViewer() {
      this.imgViewer = [];
      this.showViewer = false;
    },
    //打开预览事件
    imgClick(item) {
      console.log("item",item)
      const url = item.url;
      if(item.type === 'pdf'){
        window.open(item.url);
        return
      }
      let fileList = this.fileList;
      let imgViewer = fileList.map((item) => {
        return {
          type: item.type == "mp4" ? "video" : "img",
          src: item.url
        };
      });
      let idx = 0;
      imgViewer.forEach((item, index) => {
        if (item.src === url) idx = index;
      });

      let faterImgList = imgViewer.slice(0, idx);
      let beforeImgList = imgViewer.slice(idx);
      this.imgViewer = [...beforeImgList, ...faterImgList];
      this.showViewer = true;
      return false;
    },
    //删除按钮事件
    imgDel(url) {
      console.log("url",url)
      let fileList = this.fileList;
      let idx = fileList.findIndex((item) => {
        return item.url == url;
      });
      fileList.splice(idx, 1);
      this.$set(this.$data, "fileList", fileList);
      let fileLists =  this.$utils.tool.deepClone(this.fileList);
        fileLists = fileLists.map((item)=>{
        return item.url
        })
      this.$emit("input", fileLists);
    },
    //鼠标移入事件
    handlemove(e) {
      let maskBox = e.currentTarget.querySelector(".mask-box");

      if (maskBox && maskBox.style.opacity == 0) {
        maskBox.style.opacity = 1;
      }
    },
    //鼠标移除事件
    handleout(e) {
      let maskBox = e.currentTarget.querySelector(".mask-box");
      if (maskBox && maskBox.style.opacity == 1) {
        maskBox.style.opacity = 0;
      }
    },
    //超出上线报错信息
    exceedLimit() {
      this.$message.warning("最多上传10个文件");
    },
    //清空上传列表
    clearImage() {
      if (this.fileList.length > 0) {
        this.fileList = [];
      }
      this.$refs.upload.clearFiles();
    }
  }
};
</script>

<style lang="scss">
.upload-file {

  .btn-uplaod {
    .el-upload-dragger {
      border: 0px;
      min-height: 0px !important;
    }
  }

  .el-upload {
    width: 100%;
  }

  .el-upload-dragger {
    width: 100%;
    min-height: 180px;
    height: 100%;
  }

  .mini .el-upload-dragger {
    width: 140px;
    height: 140px;
    min-height: 140px;

    &:hover {
      .el-icon-upload {
        color: #409eff;
      }
    }
  }

  .mask-box {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 28px;
      color: #fff;
    }

    i + i {
      margin-left: 18px;
    }
  }

  .upload-tips-box {
    font-size: 12px;
    line-height: 1.6;
  }
}
</style>