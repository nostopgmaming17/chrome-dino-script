(()=>{
  console.log(`Controls:
  speed up (hold) = +
  slow down (hold) = -
  toggle godmode = g
  edit config = c
  execute code = f`)
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
    switch (k.key) {
      case '+':
        hold[0] = true;
        break;
      case '-':
        hold[1] = true;
        break;
      case 'g':
        togglegodmode();
        break;
      case 'c':
        Runner.instance_.stop();
        const k = prompt(`Val name (${Object.keys(config)})`),
              v = prompt(`Val value (${config[k]})`);
        config[k] = v;
        break;
      case 'f':
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
    switch (k.key) {
      case '+':
        hold[0] = false;
        break;
      case '-':
        hold[1] = false;
        break;
    }
  });
  setInterval(()=>{
    speed(hold[0]*config.speedInc - hold[1]*config.speedInc);
  },100)
})()
