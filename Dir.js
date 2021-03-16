import { sync } from 'glob' ; 
const DIR = {
  SRC :'src' , 
  CLIENT : 'client' , 
  DEST : 'dist' , 
  appRoot : __dirname , 
  chunkList : [] , 
  PORT : 8001 , 
} ; 

let { SRC : _SRC , CLIENT : _CLIENT , appRoot : _appRoot , PORT : _PORT } = DIR ,   
_imgsPath = {
  dev : `http://localhost:${ _PORT }/images/` , 
  pro : `http://sun.tmonc.net/view/994.FE/job/FE_BUILD/ws/tmon_iam/images/` , 
  
} , 
client = `${ _appRoot }/${ _SRC }/${ _CLIENT }` ; 

const PATH = {
  rootPath : `${ client }` , 
  jsList : sync( `${ client }/js/*.js` ) , 
  pageList : sync( `${ client }/page/*.html` ) , 
  subFolders : sync( `${ client }/page/!(*.*|include)` ) , 
  cssList : sync( `${ client }/scss/*.scss` ) , 
  spriteList : { root : sync( `${ client }/images/spriteImg/*.png` ) , folders : sync( `${ client }/images/spriteImg/!(*.png)` ) } , 
  imgsPath : _imgsPath , 
} ; 

Object.assign( PATH , DIR ) ; 

export default PATH ; 
export const { imgsPath , chunkList , spriteList , PORT , rootPath , jsList , pageList , subFolders , cssList , DEST , SRC , CLIENT , appRoot } = PATH ; 