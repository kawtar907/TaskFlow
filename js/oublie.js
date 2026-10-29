/* ============================================================
   oublie.js : mot de passe oublié (simulation locale)
   Étape 1 : vérifier que l'email existe
   Étape 2 : saisir un nouveau mot de passe
   ============================================================ */

const formulaire  = document.getElementById("formulaire");
const champEmail  = document.getElementById("email");
const zoneNouveau = document.getElementById("zone-nouveau");
const champNouveau = document.getElementById("nouveau-mdp");
const boutonEnvoyer = document.getElementById("envoyer");

formulaire.noValidate = true;   // on gère la validation nous-mêmes
let etape = 1;
let compteTrouve = null;

formulaire.addEventListener("submit", function (evenement) {
    evenement.preventDefault();
    effacerErreurs(formulaire);

    /* ----- Étape 1 : vérification de l'email ----- */
    if (etape === 1) {
        const email = champEmail.value.trim();

        if (email === "") {
            erreurChamp(champEmail, "L'email est obligatoire.");
            return;
        }
        if (!emailValide(email)) {
            erreurChamp(champEmail, "Format d'email invalide.");
            return;
        }

        compteTrouve = trouverCompte(email);
        if (!compteTrouve) {
            afficherMessage("Aucun compte n'est associé à cet email.", "erreur");
            return;
        }

        // Compte trouvé -> on passe à l'étape 2
        etape = 2;
        champEmail.readOnly = true;
        zoneNouveau.hidden = false;
        boutonEnvoyer.textContent = "Réinitialiser le mot de passe";
        afficherMessage("Compte trouvé. Choisissez un nouveau mot de passe.", "succes");
        champNouveau.focus();
        return;
    }

    /* ----- Étape 2 : nouveau mot de passe ----- */
    const nouveau = champNouveau.value;

    if (nouveau.length < 8) {
        erreurChamp(champNouveau, "Le mot de passe doit contenir au moins 8 caractères.");
        return;
    }

    const comptes = getComptes();
    const index = comptes.findIndex(function (c) { return c.email === compteTrouve.email; });
    comptes[index].motDePasse = nouveau;
    saveComptes(comptes);

    afficherMessage("Mot de passe modifié ! Redirection vers la connexion…", "succes");
    boutonEnvoyer.disabled = true;

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1800);
});