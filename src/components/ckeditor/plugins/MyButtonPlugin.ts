import { Plugin, ButtonView } from 'ckeditor5'

export default class MyButtonPlugin extends Plugin {
  init() {
    const editor = this.editor

    editor.ui.componentFactory.add('myButton', locale => {
      const button = new ButtonView(locale)

      button.set({
        label: 'My Button',
        withText: true,
        tooltip: true,
      })

      button.on('execute', () => {
        const data = editor.getData();
        editor.fire('myButton:save',{data})
      });

      return button
    })
  }
}