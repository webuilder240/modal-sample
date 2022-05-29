<template>
<div>
  <div class="modalOverlay" @click.self="pop" v-if="renderModalOverlay">
    <component v-for="(modal, index) in modalState" :key="index" :is="modal.view" :close-modal="pop" :params="modal.params" />
  </div>
</div>
</template>

<script>
  import modalViewStore from "@/Stores/ModalViewStore"

  export default {
    data() {
      return {
        modalState: []
      }
    },
    mounted() {
      this.modalState = modalViewStore.state.modals
      modalViewStore.onChange(() => {
        this._onChange()
      })
    },
    methods: {
      push(modal) {
        modalViewStore.dispatch("push", modal)
      },
      pop() {
        modalViewStore.dispatch("pop")
      },
      _onChange() {
        this.modalState = modalViewStore.state.modals
      },
    }, 
    computed: {
      currentComponent() {
        return this.current?.view
      },
      renderModalOverlay() {
        return this.modalState.length > 0
      },
      current() {
        if (this.modalState.length > 0) {
          return this.modalState[this.modalState.length - 1]
        } 
        return null
      }
    }
  }
</script>


<style>
.modalOverlay {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.close-modal {
  position: absolute;              /* modalを閉じるボタン */
  top: 4px;
  right: 22px;
  font-size: 40px;
  color: #333;
  cursor: pointer;
  border: none;
  background: none;
}

p {
  font-size: 20px;
}

.hidden {
  display: none;            /* hiddenクラスが付与されている場合は表示させないようにする */
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  color: rgb(255, 0, 0);
  background-color: white;
  padding: 6rem;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);   /* modalに影を作る */
  z-index: 10;           /* z-indexでmodalを一番上に位置させる */
}

.overlay {
  position: absolute; /* overlayの絶対位置を左上を起点にし幅と高さを100%にする */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);    
  backdrop-filter: blur(3px); /* 一番下のbody領域をぼやかす */
  z-index: 5; /* z-indexの数字を0と10の間の数字にし、bodyとmodalの真ん中に位置させる */
}
</style>