let motorRunning = false;
let fanRotation = 0;
let fanInterval;
let fanDirection = 1;
const initialFanSpeed = 50;
let fanSpeed = initialFanSpeed; 

function startMotor() {
    if (!motorRunning) {
        motorRunning = true;
        fanDirection = 1; 
        fanInterval = setInterval(rotateFan, 50); 
        updateStatus("Motor is ON");
    }
}

function stopMotor() {
    if (motorRunning) {
        clearInterval(fanInterval); 
        motorRunning = false;
        updateStatus("Motor is OFF");
    }
}

function rotateFan() {
    fanRotation += fanSpeed * fanDirection; 
    document.getElementById('fanBlade').style.transform = `rotate(${fanRotation}deg)`;
}

function updateStatus(message) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;

    
    if (message === "Motor is ON") {
        statusElement.classList.add('active');
        fanSpeed = initialFanSpeed; 
    } else {
        statusElement.classList.remove('active');
    }
}


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
  import {getDatabase,onValue,set,ref,update} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.11.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAjkdY8YjJas4gT-iQooZkPMq4R_ndIbvE",
    authDomain: "metal-detector-c89b1.firebaseapp.com",
    databaseURL: "https://metal-detector-c89b1-default-rtdb.firebaseio.com",
    projectId: "metal-detector-c89b1",
    storageBucket: "metal-detector-c89b1.appspot.com",
    messagingSenderId: "88040594777",
    appId: "1:88040594777:web:fbd6ef8799ae0ccd7bc048",
    measurementId: "G-8KEC1NXXFJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const db = getDatabase(app);
  onValue(ref(db,"motorstatus"),(snapshot)=>{
    let data = snapshot.val();
    if(data == 1){
        
        console.log("on");
        $("#stat_button").prop("checked",true);
    }else if(data == 0){
        
        console.log("off");
        $("#stat_button").prop("checked",false);
    }
  })

  $("#stat_button").click(()=>{
    onValue(ref(db,"motorstatus"),(snapshot)=>{
        let data = snapshot.val();
            if(data == 0){
            let updates = {
                motorstatus:1
            }
            update(ref(db),updates)
            startMotor();
        }

    },{
        onlyOnce: true
    })
  })

  $("#stop_button").click(()=>{
    onValue(ref(db,"motorstatus"),(snapshot)=>{
        let data = snapshot.val();
            if(data == 1){
            let updates = {
                motorstatus:0
            }
            update(ref(db),updates)
            stopMotor();
        }
    },{
        onlyOnce: true
    })
  })
