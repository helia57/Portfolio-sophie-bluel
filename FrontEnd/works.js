    
    // création de la section dynamique du site 
    // Récupération de l'élément du DOM qui accueillera les projets
    let baliseSectionPortfolio = document.getElementById("portfolio");
      
    let titreGallery = document.createElement("h2");        //  <h2>
    let baliseDivFilterBar = document.createElement("div"); //  <div class="filterBar">
    let baliseDivGallery = document.createElement("div");   //  <div class="photoGallery">
    
                     
        // creation du titre de section
            titreGallery.innerText = "Mes projets";
            baliseSectionPortfolio.appendChild(titreGallery);
        // creation div pour bouton filtre dans la balise section#portfolio
            baliseDivFilterBar.classList = "filterBar";
            baliseSectionPortfolio.appendChild(baliseDivFilterBar);
        // creation div pour les cards projets
           
            baliseDivGallery.classList = "photoGallery";
            baliseSectionPortfolio.appendChild(baliseDivGallery);
           
           
            console.log(document)

/** Crée une fiche projet avec une image, un titre
/* @param { {image:imageUrl, title: string}} works
/* @ return {HTMLElement}
/*/        
async function createProject(work)   {

    for (let i = 0; i < work.length; i++) {
        const projet = work[i] 
       
    //fiche projet dans une figure
    let baliseFigure = document.createElement("figure");
    baliseFigure.classList = "projets";
    baliseDivGallery.appendChild(baliseFigure); 
         
     // une image
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;
    imageElement.setAttribut = "alt", "image du rendu du projet ${works.title}"
    imageElement.innerText = projet.imageUrl ?? "image bientôt disponible";  // si pas d'image, return "image bientôt disponible"
    baliseDivGallery.appendChild(imageElement);
      
    // un texte
    let textCardElement = document.createElement("p");  
    textCardElement.innerText = projet.title;
    textCardElement.innerText = projet.title ?? "description bientôt disponible"; // si pas de titre au projet, return "description bientôt disponible"
    baliseDivGallery.appendChild(textCardElement);
    

    return 
}
}    
         // Récupération des projets depuis l'API  
        


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
        console.log(works)
        console.log(response)
        loader.remove ()
        for (let work of works) {
            wrapper.append(createProject(works))
        }
        console.log(works)
    } catch (erreur) {
        loader.innertext = ("impossible de charger le contenu")
        loader.style.color = "red"
        return
    }
    return 
}
                     
genererWorks();
