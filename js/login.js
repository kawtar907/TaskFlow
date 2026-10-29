/* ============================================================
   login.js : page de connexion
   ============================================================ */

// Déjà connecté ? -> direct au tableau de bord
if (!redirigerSiConnecte()) {

    const formulaire = document.getElementById("formulaire");
    const champEmail = document.getElementById("email");
    const champMdp   = document.getElementById("mdp");
    const caseSouvenir = document.getElementById("souvenir");

    formulaire.addEventListener("submit", function (evenement) {
        evenement.preventDefault();
        effacerErreurs(formulaire);

        const email = champEmail.value.trim();
        const mdp   = champMdp.value;
        let valide = true;

        // 1) Champs remplis + format email
        if (email === "") {
            erreurChamp(champEmail, "L'email est obligatoire.");
            valide = false;
        } else if (!emailValide(email)) {
            erreurChamp(champEmail, "Format d'email invalide.");
            valide = false;
        }

        if (mdp === "") {
            erreurChamp(champMdp, "Le mot de passe est obligatoire.");
            valide = false;
        }

        if (!valide) return;

        // 2) Comparaison avec les comptes du localStorage
        const compte = trouverCompte(email);
        if (!compte || compte.motDePasse !== mdp) {
            afficherMessage("Email ou mot de passe incorrect", "erreur");
            return;
        }

        // 3) Session + redirection
        ouvrirSession(compte, caseSouvenir.checked);
        window.location.href = "dashboard.html";
    });
}