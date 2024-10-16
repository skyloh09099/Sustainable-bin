// Import the functions you need from the SDKs you need
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} 
from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import {getFirestore, setDoc, doc, getDoc, getDocs, collection} 
from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB9M81AhHyIy6gs1GBBZBUMv-y5SrThWAA",
    authDomain: "susbin-420d2.firebaseapp.com",
    databaseURL: "https://susbin-420d2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "susbin-420d2",
    storageBucket: "susbin-420d2.appspot.com",
    messagingSenderId: "896697035981",
    appId: "1:896697035981:web:f2f4168c3eb242361c0d84"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('roles').value;

    try {
        if (role === "user") {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            showMessage('Login is successful', 'signInMessage');
            localStorage.setItem('loggedInUserId', user.uid);
            alert("Login Successfully!");
            window.location.href = 'user/user.html';  // Redirect to user page
        } 
        else if (role === "admin") {
            const adminDocRef = collection(db, "admin");  // Check in 'admin' collection by email
            const adminDoc = await getDocs(adminDocRef);

            adminDoc.forEach(docSnap =>{
            const docData = docSnap.data();
            console.log(`ID: ${docSnap.email}, Point: ${docData.name}, Code: ${docData.password}`); // Debug: log document ID
            
            if (docData.email == email && docData.password == password) {
                // alert('Admin login is successful', 'signInMessage');
                localStorage.setItem('loggedInAdminId', docSnap.id);
                alert("Login Successfully!");
                window.location.href = 'admin/admin.html';
            } else {
                showMessage('Incorrect Admin Password OR Password', 'signInMessage');
            }
            });
        }
    } 
    catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Incorrect Email or Password!', 'signInMessage');
        } else {
            console.log(errorCode);
            showMessage('Invalid Email or Password!', 'signInMessage');
        }
    }
});
