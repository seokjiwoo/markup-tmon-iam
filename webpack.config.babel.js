import { join } from 'path' ; 
import { CleanWebpackPlugin } from'clean-webpack-plugin' ; 
import { imgsPath as _imgsPath , appRoot , rootPath , DEST , pageList , subFolders , jsList , cssList } from '@root/Dir' ; 
import { ScssRule , JsRule , CopyPlugin , imageRule, CopyLibPlugin } from '@webpack/rules' ; 
import MakeEntryList from '@webpack/make-entry-list' ; 
import { HtmlPackage , HtmlRule } from '@webpack/html-package' ; 
import MakeSprite from '@webpack/make-sprite' ; 
import DevSetting from '@webpack/dev-setting' ; 

const config = ( env , options ) => {
  let entryList = {} 
  ,   imgsPath = _imgsPath[options.namespcae] ; 

  /* for ( const [ k , v ] of Object.entries( _imgsPath )) {
    if ( k == options.namespcae ) imgsPath = v ; 
  } */

  // console.log({ subFolders }) ; 

  MakeEntryList([[ jsList , 'js' ] , [ cssList , 'scss' ]] , entryList ) ; 
  const config = {
    entry : entryList , 
    output : {
      path : join( appRoot , DEST ) , 
      filename : 'js/[name].js' , 
    } , 

    module : {
      rules : [
        JsRule , 
        ScssRule.module , 
        HtmlRule , 
      ]
      .concat((_=> imageRule( imgsPath ))())  
    } , 

    plugins : [
      new CleanWebpackPlugin() , 
      ScssRule.plugin , 
      CopyPlugin , 
      CopyLibPlugin
      // new CopyPlugin([
      //   { from : }
      // ])
    ]
    .concat((_=> HtmlPackage( pageList , subFolders ))())
    .concat((_=> MakeSprite( imgsPath ))()) , 

    stats : 'errors-only' , 

    resolve : {
      modules: [ "node_modules" , "sprite" ] , 
      alias : {
        '@' : appRoot , 
        'root' : rootPath , 
      }
    } ,    
  } ; 

  if ( options.mode == 'development' ) {
    let { devServer , devtool } = DevSetting ; 
    Object.defineProperties( config , { devServer , devtool }) ; 
  }

  return config ; 
} ; 
export default config ; 