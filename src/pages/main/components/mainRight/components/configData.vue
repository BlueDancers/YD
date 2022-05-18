<template>
  <div class="config_data">
    <!-- 富文本独有 -->
    <div class="config_edit" v-if="main.acTEmpName == 'y-edit'">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="'default'"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="main.acTempData.html"
        :defaultConfig="editorConfig"
        :mode="'default'"
        @onCreated="handleCreated"
      />
    </div>
    <el-form label-width="90px">
      <!-- 文本独有 -->
      <el-form-item label="文本：" v-if="main.acTEmpName == 'y-p'">
        <el-input class="p_input" v-model="main.acTempData.text" placeholder="请输入文本文字"></el-input>
      </el-form-item>
      <!-- 图片独有 -->
      <el-form-item label="图片：" v-if="main.acTEmpName == 'y-img'">
        <div class="upload_img">
          <input class="upload_core" type="file" @change="uploadImg" />
          <img class="img_cont" :src="main.acTempData.imglUrl" />
        </div>
      </el-form-item>
      <!-- 按钮独有 -->
      <el-form-item label="按钮文字：" v-if="main.acTEmpName == 'y-button'">
        <el-input
          class="default_input"
          v-model="main.acTempData.btnValue"
          placeholder="请输入按钮文字"
        ></el-input>
      </el-form-item>
      <!-- 公共部分 -->
      <el-form-item label="事件：" v-if="main.acTempData.linkType != undefined">
        <el-select v-model="main.acTempData.linkType" class="default_input">
          <el-option
            v-for="item in linkDataFun"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="链接地址：" v-if="main.acTempData.linkType == 1">
        <el-input
          class="default_input"
          v-model="main.acTempData.link"
          placeholder="请输入链接地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码：" v-if="main.acTempData.linkType == 2">
        <el-input
          class="default_input"
          v-model="main.acTempData.phone"
          placeholder="请输入电话号码"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 轮播图独有 -->
    <div v-if="main.acTEmpName == 'y-swiper'">
      <el-button type="primary" class="add_swiper_btn" @click="addSwiper">添加轮播图</el-button>
      <el-collapse>
        <el-collapse-item v-for="(item, index) in main.acTempData.data" :key="index">
          <template #title>
            <span class="collapse_title">第{{ index + 1 }}项</span>
          </template>
          <div>
            <el-form label-width="90px">
              <el-form-item label="图片：">
                <div class="upload_img">
                  <input class="upload_core" type="file" @change="changeSwiperImg($event, index)" />
                  <img class="img_cont" :src="item.imglUrl" />
                </div>
              </el-form-item>
              <!-- 公共部分 -->
              <el-form-item label="事件：">
                <el-select v-model="item.linkType" class="default_input">
                  <el-option
                    v-for="item in linkDataFun"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="链接地址：" v-if="item.linkType == 1">
                <el-input class="default_input" v-model="item.link" placeholder="请输入链接地址"></el-input>
              </el-form-item>
              <el-form-item label="电话号码：" v-if="item.linkType == 2">
                <el-input class="default_input" v-model="item.phone" placeholder="请输入电话号码"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMain } from '@/store/main'
import { uploadFile } from '@/utils/request'
import { linkDataFun } from '@/utils/styleData'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

import { IToolbarConfig, DomEditor } from '@wangeditor/editor'
import { baseSwiper } from '@/modules/component'

const main = useMain()

const editorRef = shallowRef()

const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    // 菜单 key  '|',
    'fontSize',
    'bold',
    'italic',
    'color',
    'bgColor',
    'lineHeight',
    'emotion',
    'insertLink',
    {
      key: 'group-more-style',
      title: '对齐',
      menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
    },
    // 继续配置其他菜单...
  ],
}
const editorConfig = { placeholder: '请输入内容...' }

function handleCreated(editor) {
  editorRef.value = editor // 记录 editor 实例
}

function uploadImg(evt) {
  let file = evt.target.files[0]
  uploadFile(`imgPhoto/${file.name}`, file).then((res) => {
    main.acTempData.imglUrl = res.tempFileURL
  })
}

// 添加轮播图
function addSwiper() {
  main.acTempData.data.push(baseSwiper())
}

// 修改轮播图图片
function changeSwiperImg(event, index) {
  let file = event.target.files[0]
  uploadFile(`imgPhoto/${file.name}`, file).then((res) => {
    main.acTempData.data[index].imglUrl = res.tempFileURL
  })
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  console.log('卸载')

  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style lang="less" scoped>
.config_data {
  .config_edit {
    border: 1px solid #eee;
    margin: 5px;
  }
  .upload_img {
    position: relative;
    height: 100px;
    width: 140px;
    .upload_core {
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
    .img_cont {
      max-height: 100%;
      max-width: 100%;
    }
  }
  .add_swiper_btn {
    width: 60%;
    margin-left: 20%;
    margin-bottom: 10px;
  }
}
</style>

<style lang="less">
.w-e-text-container [data-slate-editor] p {
  margin: 0px;
}
</style>
