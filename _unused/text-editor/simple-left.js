import KeyBinding from './simple-key-binding.js'

module.exports = new class extends KeyBinding {
  constructor () {
    super('LEFT')
  }

  run (editor, key) {
    editor.textBuffer.moveBackward()
    editor.drawCursor()
  }
}()