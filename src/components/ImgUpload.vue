<template>
  <div>
    <div class="upLoadscroll">
      <div class="upLoadwrap">
        <div class="imgPreview"  v-for="(item,index) in imgsBase64">
          <img :src="item" alt="" @click="sheetImg(index)">
        </div>
        <van-uploader :after-read="onRead" accept="image/*" :multiple="multiple ? multiple : false" class="imgWrap">
          <img src="../assets/img/uploadPZ.png" alt="" class="imgUpload">
        </van-uploader>
      </div>
    </div>

    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="show = false"
    />
  </div>
</template>
<script>
  /**
   * @date 2019/2/21
   * @author zyw
   * @description img upload ：base64 formData
   * @prop mode：默认是base64 传FormData 代表FormData格式 || lrz 压缩 === multiple：是否多选，默认单选
   */
  import { ImagePreview } from 'vant';
  import { mapState } from 'vuex'
  import * as config from '../utils/config'
  import * as common from '../utils/common'
  import axios from 'axios'
  export default {
    props:{
      mode:{
        type:String,
        default:''
      },
      multiple:{
        type:Boolean,
        default:false
      },
      maxLength:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        imgsBase64:[],
        imgFormData:[],
        show:false,
        actions:[
          {
            name: '删除'
          },
        ],
        index:'',
      }
    },
    computed:{
//      ...mapState([''])
    },
    watch:{

    },
    created(){

    },
    mounted(){

    },
    methods:{
      onRead(file){
        if (this.multiple){
          if (file.length > this.maxLength){
            common.toast(`最多选择${this.maxLength}张照片`)
            return
          }
          if (this.mode){
            this.imgFormData.length === this.maxLength ? common.toast(`最多上传${this.maxLength}张照片`) : this.lrzImages(file)
          }else {
            this.imgsBase64.length === this.maxLength ? common.toast(`最多上传${this.maxLength}张照片`) : this.lrzImages(file)
          }
        }else {
          if (this.mode){
            this.imgFormData.length === this.maxLength ? common.toast(`最多上传${this.maxLength}张照片`) : this.lrzImages(file)
          }else {
            this.imgsBase64.length === this.maxLength ? common.toast(`最多上传${this.maxLength}张照片`) : this.lrzImages(file)
          }
        }

      },
      lrzImages(file){
        this.$toast.loading({
          mask: true,
          message: '上传中...',
          loadingType:'spinner',
          duration:0
        });
        let imgsBase64Arr = []
        let promise = []
        let formData = new FormData()
        if (file.content){
          promise.push(lrz(file.file,{quality :0.7}))
        }else {
          file.map(item => {
            promise.push(lrz(item.file,{quality :0.7}))
          })
        }

        switch (this.mode){
          case 'FormData':
            Promise.all(promise)
              .then(res => {
                res.map(item => {
                  formData.append('file',item.origin)
                })
                this._uploadImg(formData)
              })
            break;
          default:
            Promise.all(promise)
              .then(res => {
                res.map(item => {
                  imgsBase64Arr.push(item.base64)
                })
                this._uploadImg(imgsBase64Arr)
              })
        }
      },
      _uploadImg(value){
        switch (this.mode){
          case 'FormData':
            let url = config.URL_FILE_FORMDATA_UPLOAD
            let axiosConfig = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.$toast.loading({
              mask: true,
              message: '上传中...',
              loadingType:'spinner',
              duration:0
            });
          axios.post(url,value,axiosConfig)
            .then(res => {
              this.$toast.clear()
              if (res.errorCode == 100){

              }
            })
            .catch(err => {
              this.$toast.clear()
            })
          break;
          default:
            let data = {
              file:value.join("$$")
            }
            this.httpCli({
              url:config.URL_FILE_BASE64_UPLOAD,
              data:data,
              timeout:'',
            })
              .then(res => {
                this.$toast.clear()
                if (res.errorCode == 100){
                  if (res.data.urlList.length){
                    res.data.urlList.map(item => this.imgsBase64.push(item))
                    this.$emit('getImgsBase64',this.imgsBase64)
                  }
                  this.$toast.success('上传成功')
                }
              })
              .catch(err => {
                this.$toast.clear()
              })
        }
      },
      sheetImg(index){
//        ImagePreview({
//          images: this.imgsBase64,
//          startPosition: index,
//          showIndicators:true,
//          onClose() {
//            // do something
//          }
//        });
        this.show = true
        this.index = index
      },
      onSelect(){
        this.$toast.success('删除成功')
        this.imgsBase64.splice(this.index,1)
        this.show = false
      },
    }
  }
</script>
<style scoped>
  .upLoadscroll{
    width: 100%;
    overflow-x: scroll;
  }
  .upLoadwrap{
    display: flex;
  }
  .imgWrap{
    border-radius: 10px; /*no*/
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 150px;
    min-width: 150px;
  }
  .imgUpload{
    width: 150px;
    height:155px;
  }
  .imgPreview{
    width: 150px;
    height:150px;
    margin-right: 5px;
    border-radius: 10px; /*no*/
    border: 3px #eee solid;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 150px;
    min-height: 150px;
  }
  .imgPreview img {
    max-height: 150px;
    max-width: 150px;
  }
</style>
