import monaco from "monaco-editor"

export const themeData: monaco.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    {
      foreground: "ffffff61",
      token: "comment",
    },
    {
      foreground: "e6db74",
      token: "string",
    },
    {
      foreground: "ae81ff",
      token: "constant.numeric",
    },
    {
      foreground: "ae81ff",
      token: "constant.language",
    },
    {
      foreground: "ae81ff",
      token: "constant.character",
    },
    {
      foreground: "ae81ff",
      token: "constant.other",
    },
    {
      foreground: "f92672",
      token: "keyword",
    },
    {
      foreground: "f92672",
      token: "storage",
    },
    {
      foreground: "66d9ef",
      fontStyle: "italic",
      token: "storage.type",
    },
    {
      foreground: "d2e6ff",
      fontStyle: "underline",
      token: "entity.name.class",
    },
    {
      foreground: "a6e22e",
      fontStyle: "italic underline",
      token: "entity.other.inherited-class",
    },
    {
      foreground: "a6e22e",
      fontStyle: " italic",
      token: "entity.name.function",
    },
    {
      foreground: "fd971f",
      fontStyle: "italic",
      token: "variable.parameter",
    },
    {
      foreground: "f56b6d",
      token: "entity.name.tag",
    },
    {
      foreground: "a6e22e",
      token: "entity.other.attribute-name",
    },
    {
      foreground: "66d9ef",
      token: "support.function",
    },
    {
      foreground: "66d9ef",
      token: "support.constant",
    },
    {
      foreground: "66d9ef",
      fontStyle: "italic",
      token: "support.type",
    },
    {
      foreground: "66d9ef",
      fontStyle: "italic",
      token: "support.class",
    },
    {
      foreground: "f8f8f0",
      background: "f92672",
      token: "invalid",
    },
    {
      foreground: "f8f8f0",
      background: "ae81ff",
      token: "invalid.deprecated",
    },
  ],
  colors: {
    "editor.foreground": "#F8F8F2",
    "editor.background": "#2F3252",
    "editor.selectionBackground": "#49483E",
    "editor.lineHighlightBackground": "#3E3D32",
    "editorCursor.foreground": "#F8F8F0",
    "editorWhitespace.foreground": "#3B3A32",
  },
}
