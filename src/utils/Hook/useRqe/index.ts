import { reactive, toRefs, UnwrapRef } from 'vue'

interface dataTotalType<D> {
  data: D[]
  error: Error | null
  status: 'idle' | 'loading' | 'error' | 'success' | 'none'
}

export function useReq<D>(params = { loadToast: true }) {
  const defaultState: dataTotalType<any> = {
    data: [],
    error: null,
    status: 'idle',
  }
  let state = reactive<dataTotalType<D>>({ ...defaultState })

  /**
   * 请求成功
   * @param data
   */
  const setData = (data: D[]) => {
    state.data = data as any[]
    state.status = 'success'
  }

  /**
   * 请求失败
   * @param error
   */
  const setError = (error: Error) => {
    state.data = []
    state.error = error
    state.status = 'error'
  }

  const setLoading = () => {
    state.data = []
    state.error = null
    state.status = 'loading'
  }

  const setNone = () => {
    state.data = []
    state.error = null
    state.status = 'none'
  }

  const run = (promise) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 promise 类型数据')
    }
    setLoading()

    return promise
      .then((res) => {
        if (res.data.length == 0) {
          setNone()
        } else {
          setData(res.data)
        }

        return res.data
      })
      .catch((err) => {
        console.log(err)
        setError(err)
        return Promise.reject(err)
      })
      .finally(() => {
        if (params.loadToast) {
        }
      })
  }

  return {
    run,
    setData,
    setLoading,
    setError,
    ...toRefs(state),
  }
}
