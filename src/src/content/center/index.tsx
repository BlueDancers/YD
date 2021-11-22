
import { defineComponent, ref, reactive } from 'vue'
import center from './index.module.scss';

export default defineComponent({
	setup() {
		let a = ref(211)
		return () => (
			<div class={center.center}>
				操作区
			</div>
		)
	},
})