import { createStore } from "@/lib/CreateStore";
import { Component } from "vue";
import { EventEmitter } from "events";

export const emitter = new EventEmitter()

function generateUuid() {
  // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
  // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
          case "x":
              chars[i] = Math.floor(Math.random() * 16).toString(16);
              break;
          case "y":
              chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
              break;
      }
  }
  return chars.join("");
}

export type IModal = {
  name: string,
  view: Component,
  params: any
}

export class Modal {
  readonly id: string
  readonly params: any
  readonly view: Component

  constructor(options: IModal) {
    this.id = generateUuid()
    this.params = options.params
    this.view = options.view
  }
}

export type ModalState = {
  modals: Modal[],
}

const state: ModalState = {
  modals: [],
}

const actions = {
  push: (state: ModalState, modal: Modal) => {
    state.modals.push(modal)
    emitter.emit("modal.push", modal)
  },

  pop: (state: ModalState) => {
    const popModal = state.modals.pop()
    emitter.emit("modal.pop", popModal)
  }
}

export default createStore({state, actions})