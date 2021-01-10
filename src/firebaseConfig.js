import firebase from "firebase/app";

const app = firebase.initializeApp(
    (!firebase.apps.length) ? 
    {
        apiKey: "AIzaSyAK5rYSypmceebgUjjbI0r_omkxVQ0sbbE",
        authDomain: "login-66a22.firebaseapp.com",
        projectId: "login-66a22",
        storageBucket: "login-66a22.appspot.com",
        messagingSenderId: "534454537536",
        appId: "1:534454537536:web:b59d10396fda935a0c7ea5"
    } : {}
);

export default app;