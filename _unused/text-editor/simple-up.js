import KeyBinding from './simple-key-binding.js'

module.exports = new class extends KeyBinding {
  constructor () {
    super('UP')
  }

  run (editor, key) {
    editor.textBuffer.moveUp()
    if (editor.textBuffer.cx > editor.textBuffer.buffer[editor.textBuffer.cy].length - 1) {
      editor.textBuffer.moveToEndOfLine()
    }
    editor.drawCursor()
  }
}()