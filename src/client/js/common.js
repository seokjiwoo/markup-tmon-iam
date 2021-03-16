slctFullResize = ( nodeElem , parentElem ) => {
  let crntSlctBox   = $( nodeElem ) 
  ,   $parentElem   = parentElem == undefined ? crntSlctBox.parent() : parentElem ; 
  const changeResizeSlctBox = _=> { crntSlctBox.selectmenu({ width: $parentElem.width() }); }
  
  function isSelectFunc(){
    if($.app === undefined ){ setTimeout(_=>{ isSelectFunc(); }) ; 
    } else {
      if ( !$.app.selectmenu().chkBln ) {
        setTimeout(_=>{ isSelectFunc(); }) ; 
      } else {
        $( window ).resize( _=> changeResizeSlctBox( nodeElem ) ) ; 
        changeResizeSlctBox( nodeElem ) ; 
      }
    }
  };
  isSelectFunc(); 
} ; 

window.addEventListener( "load", e => {
	// jquery ui select placeholder 기능 추가 
	$.widget( 'app.selectmenu' , $.ui.selectmenu , {
		_drawButton : function () {
			this._super() ; 
			let 
			slctOrigin    = this.element[ 0 ] 
			, selected    = this.element.find( '[selected]' ).length 
			, placeholder = slctOrigin.getAttribute( 'data-placeholder' ) 
			, btn         = this.buttonItem ; 
	
			if ( !selected && placeholder ) {
				btn.text( placeholder ).addClass( 'placeholder' ) ; 
			} 

			this.chkBln = true ; 
		}
  }); 	
  
	$( function() {
    $( 'select' ).selectmenu() ; 
    slctFullResize( ".fullSize" , $( ".fullSize" ).closest( '.input-box' ) ) ; 
  }); 	
});