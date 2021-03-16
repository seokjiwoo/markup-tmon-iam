import MiniCssExtractPlugin from'mini-css-extract-plugin' ; 
import CopyWebpackPlugin from 'copy-webpack-plugin' ; 
import { rootPath } from '@root/Dir' ; 
import { join } from 'path' ; 

const ScssRule = {
  module : {
    test : /\.(css|scss)$/i , 
    exclude : /node_modules/ , 
    use : [ 'style-loader' , MiniCssExtractPlugin.loader , 'css-loader' , 'sass-loader' ]
  } , 
  plugin : new MiniCssExtractPlugin({ filename : 'css/[name].css' }) , 
} ;

const JsRule = {
  test : /\.(js|jsx)$/i , 
  exclude : /node_modules/ , 
  use : [ 'babel-loader' ] , 
} ; 

const CopyPlugin = new CopyWebpackPlugin([
  {
    from : `${ rootPath }/images` , 
    to : 'images' , 
    ignore: [ 'spriteImg/**/*' ] , 
  }
]) ; 

const imageRule = imgsPath => {
  let arr = [] ; 
  const imageRule = {
    test : /\.(png|jpg|gif|svg)$/i , 
    include : [ join( rootPath , "images" ) , join( rootPath , "images/bg" ) ] , 
    exclude : [ join( rootPath , "images/sprite" ) ] , 
    use : [
      {
        loader : 'file-loader' , 
        options : {
          esModule : false , 
          emitFile : false , 
          useRelativePath : true , 
          name : `[path][name].[ext]` , 
          outputPath : url => `${ imgsPath }${ url.replace( 'src/client/images/' , '' )}` , 
        }
      }  
    ]
  } ; 
  arr[ arr.length ] = imageRule ; 
  return arr  ; 
}

const CopyLibPlugin = new CopyWebpackPlugin([
  {
    from : `${ rootPath }/js/lib` , 
    to : 'js/lib' , 
  }
]) ;

export { ScssRule , JsRule , CopyPlugin , imageRule, CopyLibPlugin } ; 