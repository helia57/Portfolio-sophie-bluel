
 // Récupération de l'élément du DOM qui accueillera les projets: <section id = "container-gallery-modale">
 let baliseDivContainerGalleryModale = document.querySelector("#container-gallery-modale");
 // affichage de la modale 1
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

const modal2Container2 = document.querySelector(".modal2-container2");
const modal2Triggers2 = document.querySelectorAll(".modal2-trigger2");
const btnAjoutPhotoModal1 = document.querySelector(".btn-ajout-photos");
// bouton pour fermer la modale2
const btnFermerModale2= document.querySelector("#trigger2");
const fermerModale2Overlay = document.querySelector(".overlay2");
const modal3Container3 = document.querySelector(".modal3-container3");
const modal3Triggers3 = document.querySelectorAll(".modal3-trigger3");

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
  imageElementModale.setAttribut = "alt", "image du rendu du projet ${works.title}";
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
/*                                 */
/********************************* */

btnAjoutPhotoModal1.addEventListener("click", function (e) {
    
  // Pour fermer la modale1, on supprime la classe "active" sur tout les element "triggers"
    modalContainer.classList.remove("active"),
    modalTriggers.forEach(trigger => trigger.classList.remove("active")),

  // Pour ouvrir la modale2, on ajoute la classe "active" sur tout les element "triggers"
    modal2Container2.classList.add("active"),


   


    
    fermerModale2Overlay.classList.add("active")
   
 


    
}); 
btnFermerModale2.addEventListener("click", function (e) {
  modal2Container2.classList.remove("active")
  fermerModale2Overlay.classList.remove("active")
});
console.log(btnFermerModale2)