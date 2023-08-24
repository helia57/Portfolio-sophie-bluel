// affichage de la modale
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modal2Container2 = document.querySelector(".modal2-container2");
const modal2Triggers2 = document.querySelectorAll(".modal2-trigger2");
const btnAjoutPhotoModal1 = document.querySelector("ajout-photos");
const modal3Container3 = document.querySelector(".modal3-container3");
const modal3Triggers3 = document.querySelectorAll(".modal3-trigger3");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active");
 
  for (let i = 0; i < works.length; i++) {
    const projet = works[i] 


      // Récupération de l'élément du DOM qui accueillera les projets: <section id = "container-gallery-modale">
  let baliseDivContainerGalleryModale = document.querySelector("#container-gallery-modale");

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
      //un bouton "poubelle"
  let delButton = document.createElement("button");
  delButton.innerHTML = "<i class=\"fa-solid fa-trash-can fa-xs\"></i>";
  delButton.classList.add("delete");
  imageElementModale.appendChild(delButton);
        
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
    e.preventDefault();
  }); 
    modalContainer.classList.add("active"),
    modal2Container2.classList.toggle("active"),
    modal2Triggers2.classList.remove.toggle("active"),

    console.log(modal2Triggers2)
 


