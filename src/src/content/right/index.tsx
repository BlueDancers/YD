
import { defineComponent, ref, reactive } from 'vue'
import right from './index.module.scss';

export default defineComponent({
  setup() {
    return () => (
      <div class={right.right}>
      </div>
    )
  },
})