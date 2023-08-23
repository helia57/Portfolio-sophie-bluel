const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");


modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active")
}


async function genererProjetModale(works) {
    let projet = works;
      // Récupération de l'élément du DOM qui accueillera les projets: <section id = "container-gallery-modale">
    let baliseDivContainerGalleryModale = document.getElementById("container-gallery-modale");
    //fiche projet dans une figure
    let baliseFigureModale = document.createElement("figure");
    baliseFigureModale.classList.add("works-projet-modale");
    baliseFigureModale.classList = "projets-modale";
    baliseDivContainerGalleryModale.appendChild(baliseFigureModale); 
        
    // une image
    const imageElementModale = document.createElement("img");
    imageElementModale.src = projet.imageUrl;
    imageElementModale.setAttribut = "alt", "image du rendu du projet ${works.title}";
    imageElementModale.innerText = projet.imageUrl ?? "image bientôt disponible";  // si pas d'image, return "image bientôt disponible"
    baliseFigureModale.appendChild(imageElementModale);
      
    // un texte
    let textCardElementModale = document.createElement("figcaption");  
    textCardElementModale.innerText = projet.title;
    textCardElementModale = projet.title ?? "description bientôt disponible"; // si pas de titre au projet, return "description bientôt disponible"
    baliseFigureModale.appendChild(textCardElementModale);
}

async function genererGetWorksModale () { 
  const wrapper = document.querySelector("container-gallery-modale");
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
      wrapper.append(genererProjetModale(works))
            
      
  } catch (erreur) {
      loader.innertext = ("impossible de charger le contenu")
      loader.style.color = "red"
      return
  }
  return 
}
genererGetWorksModale();
genererProjetModale();
