const {
    easing,
    physics,
    spring,
    tween,
    styler,
    listen,
    value,
    transform
  } = window.popmotion;
  const { pipe, clampMax } = transform;
  
  const ballA = document.querySelector(".ballA");
  const score = document.querySelector("#score");
  const highScore = document.querySelector("#highscore");
  let cacheScore = 0;
  const ballAStyler = styler(ballA);
  const ballAY = value(0, v => ballAStyler.set("y", Math.min(0, v)));
  const ballAScale = value(1, v => {
    ballAStyler.set("scaleX", 1 + (1 - v));
    ballAStyler.set("scaleY", v);
  });
  let countAB = 0;
  let isFallingA = false;
  
  const ballABorder = value(
    {
      borderColor: "",
      borderWidth: 0
    },
    ({ borderColor, borderWidth }) =>
      ballAStyler.set({
        boxShadow: `0 0 0 ${borderWidth}px ${borderColor}`
      })
  );
  
  const checkABounce = () => {
    if (!isFallingA || ballAY.get() < 0) return;
  
    isFallingA = false;
    const impactVelocity = ballAY.getVelocity();
    const compression = spring({
      to: 1,
      from: 1,
      velocity: -impactVelocity * 0.01,
      stiffness: 800
    })
      .pipe(s => {
        if (s >= 1) {
          s = 1;
          compression.stop();
  
          if (impactVelocity > 20) {
            isFallingA = true;
            gravityA.set(0).setVelocity(-impactVelocity * 0.5);
          }
        }
        return s;
      })
      .start(ballAScale);
  };
  
  function calculateScore() {
    if (cacheScore < countAB) {
      cacheScore = countAB;
    }
    countAB = 0;
    score.innerHTML = "Your Current Game Score is: " + countAB;
    highScore.innerHTML = "Your Highest Score is: " + cacheScore;
  }
  
  const checkAFail = () => {
    if (
      ballAY.get() >= 0 &&
      ballAY.getVelocity() !== 0 &&
      ballA.innerHTML !== "Tap"
    ) {
      calculateScore();
      tween({
        from: { borderWidth: 0, borderColor: "rgb(255, 28, 104, 1)" },
        to: { borderWidth: 30, borderColor: "rgb(255, 28, 104, 0)" }
      }).start(ballABorder);
  
      ballA.innerHTML = "Tap";
    }
  };
  
  const gravityA = physics({
    acceleration: 1000,
    restSpeed: false
  }).start(v => {
    ballAY.update(v);
    checkABounce(v);
    checkAFail(v);
  });
  
  listen(ballA, "mousedown touchstart").start(e => {
    e.preventDefault();
    countAB++;
    ballA.innerHTML = countAB;
    score.innerHTML = "Your Current Game Score is: " + countAB;
    isFallingA = true;
    ballAScale.stop();
    ballAScale.update(1);
  
    gravityA.set(Math.min(0, ballAY.get())).setVelocity(-1200);
  
    tween({
      from: { borderWidth: 0, borderColor: "rgb(20, 215, 144, 1)" },
      to: { borderWidth: 30, borderColor: "rgb(20, 215, 144, 0)" }
    }).start(ballABorder);
  });
  
  const ballB = document.querySelector(".ballB");
  const ballBStyler = styler(ballB);
  const ballBY = value(0, v => ballBStyler.set("y", Math.min(0, v)));
  const ballBScale = value(1, v => {
    ballBStyler.set("scaleX", 1 + (1 - v));
    ballBStyler.set("scaleY", v);
  });
  //let countB = 0;
  let isFallingB = false;
  
  const ballBBorder = value(
    {
      borderColor: "",
      borderWidth: 0
    },
    ({ borderColor, borderWidth }) =>
      ballBStyler.set({
        boxShadow: `0 0 0 ${borderWidth}px ${borderColor}`
      })
  );
  
  const checkBBounce = () => {
    if (!isFallingB || ballBY.get() < 0) return;
  
    isFallingB = false;
    const impactVelocity = ballBY.getVelocity();
    const compression = spring({
      to: 1,
      from: 1,
      velocity: -impactVelocity * 0.01,
      stiffness: 800
    })
      .pipe(s => {
        if (s >= 1) {
          s = 1;
          compression.stop();
  
          if (impactVelocity > 20) {
            isFallingB = true;
            gravityB.set(0).setVelocity(-impactVelocity * 0.5);
          }
        }
        return s;
      })
      .start(ballBScale);
  };
  
  const checkBFail = () => {
    if (
      ballBY.get() >= 0 &&
      ballBY.getVelocity() !== 0 &&
      ballB.innerHTML !== "Tap"
    ) {
      calculateScore();
      tween({
        from: { borderWidth: 0, borderColor: "rgb(255, 28, 104, 1)" },
        to: { borderWidth: 30, borderColor: "rgb(255, 28, 104, 0)" }
      }).start(ballBBorder);
  
      ballB.innerHTML = "Tap";
    }
  };
  
  const gravityB = physics({
    acceleration: 1000,
    restSpeed: false
  }).start(v => {
    ballBY.update(v);
    checkBBounce(v);
    checkBFail(v);
  });
  
  listen(ballB, "mousedown touchstart").start(e => {
    e.preventDefault();
    countAB++;
    ballB.innerHTML = countAB;
    score.innerHTML = "Your Current Game Score is: " + countAB;
    isFallingB = true;
    ballAScale.stop();
    ballAScale.update(1);
  
    gravityB.set(Math.min(0, ballBY.get())).setVelocity(-1200);
  
    tween({
      from: { borderWidth: 0, borderColor: "rgb(20, 215, 144, 1)" },
      to: { borderWidth: 30, borderColor: "rgb(20, 215, 144, 0)" }
    }).start(ballBBorder);
  });
  