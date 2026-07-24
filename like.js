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


const gameID = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");


const likeKey = "liked_" + gameID;
const likeRef = ref(db, "games/" + gameID + "/likes");

const likeBtn = document.getElementById("like-btn");
const likeCount = document.getElementById("like-count");


let likes = 0;
let loaded = false; // กันกดก่อนโหลดเสร็จ


// โหลดจำนวน Like
get(likeRef).then((snapshot) => {

    if (snapshot.exists()) {
        likes = snapshot.val();
    }

    likeCount.innerHTML = likes;

    loaded = true; // โหลดเสร็จแล้ว

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


    // กันกดตอน Firebase ยังโหลดไม่เสร็จ
    if(!loaded){
        return;
    }


    if(localStorage.getItem(likeKey)){

        // Unlike
        likes = Math.max(likes - 1, 0);

        localStorage.removeItem(likeKey);


    }else{

        // Like
        likes++;

        localStorage.setItem(likeKey,"true");

    }


    likeCount.innerHTML = likes;


    set(likeRef, likes);


    updateButton();

});