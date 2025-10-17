import { dayjs } from 'element-plus'

export const formatTime = (time) => dayjs(time).format('YYYY年MM月DD日')

import { isReactive, markRaw } from 'vue'

export function deepClonePreserveMarkRaw(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj

  // 检查是否 markRaw 对象
  if (obj.__v_skip === true) return obj

  if (cache.has(obj)) return cache.get(obj)

  let clone
  if (Array.isArray(obj)) {
    clone = []
    cache.set(obj, clone)
    obj.forEach((item, i) => {
      clone[i] = deepClonePreserveMarkRaw(item, cache)
    })
  } else {
    clone = {}
    cache.set(obj, clone)
    for (const key in obj) {
      const val = obj[key]
      if (typeof val === 'function' && val.toString().includes('import(')) {
        clone[key] = val
      } else {
        clone[key] = deepClonePreserveMarkRaw(val, cache)
      }
    }
  }

  return clone
}
