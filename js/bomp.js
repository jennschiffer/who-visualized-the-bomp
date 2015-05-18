$(function(){
  
  var DOM = {
    dancers: $('#dancers'),
    dancerLeft: $('.dancer.left'),
    dancerRight: $('.dancer.right'),
  };
  
  var classes = {
    marquee: 'marquee'
  }
  
  /* hot dance moves */
  
  var marquee = function(){
    DOM.dancers.addClass(classes.marquee);
  };
  
  var stopDancing = function(){
    DOM.dancers.removeClass(classes.marquee);
  };
  
  
  
  /* key events */
  
  $('body').keypress(function(e){
    
    // debug - print key code
    console.log(e.which);
    
    // choose action depending on key code
    switch ( e.which ) {
      
      case 0:
        // arrow 
        marquee();
        break;
      
      case 32:
        // space 
        stopDancing();
        break;
    }
    
  });
  
});