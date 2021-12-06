
import { useBoardStore } from '@/stores/board';
import { useCoreStore } from '@/stores/core';
import { defineComponent, ref } from 'vue'
import c from './index.module.scss';
import useListen from './useListen';

import { resetCss, contResetCss, compResetCss } from '@/utils/index'

import auxiliaryPoint from '@/components/auxiliaryPoint.vue';
import Ydiv from './component/Ydiv'


export default defineComponent({
	components: {
		auxiliaryPoint,
		Ydiv
	},
	setup() {
		// 全局数据
		const board = useBoardStore()
		const core = useCoreStore()
		const centerCore = ref(null)
		const heightCore = ref(null)
		useListen({
			mainTarget: centerCore,
			heightTarget: heightCore
		})
		function coreDrop(evt) {
			console.log(evt);
			
			let name = evt.dataTransfer.getData('compIndex')
			core.addComp(name, {
				top: evt.offsetY,
				left: evt.offsetX,
			})
			evt.preventDefault()
		}
		return () => (
			<div id={c.center_core} ref={centerCore}>
				<div class={c.core} style={{
					left: `${board.left}%`,
					top: `${board.top}px`,
					height: `${board.height}px`,
					transform: `translate(-50%, 0%) scale(${board.scale})`,
					backgroundColor: board.pageDetail.backColor
				}}
					onDrop={(evt) => coreDrop(evt)}
					onDragover={(evt) => evt.preventDefault()}
					onDragend={(evt) => evt.preventDefault()}
					onDragleave={(evt) => evt.preventDefault()}
				>
					{/* 正式数据 */}
					<div>
						{
							core.pageData.length && core.pageData[0].map(e => (
								e.name == 'y-div' && <Ydiv compData={e}></Ydiv>
							))
						}
					</div>
					{/* 辅助数据 */}
					<div class={c.core_assist}>
						{
							core.pageData.length && core.pageData[0].map(e => (
								<div class={c.comp_line} style={contResetCss(e.cssModule)}>
									<auxiliaryPoint></auxiliaryPoint>
								</div>
							))
						}
					</div>
					<div ref={heightCore} class={c.add_height} style={{
						top: `100%`,
						left: `0`,
					}}>
					</div>
				</div>
			</div >
		)
	},
})