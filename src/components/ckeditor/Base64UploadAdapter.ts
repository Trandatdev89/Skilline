export class Base64UploadAdapter{
  private loader:any;

  constructor(loader:any) {
    this.loader = loader;
  }

  upload(){
    return this.loader.file.then((file:File)=>{
      return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>{
          resolve({
            default:reader.result
          })
        }

        reader.onerror = (error)=>reject(error);

        reader.readAsDataURL(file)
      })
    })
  }
  abort() {}
}
