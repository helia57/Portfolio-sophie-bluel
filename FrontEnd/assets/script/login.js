//point d'entrée du formulaire de connexion au serveur
const form = document.querySelector("#formulaire2");
//point d'entrée et structure messages erreurs  
const popup = document.querySelector(".popup");
const error = document.createElement("p");
popup.append(error);

//  ajoute un écouteur d'événements sur le submit
form.addEventListener("submit", async (e) => {
  // Récupère la valeur de l'email et la valeur du mot de passe de l'utilisateur
   
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   // Empêche la soumission du formulaire automatiquement et le rechargement de la page en cas d'erreur
   e.preventDefault();
   // teste l'expression reguliere sur la forme du mail, si different, affiche un message d'erreur
   let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
   if (!emailRegExp.test(email)) {
      return error.innerText = "email invalide"
   // teste la longueur du mot de passe ( entre 5 et 6 ), si different, affiche un message d'erreur  
   } else if (password.length < 5 && password.length < 6 ) {
      return error.innerText = "mot de passe incorrect!"
   }
   // Empêche la soumission du formulaire automatiquement et le rechargement de la page en cas d'erreur
   e.preventDefault();
  // Envoie une requête POST à l'API pour se connecter avec les identifiants de l'utilisateur
   const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Ajoute les informations d'identification dans le corps de la requête
      body: JSON.stringify({ email, password }),
   });
  // Si la réponse est ok
   if (response.ok) {
    // Récupère les données de la réponse
      const data = await response.json();
      // Stocke le token dans le sessionStorage. Permet de garder en memoire le token même si changement de page tant que la session est ouverte.
      sessionStorage.setItem("accessToken", data.token);
      // Redirige l'utilisateur vers la page d'accueil
      window.location.href = "home_page_edit.html";
      // Si la réponse est un échec, c'est une erreur d'identifiant ou de mots de passe que l'on affiche dynamiquement 
   } else {
      const popup = document.querySelector(".popup");
      const error = document.createElement("p");
      popup.append(error);
      error.innerText = "erreur identifiant ou mot de passe";
   }
});