import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyA-UkWnyHYfIwDCrG1GKADGKu2bhTuz6lo",
  authDomain: "kumolab-de373.firebaseapp.com",
  databaseURL: "https://kumolab-de373-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kumolab-de373",
  storageBucket: "kumolab-de373.firebasestorage.app",
  messagingSenderId: "353148759360",
  appId: "1:353148759360:web:abd5957e9bbc58622d9ea5"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// อ่านชื่อเกมจากชื่อไฟล์
// day13.html = day13
const gameID = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");


const likeKey = "liked_" + gameID;

const likeRef = ref(db, "games/" + gameID + "/likes");

const likeBtn = document.getElementById("like-btn");
const likeCount = document.getElementById("like-count");


let likes = 0;


// โหลดจำนวน Like จาก Firebase
get(likeRef).then((snapshot) => {

    if (snapshot.exists()) {
        likes = snapshot.val();
    }

    likeCount.innerHTML = likes;

    updateButton();

});


// เปลี่ยนข้อความปุ่ม
function updateButton(){

    if(localStorage.getItem(likeKey)){

        likeBtn.innerHTML = "❤️ Liked " + likes;

    }else{

        likeBtn.innerHTML = "❤️ Like " + likes;

    }

}


// กด Like / Unlike
likeBtn.addEventListener("click",()=>{


    if(localStorage.getItem(likeKey)){

        // Unlike
        likes--;

        localStorage.removeItem(likeKey);


    }else{

        // Like
        likes++;

        localStorage.setItem(likeKey,"true");

    }


    // อัปเดตหน้าเว็บ
    likeCount.innerHTML = likes;


    // อัปเดต Firebase
    set(likeRef, likes);


    // อัปเดตปุ่ม
    updateButton();

});