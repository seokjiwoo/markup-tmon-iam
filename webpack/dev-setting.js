import { rootPath , PORT } from '@root/Dir' ; 

console.log({ rootPath }) ; 

const DevSetting = {
  devServer : {
    enumerable : true , 
    configurable : true , 
    writable : true , 
    value: {
      watchContentBase : true , 
      port : PORT , 
      open : true , 
      contentBase : `${ rootPath }` , 
      // contentBase : './src' , 
      inline : true ,
      hot : true , 
    }
  } , 

  devtool : {
    enumerable : true , 
    value : 'inline-source-map' , 
  } ,   
} ; 
export default DevSetting ; 