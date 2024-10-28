// Firebase configuration (replace with your Firebase config)
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

window.onload = () => {
// Register function with debug logs
async function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    console.log("Register function called"); // Debug message
    console.log("Name:", name, "Email:", email, "Password:", password); // Debug inputs

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log("User created:", userCredential.user); // Debug Firebase user

        await db.collection('users').add({
            uid: userCredential.user.uid,
            name: name,
            email: email
        });
        
        document.getElementById('message').innerText = 'Registration successful!';
        console.log("Registration successful!"); // Debug success
    } catch (error) {
        document.getElementById('message').innerText = `Error: ${error.message}`;
        console.error("Registration error:", error); // Debug error
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

    // Assign the functions to buttons or event listeners as needed
    document.querySelector('#register-form button').addEventListener('click', register);
    document.querySelector('#login-form button').addEventListener('click', login);
};
