import { compResetCss } from '@/utils/index'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: ['compData'],
  setup(props) {
    return () => <div>
      <img style={compResetCss(props.compData.cssModule)} src={props.compData.staticData.data[0].imglUrl} />
    </div>
  },
})
