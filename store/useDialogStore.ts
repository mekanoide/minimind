import { defineStore } from "pinia"
import { ref } from "vue"

export const useDialogStore = defineStore('dialog', () => {
  const isShowingDialog = ref<Boolean>(false)
  const message = ref<string>('')
  const resolve = ref<any>(null)

  const openDialog = (msg: string) => {
    message.value = msg
    isShowingDialog.value = true
    return new Promise((rslv) => {
      resolve.value = rslv
    })
  }

  const confirm = () => {
    isShowingDialog.value = false
    resolve.value(true)
  }

  const cancel = () => {
    isShowingDialog.value = false
    resolve.value(false)
  }

  return {
    isShowingDialog,
    message,
    resolve,
    openDialog,
    confirm,
    cancel
  }
})
