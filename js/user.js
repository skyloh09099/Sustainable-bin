import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyB9M81AhHyIy6gs1GBBZBUMv-y5SrThWAA",
    authDomain: "susbin-420d2.firebaseapp.com",
    databaseURL: "https://susbin-420d2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "susbin-420d2",
    storageBucket: "susbin-420d2.appspot.com",
    messagingSenderId: "896697035981",
    appId: "1:896697035981:web:f2f4168c3eb242361c0d84"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                // fullName & email = COLUMN NAME of db
                document.getElementById('loggedUserFName').innerText=userData.fullName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                // console.log("ID: "+loggedInUserId);
            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

const logoutButton=document.getElementById('logout');

logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='../index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
})


