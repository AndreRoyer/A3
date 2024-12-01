import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
        
    // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDTnXGroxKvfYSPw_ri3RrZ_NaBA9HtF1A",
        authDomain: "trabalho-4516f.firebaseapp.com",
        projectId: "trabalho-4516f",
        storageBucket: "trabalho-4516f.appspot.com",
        messagingSenderId: "516841474560",
        appId: "1:516841474560:web:e51bf4364c2245864766e5",
        measurementId: "G-N7NYFWX5KC"
        };

    // Inicializa o Firebase e o serviço de autenticação
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
   

export { app,auth,db };