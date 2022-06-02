
// class Contractor {
//     constructor(name,role) {
//         this._name = name
//         this._role = role
//     }
//     get name() {
//         console.log(this._name)
//     }
//     get role() {
//         console.log(this._role)
//     }
//     rollCall() {
//         console.log(`My name is ${this._name} and I am a ${this._role} Developer`)
//     }
// }

// class Front extends Contractor{
//     constructor(name, role, level, payRate, hours) {
//         super(name,role)
//         this.level = level
//         this.payRate = payRate
//         this.hour = hours
        
//     }
//     speak() {
//         return this.rollCall()
//     }
// }

// class Back extends Contractor {
//     constructor(name, role, level, payRate, hours) {
//         super(name,role)
//         this.level = level
//         this.payRate = payRate
//         this.hour = hours
        
//     }
//     speak() {
//        return this.rollCall()
//     }
// }

// let Fred = new Front('Dave','Front End', 1, 50, 40)
// let Ben = new Back('Ben','Back End', 2, 70, 40)
// let Britt = new Back('Britt','Back End', 4, 90, 40)

// let crew = [Fred, Ben, Britt]

// // for (crewmember of crew) {
// //     crewmember.speak()
// // }

// for (x in Fred) {
//     console.log(x)
// }

// function stringy(size) {
//     var str='';
//     for( var i=1; i<=size; i++ ) {
//     console.log('index: ' + i)
//       str+=i%2;
//       console.log('index modulo: ' + i%2)
//       console.log('string: ' + str)
//     }
      
//     return str;
//   }
//   stringy(10)
//output should be of 101010 of size n

//
// function findUniq(arr) {
//     arr.forEach(n => {
//         console.log(arr.indexOf(n))
//         console.log(arr.lastIndexOf(n))
//     })
//     console.log('result: ' + arr.find(n => arr.indexOf(n) === arr.lastIndexOf(n)))
// }

//   findUniq([1,0,2,0,0])


//   function findAllUniq(arr) {
//     // do magic
//     let obj = {}
//     arr.forEach(num => {
//       obj[num] = obj[num] ? obj[num] + 1 : 1
//   })
//   let result = Object.keys(obj).filter( x => (obj[x] === 1))
//   console.log('result: ' + result)
//   }

//   findAllUniq([1,0,2,0,0])


const buttons = document.querySelectorAll('.add-to-cart-btn')
for (let button of buttons) {
    button.setAttribute('data-bs-toggle',"modal")
    button.setAttribute('data-bs-target',"#staticBackdrop")
}


const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 10;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("countdown").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}


function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

