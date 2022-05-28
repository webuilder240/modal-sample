import { createStore } from "@/lib/CreateStore";
import { VueConstructor } from "vue";

export type Modal =  {
  view: VueConstructor
  params: any
  pushState: boolean
}

export type ModalState = {
  modals: Modal[]
}

const state: ModalState = {
  modals: []
}

const actions = {
  push: (state: ModalState, modal: Modal) => {
    state.modals.push(modal)
    if (modal.pushState) {
      window.history.replaceState("modal", "", `${location.href}/?modal=text`)
    }
  },
  pop: (state: ModalState) => {
    const popModal = state.modals.pop()
    if (popModal?.pushState) {
      window.history.replaceState("modal", "", `/`)
    }
  }
}

export default createStore({state, actions})