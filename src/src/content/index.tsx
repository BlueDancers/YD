import { defineComponent, onMounted, onUnmounted } from 'vue';

import contentHeader from './components/contentHeader/index'
import contentLeft from './left/index.vue'
import contentRight from './right/index'
import contentCenter from './center/index'
import './index.scss';
import { useRoute } from 'vue-router';
import { useBoardStore } from '@/store/board';
import { useCoreStore } from '@/store/core';
import { useLineStore } from '@/store/line';
import { unInstallKey } from '../content/center/useListen';

export default defineComponent({
  components: {
    contentHeader, contentLeft, contentRight, contentCenter
  },
  setup() {
    // 监听键盘
    const route = useRoute()
    const board = useBoardStore()
    const core = useCoreStore()
    const line = useLineStore()
    onMounted(() => {
      board.getPageData(route.query.id)
    })
    onUnmounted(() => {
      board.$reset()
      core.$reset()
      line.$reset()
      unInstallKey()
    })
    return () => (
      <div class="content">
        <content-header></content-header>
        <div class="content_main">
          {/* 左边 */}
          <content-left></content-left>
          {/* 中间 */}
          <content-center></content-center>
          {/* 右边 */}
          <content-right></content-right>
        </div>
      </div>
    )
  }
})