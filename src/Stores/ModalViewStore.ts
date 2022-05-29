import { createStore } from "@/lib/CreateStore";
import { VueConstructor } from "vue";

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


// 保持する機能
// 現状のURLをパースする。
// 再生する機能
// 1. 現状のURLをパースする
// 2. URLにあるパラメータから逆引きする。
// 3. 逆引きしたModalオブジェクトから再生を行う。また、Paramsにも同様のデータを入れる。
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

export default createStore({state, actions})