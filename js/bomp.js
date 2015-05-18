$(function(){
  
  var DOM = {
    dancers: $('#dancers'),
    dancerLeft: $('.dancer.left'),
    dancerRight: $('.dancer.right'),
  };
  
  var classes = {
    marquee: 'marquee',
    bendArms: 'bend-arms',
    bendLegs: 'bend-legs',
    sideKick: 'side-kick',
    bopHead: 'bop-head'
  }
  
  /* hot dance moves */
  
  var marquee = function(){
    DOM.dancers.toggleClass(classes.marquee);
  };
  
  var bopHead = function(){
    DOM.dancers.toggleClass(classes.bopHead);
  }
    
  var bendArms = function(){
    DOM.dancers.toggleClass(classes.bendArms);
  };
  
  var bendLegs = function(){
    // make sure legs are stationary first
    DOM.dancers.removeClass(classes.sideKick).toggleClass(classes.bendLegs);
  };
  
  var stopDancing = function(){
    // remove all classes
    DOM.dancers.attr('class', null);
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
        
      case 106:
        // j
        bopHead();
        break;
        
      case 101:
        // e
        bendArms();
        break;
        
      case 110:
        // n
        bendLegs();
        break;
      
      case 32:
        // space 
        stopDancing();
        break;
    }
    
  });
  
});