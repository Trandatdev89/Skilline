import { Base64UploadAdapter } from '../Base64UploadAdapter.ts'

export function Base64UploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new Base64UploadAdapter(loader)
  }
}
