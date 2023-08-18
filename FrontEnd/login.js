


/***************************************************************************************
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} email 
 *//************************************************************************************/
function gererFormulaire(email, password) {
    try {
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
    
        let balisePassword = document.getElementById("password")
        let password = balisePassword.value
        validerPassword(password)
        afficherMessageErreur("connexion réussi, veuillez patienter...")
        seLoguer(email, password)

    } catch(erreur) {
        afficherMessageErreur("erreur.message")
    }
    
    }
/**********************************************************************
 * Cette fonction prend un password en paramètre et valide qu'il est au bon format
 * ici : quatre caractères au minimum
 * @param {string} password
 * @throws {Error}
 *//***************************************************************** */
 function validerPassword(password) {
    if (password.length < 4) {
        throw new Error("Le nom est trop court. ")
    }
    
    }
/************************************************************************************
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 //**********************************************************************************/

    function validerEmail(email) {
        let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
        if (!emailRegExp.test(email)) {
            throw new Error("L'email n'est pas valide.")
        }
    console.log(email.value)    
    }
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
            balisepErreurMessage = document.createElement("p")
            balisepErreurMessage.id = "erreurMessage"
            
            popup.append(balisepErreurMessage)
        }
    
    balisepErreurMessage.innerText = message
    }
    /****************************************************************
    * Cette fonction génère le login au bon format  et appel fetch 
    *  @param {string} email 
    *  @param {string} password 
    *//***************************************************************** */ 

function seLoguer(email, password) {
        
    let seConnecter= document.getElementById("bouton-envoyer")
    // Gestion de l'événement click sur le bouton "valider"
    let form = document.querySelector("formulaire2")
    form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    
    let user = {
        email: email.value,
        password: password.value
    }  
    const chargeUtile = JSON.stringify(user)      // creation de la charge utile au format JSON
       
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: '{"content-type":"application/json"}',
        body: chargeUtile

    .then(response => response.json())
    .then(result => { 
        console.log(result);
        // Si couple email/mdp incorrect
        if (result.error || result.message) {
            throw new Error("une erreur est survenue, veuillez vous reconnecter.")  

        // Si couple email/mdp correct
        } else if (result.token) {
            localStorage.setItem("token", response.token);
            window.location.href = "index.html";
        }
    
    })
    })
    })
};
