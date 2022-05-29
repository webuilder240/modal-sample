import { createStore } from "@/lib/CreateStore";
import { Component, VueConstructor } from "vue";
import { findModalView, findModalViewComponent } from "@/lib/ModalName";

export type ModalQueryParams = {
  name: string,
  query: Record<string, string>
}

export type Modal =  {
  view: Component
  params: any
  queryParams?: ModalQueryParams
}

export type ModalState = {
  modals: Modal[],
  beforeUrl: URL | null
}

const state: ModalState = {
  modals: [],
  beforeUrl: null 
}

function init() {
  const currentUrl = new URL(location.href);
  state.beforeUrl = currentUrl
  const modalString = currentUrl.searchParams.get("modal");

  // 再生する機能
  // 1. 現状のURLをパースする
  // 2. URLにあるパラメータから逆引きする。
  // 3. 逆引きしたModalオブジェクトから再生を行う。また、Paramsにも同様のデータを入れる。
  if (modalString) {
    // 値の表示
    const modalView = findModalView(modalString)
    if (modalView) {
      let modalParams: ModalQueryParams = {
        name: modalString,
        query: {}
      }
      for (const value of currentUrl.searchParams.keys()) {
        const v = currentUrl.searchParams.get(value)
        if (v) {
          modalParams.query[value] = v
        }
      }
      const modal = {view: modalView.view, params: modalParams.query, queryParams: modalParams}
      state.modals.push(modal)
    }
  }
}

// 保持する機能
// 現状のURLをパースする。
const actions = {
  push: (state: ModalState, modal: Modal) => {
    state.modals.push(modal)
    if (modal.queryParams) {
      state.beforeUrl =  new URL(location.href)
      const afterUrl = new URL(location.href);
      afterUrl.searchParams.set("modal", modal.queryParams.name)

      for (const key in modal.queryParams.query) {
        const value = modal.queryParams.query[key]
        afterUrl.searchParams.set(key, value)
      }

      // 現状のURLにパラメータを追加する
      history.replaceState("modal", "", `${afterUrl.toString()}`)
    }
  },
  pop: (state: ModalState) => {
    const currentUrl = new URL(location.href)
    state.beforeUrl = currentUrl
    const popModal = state.modals.pop()
    if (popModal?.queryParams) {
      if (state.modals.length === 0) {
        const queryParams = popModal.queryParams
        if (queryParams) {
          for (const key in queryParams.query) {
            currentUrl.searchParams.delete(key)
          }
        }
        currentUrl.searchParams.delete("modal")
        history.replaceState("modal", "", `${state.beforeUrl}`)
      } else {
        history.replaceState("modal", "", `${state.beforeUrl}`)
      }
    } else {
      const modalString = currentUrl.searchParams.get("modal")
      if (modalString) {
        currentUrl.searchParams.delete("modal")
        history.replaceState("modal", "", `${currentUrl.toString()}`)
      }
    }
  }
}
init()

export default createStore({state, actions})