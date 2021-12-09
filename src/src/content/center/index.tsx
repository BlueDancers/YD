
import { useBoardStore } from '@/stores/board';
import { useCoreStore } from '@/stores/core';
import { defineComponent, ref } from 'vue'
import c from './index.module.scss';
import useListen from './useListen';

import { resetCss, contResetCss, compResetCss } from '@/utils/index'

import auxiliaryPoint from '../components/auxiliaryPoint.vue';
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
		const boardCore = ref(null)
		const heightCore = ref(null)
		const mainCore = ref(null)
		useListen({
			boardTarget: boardCore,
			mainTarget: mainCore,
			heightTarget: heightCore,
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
		function mouseDown(evt, index) {
			core.toggleComp(index)
			evt.preventDefault()
		}
		function mouseOver(evt, index) {
			core.hoverCompIndex = index
			evt.preventDefault()
		}
		return () => (
			<div id={c.center_core} ref={boardCore} class="board_center">
				<div class={c.core}
					ref={mainCore}
					style={{
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
							core.pageData.length && core.pageData[0].map((e, i) => (
								e.show && <auxiliaryPoint
									style={contResetCss(e.cssModule)}
									index={i}
									activeCompIndex={core.activeCompIndex}
									hoverCompIndex={core.hoverCompIndex}
									onMousedown={(evt) => mouseDown(evt, i)}
									onMouseover={evt => mouseOver(evt, i)}
								>
									{e.name == 'y-div' && <Ydiv compData={e}></Ydiv>}
								</auxiliaryPoint>
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
	// mousedown：鼠标的键钮被按下。
	// mouseup：鼠标的键钮被释放弹起。
	// click：单击鼠标的键钮。
	// dblclick：鼠标的键钮被按下。
	// contextmenu ：弹出右键菜单。
	// mouseover：鼠标移到目标的上方。
	// mouseout：鼠标移出目标的上方。
	// mousemove：鼠标在目标的上方移动。
})