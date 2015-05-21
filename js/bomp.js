$(function(){
  
  var DOM = {
    decor: $('#decor'),
    dancers: $('#dancers'),
    dancerLeft: $('.dancer.left'),
    dancerRight: $('.dancer.right'),
  };
  
  var classes = {
    marquee: 'marquee',
    bendArms: 'bend-arms',
    bendLegs: 'bend-legs',
    sideKick: 'side-kick',
    bopHead: 'bop-head',
    fun: 'fun'
  };
  
  var playSound, playNoise, dataArray, bufferLength, count;
  var midiBuffer = null;
  var noiseBuffer = null;
  var audioURL = 'assets/aha.mp3';
  var hornURL = 'assets/airhorn.mp3';
  var damnURL = 'assets/damn.mp3';
  var smoothURL = 'assets/rob.mp3';
  var audioTime = 0;
  var audioOffset = 0;
  var audioPlaying = false;
  var currentMoves = '';
  
  /* hot dance moves */
  
  var marquee = function(){
    DOM.dancers.toggleClass(classes.marquee);
  };
  
  var bopHead = function(){
    DOM.dancers.toggleClass(classes.bopHead);
  };
    
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
    DOM.decor.attr('class', null);
  };
  
  var galaxyCat = function(){
    DOM.decor.toggleClass(classes.fun);
  };
  
  var airHorn = function(){
    playNoise = noiseCtx.createBufferSource();
    playNoise.buffer = airhornBuffer;
    playNoise.connect(noiseCtx.destination);
    playNoise.start(0);

  };
  
  var damnSon = function(){
    playNoise = noiseCtx.createBufferSource();
    playNoise.buffer = damnBuffer;
    playNoise.connect(noiseCtx.destination);
    playNoise.start(0);
  };
  
  var smooth = function(){
    playNoise = noiseCtx.createBufferSource();
    playNoise.buffer = smoothBuffer;
    playNoise.connect(noiseCtx.destination);
    playNoise.start(0);
  }
  
  
  /* web audio fun */
  
  var loadAudio = function(url, ctx, sound) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
  
    request.onload = function() {
      ctx.decodeAudioData(request.response, function(buffer) {
        if ( sound == 'song' ) {
          midiBuffer = buffer;
        }
        else if ( sound == 'airhorn' ) {
            airhornBuffer = buffer;
          }
          else if ( sound == 'smooth' ) {
              smoothBuffer = buffer;
            }
            else {
              damnBuffer = buffer;
            }
      });
      
      // debug - load audio
      // console.log('audio loaded');
    };
    request.send();
  };

  var playSong = function(){
    audioTime = audioCtx.currentTime;
    playSound = audioCtx.createBufferSource();
    playSound.buffer = midiBuffer;
    playSound.connect(audioCtx.destination);
    playSound.start(0, audioOffset);
        
    DOM.dancers.attr('class', currentMoves);
  };
  
  var pauseSong = function(){
    playSound.stop();
    audioOffset += audioCtx.currentTime - audioTime;
    currentMoves = DOM.dancers.attr('class');
  };
  
  // web audio api turn upppp
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioCtx = new AudioContext();
  var noiseCtx = new AudioContext();
  
  loadAudio(audioURL, audioCtx, 'song');
  loadAudio(hornURL, noiseCtx, 'airhorn');
  loadAudio(damnURL, noiseCtx, 'damn son');
  loadAudio(smoothURL, noiseCtx, 'smooth');
  
  
  
  /* key events */
  
  $('body').keypress(function(e){
    
    // debug - print key code
    // console.log(e.which);
    
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
        
      case 102:
        // f
        if (!audioPlaying) { 
          audioPlaying = true;
          playSong();
        }
        break;
        
      case 114:
        // r
        if (audioPlaying) {
          audioPlaying = false;
          pauseSong();
          stopDancing();
        }
        break;
        
      case 115:
        // s
        if (audioPlaying) {
          galaxyCat();
        }
        break;
        
      case 99:
        // c
        if (audioPlaying) {
          airHorn();
        }
        break;
        
      case 104:
        // h
        if (audioPlaying) {
          damnSon();
        }
        break;
        
      case 105:
        // i
        if (audioPlaying) {
          smooth();
        }
        break;
    }
    
  });

});