
import { app,auth } from "./firebase.js";
// Login de usuário
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  try {
    // Realiza o login com email e senha
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Obtém o ID token do usuário autenticado
    const idToken = await user.getIdToken();
      await fetch('/verificar-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: idToken }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      alert('Login bem-sucedido!');
    } else {
      console.error('Erro no backend:', data);
      alert('Erro ao verificar o login no servidor.');
    }
  } catch (error) {
    console.error('Erro no login:', error.message);
    alert('Erro no login. Tente novamente!');
  }
}

// Evento do botão de login
document.getElementById('loginButton').addEventListener('click', (e) => {
  e.preventDefault(); // Evita o recarregamento da página
  login(); // Chama a função de login
});



