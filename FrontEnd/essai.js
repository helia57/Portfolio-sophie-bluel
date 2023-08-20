

/***************************************************************************************
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} email 
 *//************************************************************************************/
 function gererFormulaire(email, password) {
    try {
        pErreurMessage.innerHTML = "hello word";
        // Gestion de l'événement click sur le bouton "valider"
        let form = document.querySelector("formulaire2")
        form.addEventListener("submit", (event) => {
        event.preventDefault()
                      
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        console.log(email.value)
    
        let balisePassword = document.getElementById("password")
        let password = balisePassword.value
        validerPassword(password)
        seLoguer(email, password)
       
        })
    } catch(erreur) {
        afficherMessageErreur(erreur.message)
    }
    
    }
    gererFormulaire
/**********************************************************************
 * Cette fonction prend un password en paramètre et valide qu'il est au bon format
 * ici : quatre caractères au minimum
 * @param {string} password
 * @throws {Error}
 *//***************************************************************** */
 
 function validerPassword(password) {
    let imput = document.querySelector("password")
        form.addEventListener("click", (event) => {
        event.preventDefault()
    if (password.length > 4) {
        return true
       
    } else { throw new Error("Le nom est trop court. ")
    }
    });
    
    validerPassword;
    console.log(validerPassword.value)
/************************************************************************************
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. Renvoir true ou false
 * @param {string} email 
 * @throws {Error}
 //**********************************************************************************/

    function validerEmail(email) {
        let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
        if (emailRegExp.test(email)) {
           return true
        }
        throw new Error("L'email n'est pas valide.")
    }
    validerEmail
    console.log(email.value)
/**************************************************************
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 *//****************************************************** */
    function afficherMessageErreur(message) {
    
    let pErreurMessage = document.querySelector(".popup")

        if (!pErreurMessage) {
            let popup = document.querySelector(".popup")
            pErreurMessage = document.createElement("p")
            pErreurMessage.id = "errorMessage"
            popup.append(pErreurMessage)
        }
    
        pErreurMessage.innerText = message
    }
    afficherMessageErreur;
    /****************************************************************
    * Cette fonction génère le login au bon format  et appel fetch 
    *  @param {string} email 
    *  @param {string} password 
    *//***************************************************************** */ 

function seLoguer(email, password) {
    
         
    const form = {
        email: document.querySelector("#signin-email"),
        password: document.querySelector("#signin-password"),
        submit: document.querySelector("#bouton-envoyer"),
        
    };
    console.log(Form)
    const  user = {
        email: email.value,
        password: password.value
     
    }; 
      
      let button = form.submit.addEventListener("click", (e) => {
        e.preventDefault();
        const login = "https://localhost:5678/api/users/login";
      
        fetch (login, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // code here //
            if (data.error) {
              alert("Password ou email invalide"); /* error message*/
           // Si couple email/mdp correct
            } else if (result.token) {
                localStorage.setItem("token", result.token);
                window.location.href = "index.html";
            }
          })
          .catch((err) => {
            console.log(err);
          });
    });
}
 }    
       