// Récupération des projets depuis l'API

   async function getWorksFromDataApi() {
   
   const myRequest = new Request("http://localhost:5678/api/works");
   
    await fetch( myRequest)
     .then((response) => response.json())
     .then((works) => {
       for (let i = 0; i < works.length; i++) {
        const projet = works[i];

    }
})
    .then( json => cardsProject(json))
    .catch(err => console.error("Fetch problem"));
}            

    
    // création de la section dynamique du site qui recevra les cards projets (par interpolation)
   
    let baliseSectionPortfolio = document.getElementById("portfolio");
   
    let titreGallery = document.createElement("h2");        //  <h2>
    let baliseDivFilterBar = document.createElement("div"); //  <div class="filterBar">
    let baliseDivGallery = document.createElement("div");   //  <div class="photoGallery">
    let cardsProject = document.createElement("figure");     // <figure class="cardsProject">
    let imageElement = document.createElement("img");           //  <img>
    let textCardElement = document.createElement("p");          //  <p>
    console.log(titreGallery)
        // Récupération de l'élément du DOM qui accueillera les projets

            
        // creation du titre de section
           
            titreGallery.innerText =  "Mes projets";
            baliseSectionPortfolio.appendChild(titreGallery);
        // creation div pour bouton filtre dans la balise section#portfolio
           
            baliseDivFilterBar.classList = "filterBar";
            baliseSectionPortfolio.appendChild(baliseDivFilterBar);
        // creation div pour les cards projets
           
            baliseDivGallery.classList = "photoGallery";
            baliseSectionPortfolio.appendChild(baliseDivGallery);

         // creation des balises <figure> pour les cards "projets" dedié à un projet
            
            cardsProject.classList = "cardProject"; 
            baliseDivGallery.appendChild(cardsProject);

        // Création d’une balise div "cardsProject" dédiée à un projet donné
            
            baliseDivGallery.appendChild(cardsProject);

        // Création des figures class "cardsproject "
            // avec une image
            
            imageElement.src = projet.imageUrl;
            imageElement.setAttribut("alt", "image du rendu du projet ${projet.title}")
            imageElement.innerText = projet.image ?? "image bientôt disponible";  // si pas d'image, return "image bientôt disponible"
            cardsProject.appendChild(imageElement);

            // un texte
            textCardElement.innerText = projet.title;
            textCardElement.innerText = projet.title ?? "description bientôt disponible"; // si pas de titre au projet, return "description bientôt disponible"
            cardsProject.appendChild(textCardElement);
        
                 
         
