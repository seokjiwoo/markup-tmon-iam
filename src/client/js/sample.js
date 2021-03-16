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
  }
}); 