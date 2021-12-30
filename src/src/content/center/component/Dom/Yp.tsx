import { compResetCss } from '@/utils';
import { defineComponent, onMounted, ref } from 'vue';
import css from './comp.module.scss';

export default defineComponent({
  props: ['compData'],
  setup(props) {
    onMounted(() => {
      console.log(props.compData);
    })
    return (props) => (
      <p style={compResetCss(props.compData.cssModule)} v-html={props.compData.staticData.text.replace(/\n|\r\n/g, '<br>')}></p>
    )
  }
})