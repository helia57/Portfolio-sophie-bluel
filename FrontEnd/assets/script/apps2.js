



// Attendre que le DOM soit prêt
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé. Appel à fonctionBoutonSupprimer...");
  });

  fonctionBoutonSupprimer();

  async function supprimerProjet(id) {
      try {
          const response = await fetch(`http://localhost:5678/api/works/${id}`, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          });
  
          if (response.ok) {
              console.log("Projet supprimé avec succès.");
          } else {
              console.log("Erreur lors de la suppression.");
          }
      } catch (error) {
          console.error("Erreur:", error);
          console.log("Une erreur s'est produite lors de la suppression.");
      }
  }
  
  // Fonction pour gérer le clic sur une icône "trash"
  function fonctionBoutonSupprimer() {
      const boutonSupprimer = document.querySelectorAll(".delete-button");
  
      boutonSupprimer.forEach(icon => {
          icon.addEventListener('click', async () => {
              const id = icon.parentElement.getAttribute('data-id');
              await supprimerProjet(id);
          });
      });
  }
  