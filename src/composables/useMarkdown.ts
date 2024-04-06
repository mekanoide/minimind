import { ref, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import * as mditHljs from 'markdown-it-highlightjs'

interface Token {
  attrs?: Array<[string, string]> | undefined
}

interface MditHljsOptions {
  inline?: boolean
  auto?: boolean
  code?: boolean
}

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  highlights: true,
  typographer: true
})

md.renderer.rules.link_open = (
  tokens: Token[],
  idx: number,
  options: any,
  env: any,
  self: any
) => {
  const token = tokens[idx]
  const linkRegex = /https?:/g
  if (token.attrs) {
    const match = token.attrs[0][1].match(linkRegex)
    if (match) {
      return `<a href="${token.attrs[0][1]}" target="_blank" rel="noopener">`
    } else {
      return `<a href="${token.attrs[0][1]}">`
    }
  }
}

export function useMarkdown(initialValue: string) {
  const markdown = ref<string>(initialValue)
  const html = ref<string>('')

  watch(
    markdown,
    (newMarkdown: string) => {
      html.value = md.render(newMarkdown)
    },
    { immediate: true }
  )

  return { markdown, html }
}
