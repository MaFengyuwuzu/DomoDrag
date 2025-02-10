//storage.js
let ls = window.localStorage
let ss = window.sessionStorage

export const locStorage = {
  set(name, content) {
    if (!name) return
    ls.setItem(name, JSON.stringify(content))
  },
  get(name) {
    try {
      return JSON.parse(ls.getItem(name))
    } catch (e) {
      return null
    }
  },
  remove(name) {
    if (!name) return
    ls.removeItem(name)
  },
  clear() {
    ls.clear()
  }
}

export const sesStorage = {
  set(name, content) {
    if (!name) return
    ss.setItem(name, JSON.stringify(content))
  },
  get(name) {
    try {
      return JSON.parse(ss.getItem(name))
    } catch (e) {
      return null
    }
  },
  remove(name) {
    if (!name) return
    ss.removeItem(name)
  },
  clear() {
    ss.clear()
  }
}