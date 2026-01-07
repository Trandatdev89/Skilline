import {
  Plugin,
  createDropdown,
  addListToDropdown,
  Collection
} from 'ckeditor5';



export default class MyDropDownPlugin extends Plugin {
  init() {
    const editor = this.editor

    editor.ui.componentFactory.add('myDropdown', locale => {
      const dropdownView = createDropdown(locale)

      dropdownView.buttonView.set({
        label: 'Type mail config',
        withText: true,
        tooltip: true
      })

      const config = editor.config.get('myDropdown') || {};
      const listType = config.listType || [];
      const items = new Collection<any>()

      listType.forEach((type,index)=>{
        items.add({
          type:'button',
          model:{
            label:type.toLowerCase(),
            withText: true,
            value:type
          }
        },index)
      });

      addListToDropdown(dropdownView, items);

      this.listenTo(dropdownView,'execute',evt=>{
        const type = evt.source.value
        dropdownView.buttonView.set({
          label: type
        })
        editor.fire('myDropdown:changeType',type)
      })

      return dropdownView
    })
  }
}
