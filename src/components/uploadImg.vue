<template>
  <a-upload
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
  >
    <div class="uploader_cont">
      <loading-outlined class="loading_icon" v-if="loading"></loading-outlined>
      <img class="img_center" v-if="imageUrl" :src="imageUrl" alt="你在等什么?" />
      <div v-else>
        <plus-outlined></plus-outlined>
        <div class="ant-upload-text">点击上传</div>
      </div>
    </div>
  </a-upload>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, nextTick, ref, watchEffect } from 'vue'
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { cloud } from '@/modules/request'
import { useStore } from 'vuex'
interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
  type?: string
  size: number
  originFileObj: any
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

export default defineComponent({
  props: ['value'],
  components: {
    UploadOutlined,
    LoadingOutlined,
    PlusOutlined,
  },
  setup(prop, { emit }) {
    const store = useStore()
    const loading = ref<boolean>(false)
    const imageUrl = ref('') // 图片链接

    watchEffect(() => {
      imageUrl.value = prop.value
    })

    const beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      let userName = store.state.app.userData.email
      let fileName = `${userName}_${Date.now()}.${file.name.split('.')[1]}`
      loading.value = true
      cloud
        .uploadFile({
          // 云存储的路径
          cloudPath: `staticImg/${fileName}`,
          filePath: file,
        })
        .then((res) => {
          // 返回文件 ID
          return cloud
            .getTempFileURL({
              fileList: [res.fileID], //要下载的文件 ID 组成的数组 本示例填写为上面代码的文件id
            })
            .then((result: any) => {
              result.fileList.forEach((el) => {
                if (el.code === 'SUCCESS') {
                  emit('update:value', el.tempFileURL)
                  nextTick
                } else {
                  console.log('获取地址失败') //获取地址失败
                }
              })
            })
        })
        .finally(() => {
          loading.value = false
        })
      return false
    }
    return {
      imageUrl,
      loading,
      beforeUpload,
    }
  },
})
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 108px;
  height: 108px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.uploader_cont {
  position: relative;
}
.uploader_cont .img_center {
  max-width: 108px;
  max-height: 168px;
}
.uploader_cont .loading_icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
