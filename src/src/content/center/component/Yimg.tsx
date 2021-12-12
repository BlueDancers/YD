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
      <img style={compResetCss(props.compData.cssModule)} src={props.compData.staticData.src} />
    )
  }
})