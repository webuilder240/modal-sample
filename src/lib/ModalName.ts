import { VueConstructor, Component } from "vue"
import FirstModal from "@/components/modal/FirstModal.vue";
import SecondModal from "@/components/modal/SecondModal.vue";

type ModalView =  {
  name: string,
  view: Component
}


// もうちょっとここをリファクタリングしたい。
export const modalViews: ModalView[] = [
  {
    name: "first_modal",
    view: FirstModal
  },
  {
    name: "second_modal",
    view: SecondModal
  },
]

export function findModalView(name: string): ModalView | undefined {
  const index = modalViews.findIndex((modalView) => modalView.name === name)
  if (index > -1) {
    return modalViews[index] 
  }
}