(()=>{
  console.log(`Controls:
  speed up (hold) = +
  slow down (hold) = -
  toggle godmode = g
  edit config = c
  execute code = f`)
  const keys = {
    speedup:107,
    slowdown:109,
    godmode:71,
    config:67,
    execute:70
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
        hold = [false,false],
        config = {speedInc: 0.5};
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
        Runner.instance_.stop();
        const k = prompt(`Val name (${Object.keys(config)})`),
              v = prompt(`Val value (${config[k]})`);
        config[k] = v;
        break;
      case keys.execute:
        try {
          Runner.instance_.stop();
          eval(prompt('Execute:'));
        } catch (err) {
          alert(err);
        }
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
    speed(hold[0]*config.speedInc - hold[1]*config.speedInc);
  },100)
})()
