import WebpackSpritesmith from 'webpack-spritesmith' ; 
import { join } from 'path' ; 
import { sync as delSync } from 'del' ; 
import { SRC as _SRC , CLIENT , spriteList } from '@root/Dir' ; 

const MakeSpritePlugin = imgsPath => {
  let arr = []  
  ,   SRC = `${ _SRC }/${ CLIENT }`
  ,   spritePath = `${ imgsPath }sprite` 
  ,   { root : spriteRoot , folders : spriteFolders } = spriteList ; 

  const spriteTemplateFunction = data => {
    let fdName = ( arr => arr[ arr.length - 2 ] )( data.sprites[0].source_image.split( '\\' ) ) 
    ,   includeCss = `.spBg { background-image: url(${ data.sprites[0].image }); }` 
    ,   perSprite = null ;
    
    perSprite = data.sprites.map( function ( sprite ) {
      let { name , width , height , offset_x , offset_y } = sprite ; 
      return `.sp-${ fdName }-${ name } { 
        @extend .spBg; 
        width: ${ width }px; 
        height: ${ height }px; 
        background-position: ${ offset_x }px ${ offset_y }px; 
      }`.replace( /\n\s*/g , '' ) ; 
    }).join('\n'); 

    return `${ includeCss }\n${ perSprite }` ; 
  } ; 

  const makeSprite = ( folderName ) => {
    let spriteName = null ; 
    folderName = ( !folderName || folderName == '' ) ? '' : folderName.split( '/' ).pop() ; 
    spriteName = folderName == '' ? 'sprite' : folderName ; 

    return new WebpackSpritesmith({
      src : {
        cwd : join( SRC , 'images' , 'spriteImg' , folderName ) , 
        glob : '*.png' , 
      } , 
      target : {
        image : join( SRC , `images/sprite/${ spriteName }.png` ) , 
        css : [[
          join( SRC , `scss/sprite/${ spriteName }-set.scss` ) , 
          { format : 'function_based_template' }
        ]]
      } , 
      customTemplates : { 'function_based_template' : spriteTemplateFunction } , 
      apiOptions: { cssImageRef: `"${ spritePath }/${ spriteName }.png?v=[hash:8]"` } , 
      spritesmithOptions : { padding: 10 }
    }) ; 
  }

  delSync([ `${ SRC }/scss/sprite/` , `${ SRC }/scss/images/sprite/` ]) ; 
  if ( spriteRoot.length !== 0 ) arr[ arr.length ] = makeSprite( '' , spritePath ) ; 
  if ( spriteFolders.length !== 0 ) { 
    spriteFolders.forEach( name => {
      arr[ arr.length ] = makeSprite( name , spritePath ) ; 
    }) ; 
  }
  return arr ; 
} ; 
export default MakeSpritePlugin ; 