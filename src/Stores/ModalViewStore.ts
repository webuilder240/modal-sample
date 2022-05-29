import { createStore } from "@/lib/CreateStore";
import { VueConstructor } from "vue";
import { findModalView } from "@/lib/ModalName";

export type ModalQueryParams = {
  name: string,
  query: Record<string, string>
}

export type Modal =  {
  view: VueConstructor
  params: any
  queryParams?: ModalQueryParams
}

export type ModalState = {
  modals: Modal[]
}

const state: ModalState = {
  modals: []
}

function init() {
  const currentUrl = new URL(location.href);
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
      const queryParams = modal.queryParams
      window.history.replaceState("modal", "", `${location.href}/?modal=${queryParams.name}`)
    }
  },
  pop: (state: ModalState) => {
    const popModal = state.modals.pop()
    if (popModal?.queryParams) {
      window.history.replaceState("modal", "", `/`)
    }
  }
}

init()
export default createStore({state, actions})