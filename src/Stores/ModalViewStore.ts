import { createStore } from "@/lib/CreateStore";
import { Component } from "vue";
import { findModalView } from "@/lib/ModalName";
import { EventEmitter } from "events";

export const emitter = new EventEmitter()

export type ModalQueryParams = {
  name: string,
  query: Record<string, string>
}

export class Modal {
  name: string
  params: any
  queryParams?: ModalQueryParams
  view: Component | undefined

  constructor(options: IModal) {
    this.name = options.name
    this.params = options.params
    this.queryParams = options.queryParams
    const v = findModalView(this.name)
    if (v) {
      this.view = v.view
    }
  }
}

export type IModal = {
  name: string,
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

// 保持する機能
// 現状のURLをパースする。
const actions = {
  push: (state: ModalState, modal: Modal) => {
    state.modals.push(modal)
    emitter.emit("modal.push", modal)
  },

  pop: (state: ModalState) => {
    const currentUrl = new URL(location.href)
    state.beforeUrl = currentUrl
    const popModal = state.modals.pop()
    emitter.emit("modal.pop", popModal)
  }
}

export default createStore({state, actions})