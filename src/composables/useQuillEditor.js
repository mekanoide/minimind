import { ref, onMounted, onUnmounted } from 'vue'
import Quill from 'quill'
import QuillMarkdown from 'quilljs-markdown'

export const useQuillEditor= (target) => {
  const quillEditor = ref(null)
  const quillEditorMarkdown = ref(null)

  console.log('quill target', target)

  onMounted(() => {
    /* Quill.register('modules/markdown', QuillMarkdown) */

    quillEditor.value = new Quill(target, {
      modules: {
        markdown: true
        // ...otros módulos y configuración
      }
      // ...otras opciones de Quill
    })
    quillEditorMarkdown.value = new QuillMarkdown(quillEditor.value)
  })

  onUnmounted(() => {
    if (quillEditor.value) {
      quillEditor.value = null
      quillEditorMarkdown.value = null
    }
  })

  return { quillEditor: quillEditor.value, quillEditorMarkdown: quillEditorMarkdown.value }
}
