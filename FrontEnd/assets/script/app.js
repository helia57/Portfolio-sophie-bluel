
 // Récupération de l'élément du DOM qui accueillera les projets: <section id = "container-gallery-modale">
 const baliseDivContainerGalleryModale = document.querySelector("#container-gallery-modale");
 // affichage de la modale 1
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
  // affichage de la modale 2
const modal2Container2 = document.querySelector(".modal2-container2");
const modal2Triggers2 = document.querySelectorAll(".modal2-trigger2");
// bouton pour fermer la modale1
const btnAjoutPhotoModal1 = document.querySelector(".btn-ajout-photos");
// bouton pour retour/page precente vers modal1: afficher sur modale2
const btnNavigationArriere = document.querySelector("#reviens-arriere-page");
// bouton de validation modal 2 = inactif de base et activé par la suite
const btnValiderModal2 = document.querySelector("#btn-valider2");
btnValiderModal2.classList.remove("active");
// bouton pour fermer la modale2
const btnFermerModale2= document.querySelector("#trigger2");
const fermerModale2Overlay = document.querySelector(".overlay2");
const token = sessionStorage.accessToken;
console.log(token)

// affichage de la gestion des erreurs(modal2)
const popup1 = document.querySelector("#popup1");
const error1 = document.createElement("p");
popup1.append(error1);

// affichage de la gestion des erreurs(modal2)
const popup2 = document.querySelector("#popup2");
const error = document.createElement("p");
popup2.append(error);



//****************************************************** */
/*                                                        */
/*                 logout et token                        */
/*                                                        */
/******************************************************** */

// Point d'entrée au DOM du bouton logout
const BtnLogout = document.querySelector("#logout");
const BtnPublierChangement = document.querySelector("#publier-changements");

function loginRetirer() {
// ecoute du bouton du bouton "logout" et suppression du token. 
  BtnLogout.addEventListener("click", function() {
    sessionStorage.removeItem("accessToken");
    window.location.href = "home_page.html";
    return error.innerText ="vous avez été déconnecter"
  });
};
// appel de la fonction loginRetirer
loginRetirer();
// ecoute du bouton du bouton "logout" et suppression du token. 
function publierChangement() {
  BtnPublierChangement.addEventListener("click", function() {
    sessionStorage.removeItem("accessToken");
    window.location.href = "home_page.html";
  })
};
// appel de la fonction loginRetirer
publierChangement();


/************************************ */
// structure de la galerie modal     */
/************************************ */
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))
function toggleModal(e) {
  
  modalContainer.classList.toggle("active");
  
  baliseDivContainerGalleryModale.innerHTML =""; 
  for (let i = 0; i < works.length; i++) {
    
    const work = works[i] 
   
      //fiche projet dans une figure
  const baliseFigureModale = document.createElement("figure");
  baliseFigureModale.dataset.id = work.id;
  baliseFigureModale.classList.add("works-projet-modale");
  baliseFigureModale.classList = "projets-modale";
  baliseDivContainerGalleryModale.appendChild(baliseFigureModale); 
          
      // une image
  let imageElementModale = document.createElement("img");
  imageElementModale.src = work.imageUrl;
  imageElementModale.setAttribute = "alt", "image du rendu du projet ${works.title}";
  imageElementModale.classList = "image-modale";
  imageElementModale.innerText = work.imageUrl ?? "image bientôt disponible";  // si pas d'image, return "image bientôt disponible"
  baliseFigureModale.append(imageElementModale);

    // une div qui envellope icon "up-down"
  const divIconCross = document.createElement("span");
  divIconCross.classList.add("container-cross"); 
  baliseFigureModale.appendChild(divIconCross);
    //et l'icon " up down"
  const iconCross = document.createElement("i");
  iconCross.classList.add("fa-solid");
  
  iconCross.classList.add("fa-up-down-left-right");
  divIconCross.appendChild(iconCross);
  
  //un bouton avec une icone "poubelle"
  const btnDelete = document.createElement("button");
  btnDelete.dataset.id = work.id;
  btnDelete.innerHTML =  `<i class="fa-solid fa-trash-can"></i>`;
  btnDelete.classList.add("delete-button");
  baliseFigureModale.appendChild(btnDelete);

      // un texte
  let textCardElementModale = document.createElement("figcaption");  
  textCardElementModale.innerText = "éditer";
  textCardElementModale.classList.add("text-miniature");
  baliseFigureModale.appendChild(textCardElementModale);

  // ajout d'un event pour la suppression d'un projet
  btnDelete.addEventListener("click", async (e) => {
    e.preventDefault ()
    const figure = e.target.closest("figure"); // cherche l'élément HTML le plus proche dans la hiérarchie "figure"
    const id = figure.dataset.id;             // extrait l'id du bouton choisi pour suppression
    const effacerCode = supprimerProjet(id); // le resultat de la fonction "supprimerProjet" récupere l'Id selectionné, qui est stocké dans la variable effacercode
    switch (effacerCode) {                          // selon les cas, afficher un message 
        case 204:
          figure.remove(id);                                                            
          return error1.innerText ="Votre image a été supprimée.";
          break
        }
        
        
});

//**************************************************** */
// fonction appel fetch "get" pour générer la galerie  */
/*******************************************************/
async function genererGetWorks () { 
  const wrapper = document.querySelector("#container-gallery-modale");
  const loader = document.createElement("p");
  loader.innertext = "chargement..." 
  wrapper.append(loader);    
  try {    
      const response = await fetch("http://localhost:5678/api/works")
      
          method= "get",
          headers= {
              "Accept" : 'application/json',
              "content-type":'application/json'
          }
         
  if (!response.ok) {
      throw new Error("Erreur serveur");
  }
  
      works = await response.json()
      loader.remove ()
      wrapper.append(toggleModal(works));
          
      
  } catch (erreur) {
      loader.innertext = ("impossible de charger le contenu")
      loader.style.color = "red"
      return
  }
  return works

}}




//*********modale 2 ****************/
/*  changement de modal1-->modal2  */                             
/********************************* */

btnAjoutPhotoModal1.addEventListener("click", function (e) {
    
  // Pour fermer la modale1, on supprime la classe "active" sur tout les element "triggers"
    modalContainer.classList.remove("active"),
    modalTriggers.forEach(trigger => trigger.classList.remove("active")),

  // Pour ouvrir la modale2, on ajoute la classe "active" sur tout les element "triggers"
    modal2Container2.classList.add("active"),
    fermerModale2Overlay.classList.add("active")
}); 
  // on active les boutons de fermeture pour la modal2: sur la croix
btnFermerModale2.addEventListener("click", function (e) {
  modal2Container2.classList.remove("active")

});
// on active les boutons de fermeture pour la modal2: en dehors de la modal
fermerModale2Overlay.addEventListener("click", function (e) {
  modal2Container2.classList.remove("active")
});

// quand on clic sur le bouton retour en arriere,
btnNavigationArriere.addEventListener("click", function (e) {
  // on ferme la modale 2
  modal2Container2.classList.remove("active"),
  fermerModale2Overlay.classList.remove("active"),
  btnFermerModale2.classList.remove("active"),
  //on ouvre la modal1
  modalContainer.classList.add("active"),
  modalTriggers.forEach(trigger => trigger.classList.add("active"))
});
btnValiderModal2.classList.remove("active")

//***********importer une image*************************** */
/*                                                         */
/*    importer une image depuis son ordinateur                                                     
/********************************************************* */
const imageInput = document.querySelector("#imageInput");
const imageIconeImage = document.querySelector("#icone-image");
const addPhotoButton = document.querySelector("#btn-ad-photo");
let imageDisplay = document.querySelector("#imageDisplay");
const textInfoImage = document.querySelector("#text-modal2");

let selectedFile = ""; // stock l'url de l'image

// Écouteur pour le bouton "Ajouter une photo"
addPhotoButton.addEventListener('click', function() {
  imageInput.click(); // Clique sur l'élément d'entrée de fichier
});

// Écouteur de l'évènement de l'imput lorsqu'il change lorsque le fichier image est chargé
imageInput.addEventListener('change', function(event) {
  selectedFile = event.target.files[0]; // Stocke le fichier dans la variable "selectedFile"
    // verifie qu'il y a bien un fichier
    // appel de la fonction veliderData qui contient "selectedFile"
    validerData(selectedFile);

    if (selectedFile) {
        const reader = new FileReader();      // création d'un objet filereader qui permetttra la lecture du fichier

    
        
        reader.onload = function(e) {         // lorsque la fonction est chargé, lis le fichier
            imageDisplay.src = e.target.result;  // definit la source de l'image dans la balise <img> (lecteurs d'ecrans)
            imageDisplay.style.display = "block"; // Affiche l'image pour la rendre visible
            imageIconeImage.style.display ="none" ; // faire disparaitre l'icone image
            addPhotoButton.style.display ="none";   // faire disparaitre le bouton
            textInfoImage.style.display ="none";    // faire disparaitre le texte d'information de l'image
                 // faire disparaitre l'imput pour une seule image à la fois
            btnValiderModal2.classList.add("active")    // rendre actif le bouton de validation du formulaire 
                                   
            

          }
        reader.readAsDataURL(selectedFile); 
        
          // Réinitialisation de la valeur de l'input file au rechargement de la page
        imageInput.value = ""; // Cela permet à l'utilisateur de sélectionner une nouvelle image
      }
     
});

//*********************************************************** */
//        suppression d'un projet (works)                             
//************************************************************ */

async function supprimerProjet(id) {
  try {
      const response = await fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
          
          // Ajoute l'en-tête d'autorisation avec le jeton d'accès
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
  });


        console.log(response)	
      if (response.ok) {
        // recharge la ressource depuis l'URL actuelle.

        location.reload()
        return error1.innerText =("Projet supprimé avec succès.");
        
        // gestion des erreurs.
      } else {	
        return error1.innerText =("Erreur lors de la suppression.");	
      }	


      // gestion des erreurs Try
  } catch (error) {	
      console.error("Erreur:", error);	
      return error1.innerText = " problème de connexion API.";	
}};	
  

//************************************************************************
            //envoyer un nouveau "works" dans l'api via le formulaire

//************************************************************************/
const btnValiderNew = document.querySelector("#btn-valider2");
let titre = document.querySelector("#titleNewWorks");
let category ; 
let imageFile ;
const tailleMax = 4 * 1024 * 1024; // taille max à 4 Mo
const tailleImage = selectedFile.size;

function validerData(selectedFile) {
    btnValiderNew.addEventListener("click", async function(event) {
        event.preventDefault();

        // Parcourir l'option de la catégorie qui a été sélectionnée par le formulaire déroulant:
        const selectElement = document.querySelector("#categorychoix");
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        category = selectedOption.value;
                
        //Point d'entrée au DOM des differents champs
        titre = document.querySelector("#titleNewWorks").value;
             
        imageFile = selectedFile;
        if  (imageFile === 0) {
            console.log("Le fichier est vide.");
          return 
         }
           
        // Vérifiez que la taille du fichier image est inferieur à la taille Max sinon renvoie une erreur
        if (tailleImage  > tailleMax) {
          return error.innerText = "dépasse la taille maximale de 4 Mo.";
          return;
        }
         // Appel de la fonction d'envoi
          await envoyerImageEtDonnees(imageFile, titre, category);
    });

}

// Appelez la fonction validerData pour la configurer
validerData();

const envoyerImageEtDonnees = async (imageFile, titre, category) => {
  

  // Vérifier que les champs ne sont pas vides
  if (titre.trim() !== "" && category !== "") {
      const formData = new FormData();
  
      // creation du form Data
      
      formData.append("title" , titre);
      formData.append("image", imageFile);
      formData.append("category", category);

      try {
        
       let response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
          // Ajoute l'en-tête d'autorisation avec le jeton d'accès
          Authorization: `Bearer ${token}`,
          },
          // Ajoute les données du formulaire à la requête
          body: formData,
        });
        
          if (!response.ok) {
            return error.innerText ="Erreur lors de l'envoi des données";
          }

          const data = await response.json();
          location.reload()
          return setTimeout(() => {
            error.innerText ="Votre nouveau projet a été ajouté avec succes"
          },"1000");
         
          // Gére les erreurs
      } catch (error) {
        return error.innerText =("Erreur:", error);
          
           
      }
  } else {
    error.innerText = ("Veuillez remplir tous les champs du formulaire et/ou sélectionner une image.");
  }
}};

