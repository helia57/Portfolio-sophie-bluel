
 // Récupération de l'élément du DOM qui accueillera les projets: <section id = "container-gallery-modale">
 let baliseDivContainerGalleryModale = document.querySelector("#container-gallery-modale");
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
  

/************************************ */
// fonction generer galerie modal     */
/************************************ */
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))
function toggleModal(e) {
  
  modalContainer.classList.toggle("active");
  baliseDivContainerGalleryModale.innerHTML ="";
  for (let i = 0; i < works.length; i++) {
    
    const projet = works[i] 
   
      //fiche projet dans une figure
  let baliseFigureModale = document.createElement("figure");
  baliseFigureModale.classList.add("works-projet-modale");
  baliseFigureModale.classList = "projets-modale";
  baliseDivContainerGalleryModale.appendChild(baliseFigureModale); 
          
      // une image
  let imageElementModale = document.createElement("img");
  imageElementModale.src = projet.imageUrl;
  imageElementModale.setAttribute = "alt", "image du rendu du projet ${works.title}";
  imageElementModale.classList = "image-modale";
  imageElementModale.innerText = projet.imageUrl ?? "image bientôt disponible";  // si pas d'image, return "image bientôt disponible"
  baliseFigureModale.append(imageElementModale);

      //une div "wrapper-container-icons"  
  const divIconsContainer = document.createElement("div");
  divIconsContainer.classList.add("wrapper-container-icons");
  baliseFigureModale.appendChild(divIconsContainer);
    // une div qui envellope icon "up-down"
  const divIconCross = document.createElement("div");
  divIconCross.classList.add("container-icons");
  divIconCross.classList.add("container-cross");
  divIconsContainer.appendChild(divIconCross);
    //et l'icon " up down"
  const iconCross = document.createElement("i");
  iconCross.classList.add("fa-solid");
  iconCross.classList.add("fa-xs");
  iconCross.classList.add("fa-up-down-left-right");
  divIconCross.appendChild(iconCross);
  // une div qui envellope icon "trash"(poubelle)
   const divIconTrash = document.createElement("div");
  divIconTrash.classList.add("container-icons");
  divIconTrash.classList.add("container-trash");
  
  divIconsContainer.appendChild(divIconTrash);
    //pour l'icon "poubelle"
  const iconTrash = document.createElement("i");
  iconTrash.classList.add("fa-solid");
  iconTrash.classList.add("fa-xs");
  iconTrash.classList.add("fa-trash-can");
  divIconTrash.appendChild(iconTrash);
    
        
      // un texte
  let textCardElementModale = document.createElement("figcaption");  
  textCardElementModale.innerText = "éditer";
  textCardElementModale.classList.add("text-miniature");
  baliseFigureModale.appendChild(textCardElementModale);
  }
  
}

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
      throw new Error(`Erreur serveur`);
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

}

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


//***********importer une image*************************** */
/*                                                         */
/*    importer un works depuis son ordinateur                                                     */
/********************************************************* */
const imageInput = document.querySelector("#imageInput");
const imageIconeImage = document.querySelector("#icone-image");
const addPhotoButton = document.querySelector("#btn-ad-photo");
const imageDisplay = document.querySelector("#imageDisplay");
const textInfoImage = document.querySelector("#text-modal2");


// Écouteur pour le bouton "Ajouter une photo"
addPhotoButton.addEventListener('click', function() {
  imageDisplay.innerHTML ="";  
  imageInput.click(); // Clique sur l'élément d'entrée de fichier
});

// Écouteur pour l'élément d'entrée de fichier
imageInput.addEventListener('change', function(event) {
    const selectedImage = event.target.files[0];
    
    if (selectedImage) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imageDisplay.src = e.target.result;
            imageDisplay.style.display = "block"; // Affiche l'image
            imageIconeImage.style.display ="none" ; // faire disparaitre l'icone image
            addPhotoButton.style.display ="none";   // faire disparaitre le bouton
            textInfoImage.style.display ="none";    // faire disparaitre le texte d'information de l'image
            imageInput.style.display ="none";       // faire disparaitre l'imput pour une seule image à la fois
            btnValiderModal2.classList.add("active")    // rendre actif le bouton de validation du formulaire 
          }




        reader.readAsDataURL(selectedImage);
          // Réinitialisation de la valeur de l'input file
        imageInput.value = ""; // Cela permet à l'utilisateur de sélectionner une nouvelle image
        imageDisplay.innerHTML ="";
    }
});
//************************************************************************
            //envoyer un nouveau "works" dans l'api via le formulaire

//************************************************************************/
const envoyerImageEtDonnees = async (imageUrl, titre, categorie) => {

// Parcourri l'option de la catégorie qui a été selectionné par le formulaire déroulant:
const selectElement = document.getElementById("categorychoix");
const selectedOption = selectElement.options[selectElement.selectedIndex];
const categoryId = selectedOption.value;

console.log(categoryId)




  const formData = new FormData();
  formData.append("image", imageUrl);
  formData.append("title", titre);
  formData.append("categoryId", categorie); // Assurez-vous que "categoryId" est correctement extrait du formulaire

  try {
      const response = await fetch("http://localhost:5678/api/works", {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: formData
      });

      if (!response.ok) {
          throw new Error("Erreur lors de l\'envoi des données");
      }

      const data = await response.json();
      console.log("Réponse de l\'API:", data);
      

  } catch (error) {
      console.error('Erreur:', error);
      // Gérer les erreurs en conséquence
  }
};

// fonction d'envoi
btnValiderModal2.addEventListener("click", async function(event) {
  event.preventDefault();
    //Point d'entrée au DOM des differents champs
  const titre = document.querySelector("#title").value;
  const categorie = document.querySelector("#categorychoix").value;
   // envoyer la requete à la condition que l'image et les champs ne soit pas vide
   if (imageDisplay.src && imageDisplay.style.display !== "none" && titre.trim() !== "" && categorie.trim() !== "") {
    await envoyerImageEtDonnees(imageDisplay.src, titre, categorie);
} else {
    console.log("Veuillez remplir tous les champs du formulaire et sélectionner une image.");
}
});