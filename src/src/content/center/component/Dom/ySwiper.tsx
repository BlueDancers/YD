import { compResetCss, debounce } from '@/utils/index'
import { defineComponent, computed, ref, watch, watchEffect } from 'vue-demi'

export default defineComponent({
  props: ['compData'],
  setup(props) {
    const swipeRef = ref()
    const css = computed(() => compResetCss(props.compData.cssModule))
    const staticData = computed(() => props.compData.staticData)

    watch(
      css,
      () => {
        // vant的swiper是基于首次获取的宽度进行位移的,所以宽度发生变化,一定要resize
        debounce(() => {
          swipeRef.value.resize()
        }, 300)
      },
    )
    return () => <div>
      <van-swipe
        ref={swipeRef}
        style={css.value}
        autoplay={staticData.value.props.autoplay}
        showIndicators={staticData.value.props.showIndicators}
        vertical={staticData.value.props.vertical}
        indicatorColor={staticData.value.props.indicatorColor}
      >
        {
          staticData.value.data.map((e) => (
            <van-swipe-item>
              <img style={{ width: css.value.width, height: css.value.height }} src={e.imglUrl} />
            </van-swipe-item>
          ))
        }
      </van-swipe>
    </div>
  },
})
