(()=>{
  console.log(`%cControls:
  speed up (hold) = +
  slow down (hold) = -
  toggle godmode = g
  edit config = c
  execute code = f
  toggle set score = v
  change score = b
  toggle set y = n
  set y = h`,'color:#ff6e19; font-size:25px');
  const keys = {
    speedup:107,
    slowdown:109,
    godmode:71,
    config:67,
    execute:70,
    togglescore:86,
    changescore:66,
    togglesetY: 78,
    changeY: 72
  }
  if (window.originalG) {
    
  } else {
    window.originalG = Runner.instance_.gameOver;
  }
  const g = window.originalG,
        isgodmode = () => {
          return Runner.instance_.gameOver == g;
        },
        togglegodmode = () => {
          if (isgodmode()) {
            Runner.instance_.gameOver = () => {};
          } else {
            Runner.instance_.gameOver = g;
          }
        }, speed = s => {
          Runner.instance_.currentSpeed += s;
        },
        stop = () => {
          Runner.instance_.stop();
          hold[0] = false;
          hold[1] = false;
        },
        hold = [false,false],
        config = {speedInc: 0.5,score:false,setY:false,y:93};
  document.addEventListener('keydown', k=> {
    switch (k.keyCode) {
      case keys.speedup:
        hold[0] = true;
        break;
      case keys.slowdown:
        hold[1] = true;
        break;
      case keys.godmode:
        togglegodmode();
        break;
      case keys.config:
        stop();
        const k = prompt(`Val name (${Object.keys(config)})`)
        if (!k) return;
        const v = prompt(`Val value (${config[k]})`);
        if (!v) return;
        config[k] = v;
        break;
      case keys.execute:
        try {
          stop();
          eval(prompt('Execute:'));
        } catch (err) {
          alert(err);
        }
        break;
      case keys.togglescore:
        config.score = !config.score;
        break;
      case keys.changescore:
        stop();
        config.scoreAmt = prompt("Score amount:");
        break;
      case keys.togglesetY:
        config.setY = !config.setY;
        break;
      case keys.changeY:
        stop();
        config.y = prompt("Y amount:");
        break;
        
    }
  });
  document.addEventListener('keyup', k=>{
    switch (k.keyCode) {
      case keys.speedup:
        hold[0] = false;
        break;
      case keys.slowdown:
        hold[1] = false;
        break;
    }
  });
  setInterval(()=>{
    speed(hold[0] || hold[1] ? hold[0]*config.speedInc - hold[1]*config.speedInc : 0);
  },100);
  setInterval(()=>{
    if (config.score) {
      Runner.instance_.distanceRan = config.scoreAmt / Runner.instance_.distanceMeter.config.COEFFICIENT;
    }
    if (config.setY) {
      Runner.instance_.tRex.yPos = config.y;
    }
  })
})()
