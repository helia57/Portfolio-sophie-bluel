
    
    //************************************************/
    //* création de la section dynamique du site     */
    //************************************************/

    // Récupération de l'élément du DOM qui accueillera les projets: <section id = "portfolio">
    let baliseSectionPortfolio = document.getElementById("portfolio");
    // création 3 div 
                           
    let baliseDivFilterBar = document.createElement("div");                  //  <div class="filterBar">
    let baliseDivGallery = document.createElement("div");                   //  <div class="photoGallery">
    
    // creation <div> pour bouton filtre dans la balise section#portfolio
    baliseDivFilterBar.classList = "filterBar";                          //<div class="filterBar"></div>
    baliseSectionPortfolio.appendChild(baliseDivFilterBar);              //section portfolio parent de div filterBar
    // creation div pour tous les projets
    baliseDivGallery.classList = "photoGallery";                         //<div class="photoGallery"></div>
    baliseSectionPortfolio.appendChild(baliseDivGallery);                //section portfolio parent de div gallery

    // creation 4 boutons filtres par catégories
    let boutonTous = document.createElement("button")                   //  <button class="tous">
    boutonTous.textContent = "tous";
    boutonTous.id =("btnTous");
    baliseDivFilterBar.appendChild(boutonTous);

    let boutonObjets = document.createElement("button")                 //  <button class="Objets">
    boutonObjets.textContent = "Objets";
    boutonObjets.id =("btnObjets");
    baliseDivFilterBar.appendChild(boutonObjets);

    let boutonAppartements = document.createElement("button") //  <button class="Appartement">
    boutonAppartements.textContent = "Appartements";
    boutonAppartements.id =("btnAppart");
    baliseDivFilterBar.appendChild(boutonAppartements);

    let boutonHotelEtRestaurants = document.createElement("button") //  <button class="Hotels et restaurants">
    boutonHotelEtRestaurants.textContent = "Hôtels & restaurants";
    boutonHotelEtRestaurants.id =("btnHotel");
    baliseDivFilterBar.appendChild(boutonHotelEtRestaurants);       
           
    
/*************************************************** */
/** Crée une fiche projet avec une image, un titre
/* @param { {image:imageUrl, title: string}} works
/* @ return {HTMLElement}
/*************************************************** */   


async function createProject(argument)   {

    for (let i = 0; i < argument.length; i++) {
        const projet = argument[i] 
        
    
    //fiche projet dans une figure
    let baliseFigure = document.createElement("figure");
    baliseFigure.classList.add("works-projet");
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


async function genererGetWorks () { 
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

        works = await response.json()
        loader.remove ()
       (trierParCategoryId(works))
              
        
    } catch (erreur) {
        loader.innertext = ("impossible de charger le contenu")
        loader.style.color = "red"
        return
    }
    return 
}
                      
genererGetWorks();

let worksCategorieTous
let worksCategoryObjet
let worksCategoryAppart 
let worksCategoryHotel
// trie le tableau works par categorieID et return un tableau trié de chaque categorie dans une nouvelle constante
async function trierParCategoryId(works) {
    worksCategorieTous = works                      // toute les categories et celles qui n'ont pas d'id categorie
    
    worksCategoryObjet = works.filter(works => works.categoryId===1);       // categorie objet
     
    worksCategoryAppart = works.filter(works => works.categoryId===2);      // categorie Appartement
   
    worksCategoryHotel = works.filter(works => works.categoryId===3);       // categorie hotels et restaurants
   
    // tous les projets affichés au chargements de la page
    createProject (works)
    // remise à zero de la page et affichage du trie lorsque j'appuie sur le bouton
    boutonTous.addEventListener("click", function () {
        document.querySelector(".photoGallery").innerHTML = "";
        createProject (worksCategorieTous)
        });
        
    boutonObjets.addEventListener("click", function () {
        document.querySelector(".photoGallery").innerHTML = "";
        createProject (worksCategoryObjet)
        });  
        
    boutonAppartements.addEventListener("click", function () {
        document.querySelector(".photoGallery").innerHTML = "";
        createProject (worksCategoryAppart)
        }); 
    boutonHotelEtRestaurants.addEventListener("click", function () {
        document.querySelector(".photoGallery").innerHTML = "";
        createProject (worksCategoryHotel)
        });    
       
    }

