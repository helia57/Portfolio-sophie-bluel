    //************************************************/
    //* création de la section dynamique du site     */
    //************************************************/

    // Récupération de l'élément du DOM qui accueillera les projets: <section id = "portfolio">
    let baliseSectionPortfolio = document.getElementById("portfolio");
    // création du titre en mode dynamique, et 2 div 
    let titreGallery = document.createElement("h2");        //  <h2>
    let baliseDivFilterBar = document.createElement("div"); //  <div class="filterBar">
    let bouton
    let baliseDivGallery = document.createElement("div");   //  <div class="photoGallery">
    
                     
        // creation du titre de section
    titreGallery.innerText = "Mes projets";
    baliseSectionPortfolio.appendChild(titreGallery);
        // creation <div> pour bouton filtre dans la balise section#portfolio
    baliseDivFilterBar.classList = "filterBar";          //<div class="filterBar"></div>
    baliseSectionPortfolio.appendChild(baliseDivFilterBar);
        // creation div pour tous les projets
    baliseDivGallery.classList = "photoGallery";        //<div class="photoGallery"></div>
    baliseSectionPortfolio.appendChild(baliseDivGallery);
           
           
    console.log(document)
/*************************************************** */
/** Crée une fiche projet avec une image, un titre
/* @param { {image:imageUrl, title: string}} works
/* @ return {HTMLElement}
/*************************************************** */        
async function createProject(works)   {

    for (let i = 0; i < works.length; i++) {
        const projet = works[i] 
    console.log(projet)
   
       
    
    //fiche projet dans une figure
    let baliseFigure = document.createElement("figure");
    baliseFigure.classList = "projets";
    baliseDivGallery.appendChild(baliseFigure); 
         
     // une image
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;
    imageElement.setAttribut = "alt", "image du rendu du projet ${works.title}"
    imageElement.innerText = projet.imageUrl ?? "image bientôt disponible";  // si pas d'image, return "image bientôt disponible"
    baliseFigure.appendChild(imageElement);
      
    // un texte
    let textCardElement = document.createElement("figcaption");  
    textCardElement.innerText = projet.title;
    textCardElement.innerText = projet.title ?? "description bientôt disponible"; // si pas de titre au projet, return "description bientôt disponible"
    baliseFigure.appendChild(textCardElement);
    
    }
    return 

}    
 /************************************************ */   
//* Récupération des projets depuis l'API  
 /************************************************ */       


async function genererWorks () { 
    const wrapper = document.querySelector(".photoGallery");
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

        const works = await response.json()
        loader.remove ()
        wrapper.append(createProject(works))
        
        console.log(works)
    } catch (erreur) {
        loader.innertext = ("impossible de charger le contenu")
        loader.style.color = "red"
        return
    }
    return 
}
                     
genererWorks();
