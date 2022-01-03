import { debounce, deepClone } from '@/utils'
import { message } from 'ant-design-vue'

class History {
  private state: any[] = [] // 历史状态
  private index: number = 0 // 当前状态下标
  private maxState: number = 20 // 最大保存状态个数 (防止爆栈)
  private isSet = true // 是否可以set
  public setState(state: any) {
    // 为什么反撤销的下一次setState跳过呢?
    // 因为pinia的$subscribe无法监听我想监听到的字段,所以使用了watch来做
    // 每次撤销的时候都会重新赋值,就再次触发watch,就会触发问题
    debounce(() => {
      if (!this.isSet) {
        return
      }
      // 限制长度
      if (this.state.length >= this.maxState) {
        this.state.shift()
      }
      // 如果this.state.length 与this.index不一致说明,当前指针发生了变化,所以将指针后面的都去掉
      if (this.index < this.state.length - 1) {
        this.state.splice(this.index + 1, this.state.length - 1)
      }
      this.state.push(deepClone(state))
      this.index = this.state.length - 1 // 方便下标的计算 都从0开始计算
      console.log('记录', this.state, this.index)
    }, 200)
  }
  /**
   * 获取快照 用于调试
   */
  private getState() {
    return this.state
  }
  public replaceState() {
    // 撤销
    if (this.index > 0) {
      console.log('执行撤销逻辑')
      this.isSet = false
      this.index--
      let state = deepClone(this.state[this.index])
      return state
    } else {
      message.warn('已经无法再进行撤回')
      return deepClone(this.state[this.index])
    }
  }
  public unReplaceState() {
    console.log(this.state.length - 1, this.index)

    if (this.state.length - 1 > this.index) {
      // 反撤销
      this.index++
      let state = deepClone(this.state[this.index])
      return state
    } else {
      message.warn('已经无法再进行操作')
      return deepClone(this.state[this.index])
    }
  }
}

export default History
