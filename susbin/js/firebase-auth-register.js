// Import the functions you need from the SDKs you need
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} 
from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import{getFirestore, setDoc, doc} 
from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

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

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const fullName=document.getElementById('fName').value;
    const point = 0;
    // const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password, point)
    .then((userCredential)=>{    
        const user=userCredential.user;
        const userData={
            email: email,
            fullName: fullName,
            // lastName: lastName,
            password: password,
            point: point
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);

        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='login.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        } 
        else if (errorCode === 'auth/invalid-email') {
            showMessage('Invalid Email Format !!!', 'signUpMessage');
        } 
        else if (errorCode === 'auth/weak-password') {
            showMessage('Password should be at least 6 characters !!!', 'signUpMessage');
        }
        else {
            showMessage('Password should at least 6 character', 'signUpMessage');
        }
    })
});



