import { VueConstructor } from "vue"
import FirstModal from "@/components/modal/FirstModal.vue";
import SecondModal from "@/components/modal/SecondModal.vue";

export type ModalView =  {
  name: string,
  view: VueConstructor
}

export const modalViews: ModalView[] = [
  {
    name: "first_modal",
    view: FirstModal
  },
  {
    name: "second_modal",
    view: SecondModal
  },
  {
    name: "message_modal",
    view: FirstModal
  }
]

debugger

export function findModalView(name: string): ModalView | undefined {
  const index = modalViews.findIndex((modalView) => modalView.name === name)
  if (index > -1) {
    return modalViews[index] 
  }
}

export function findModalViewComponent(view: VueConstructor): ModalView | undefined {
  const index = modalViews.findIndex((modalView) => modalView.view === view)
  if (index > -1) {
    return modalViews[index] 
  }
}