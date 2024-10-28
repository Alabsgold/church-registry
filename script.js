// Firebase configuration (replace with your actual Firebase config values)
const firebaseConfig = {
    apiKey: "AIzaSyBpDFqX0i526FPdiD1rlNeuDi0j85IkCnc",
    authDomain: "church-registry.firebaseapp.com",
    projectId: "church-registry",
    storageBucket: "church-registry.appspot.com",
    messagingSenderId: "537077355529",
    appId: "1:537077355529:web:6faeee9d9e2492642d54d8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Register function
async function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection('users').add({
            uid: userCredential.user.uid,
            name: name,
            email: email
        });
        document.getElementById('message').innerText = 'Registration successful!';
    } catch (error) {
        document.getElementById('message').innerText = `Error: ${error.message}`;
    }
}

// Login function
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        document.getElementById('message').innerText = 'Login successful!';
        // Redirect to a dashboard or home page if needed
    } catch (error) {
        document.getElementById('message').innerText = `Error: ${error.message}`;
    }
}
