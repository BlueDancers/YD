<template>
  <div class="img_cont" :style="{ width: `${props.width}px` }">
    <a-image :style="{ 'max-height': '200px' }" :width="props.width" :src="props.imglUrl" />
    <div class="img_change">修改</div>
    <input class="img_upload" type="file" accept="image/*" @change="getImg" />
  </div>
</template>

<script setup lang="ts">
import { uploadFile } from '@/modules/request'
import { message } from 'ant-design-vue'

const props = defineProps({
  imglUrl: String,
  width: Number,
  index: Number,
})
const emit = defineEmits(['changeImg'])

async function getImg(evt) {
  console.log(evt)
  const hideMessage = message.loading('上传中...', 0)
  let file = evt.target.files[0]
  let url = await uploadFile(`imgPhoto/${file.name}_${Date.now()}`, file)
  hideMessage()
  console.log('上传文案陈', url)

  emit('changeImg', url, props.index)
}
</script>

<style lang="scss" scoped>
.img_cont {
  position: relative;

  .img_content {
    max-height: 300px;
  }
  .img_change {
    background-color: rgb(0, 0, 0, 0.4);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #fff;
  }

  .img_upload {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    height: 25px;
    line-height: 25px;
  }
}
</style>