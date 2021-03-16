import { appRoot , DEST , chunkList } from '@root/Dir' ; 
import { join } from 'path' ; 
import { sync } from 'glob' ; 
import HtmlWebpackPlugin from'html-webpack-plugin' ; 

const HtmlRule = {
  test : /.html$/i , 
  use : [ 'mustache-loader' , {
    loader : 'html-loader' , 
    options : {
      interpolate : true , 
    }
  }]
} ; 

const HtmlPackagePlugin = ( pageList , subFolders ) => {
  let arr = [] ;  
  const htmlPackage = ( pages , folderName = '' ) => {
    pages.forEach( page => {
      let defaultChunkList  = ['common'] 
      ,   pageName          = page.split( '/' ).pop() 
      ,   chunkName         = pageName.replace( /\.html$/ , '' ) 
      ; 

      chunkList.some( c => {
        if ( chunkName.match( c ) != null ) {
          return chunkName = c ; 
        }
      }) ; 

      if ( folderName != '' ) {
        chunkName = folderName.split( '/' ).pop() ; 
      }
      
      defaultChunkList[ defaultChunkList.length ] = chunkName ; 
      arr[ arr.length ] = new HtmlWebpackPlugin({
        template : page , 
        publicPath : join( appRoot , DEST ) , 
        filename : join( appRoot , DEST , folderName , pageName ) , 
        chunks : defaultChunkList , 
        inject : 'head' , 
        alwaysWriteToDisk : true , 
      }) ; 
    }) ; 
  } ; 

  subFolders.forEach( folder => htmlPackage( sync( `${ folder }/*.html` ) , `page/${ folder.split( '/' ).pop()}` )) ; 
  htmlPackage( pageList ) ; 
  return arr ; 
} ; 

export { 
  HtmlRule , 
  HtmlPackagePlugin as HtmlPackage 
} ; 