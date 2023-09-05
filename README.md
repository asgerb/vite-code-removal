# Vite stripping part of imported module

Vite strips out an important part of the `@github/text-expander-element` module.

Compare the resulting js

```js
onCommit({ target }) {
  const item = target
  if (!(item instanceof HTMLElement)) return
  if (!this.combobox) return
  const match = this.match
  if (!match) return
  this.input.value.substring(0, match.position - match.key.length)
  this.input.value.substring(match.position + match.text.length)
  const detail = { item, key: match.key, value: null, continue: false }
  const canceled = !this.expander.dispatchEvent(
    new CustomEvent("text-expander-value", { cancelable: true, detail }),
  )
  if (canceled) return
  return
}
```

to the original:

```js
onCommit({ target }) {
  var _a
  const item = target
  if (!(item instanceof HTMLElement)) return
  if (!this.combobox) return
  const match = this.match
  if (!match) return
  const beginning = this.input.value.substring(
    0,
    match.position - match.key.length,
  )
  const remaining = this.input.value.substring(
    match.position + match.text.length,
  )
  const detail = { item, key: match.key, value: null, continue: false }
  const canceled = !this.expander.dispatchEvent(
    new CustomEvent("text-expander-value", { cancelable: true, detail }),
  )
  if (canceled) return
  if (!detail.value) return
  let suffix =
    (_a = this.expander.getAttribute("suffix")) !== null && _a !== void 0
      ? _a
      : " "
  if (detail.continue) {
    suffix = ""
  }
  const value = `${detail.value}${suffix}`
  this.input.value = beginning + value + remaining
  const cursor = beginning.length + value.length
  this.deactivate()
  this.input.focus({
    preventScroll: true,
  })
  this.input.selectionStart = cursor
  this.input.selectionEnd = cursor
  if (!detail.continue) {
    this.lookBackIndex = cursor
    this.match = null
  }
  this.expander.dispatchEvent(
    new CustomEvent("text-expander-committed", {
      cancelable: false,
      detail: { input: this.input },
    }),
  )
}
```

The build file makes an early return (perhaps it infers it?) which results in the element not working.

## Vite config

```
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    clearOutputPath: true,
    minify: false,
    lib: {
      entry: {
        admin: resolve(__dirname, "admin.js"),
      },
      name: "@asgerb/vite-code-removal",
    },
  },
})
```
