/* ============================================================
   inscription.js : page de création de compte
   ============================================================ */

if (!redirigerSiConnecte()) {

    const formulaire   = document.getElementById("formulaire");
    const champNom     = document.getElementById("nom");
    const champEmail   = document.getElementById("email");
    const champMdp     = document.getElementById("mdp");
    const champConfirm = document.getElementById("mdp-confirm");
    const caseAccepte  = document.getElementById("accepte");

    formulaire.addEventListener("submit", function (evenement) {
        evenement.preventDefault();
        effacerErreurs(formulaire);

        const nom     = champNom.value.trim();
        const email   = champEmail.value.trim();
        const mdp     = champMdp.value;
        const confirm = champConfirm.value;
        let valide = true;

        if (nom === "") {
            erreurChamp(champNom, "Le nom complet est obligatoire.");
            valide = false;
        }

        if (email === "") {
            erreurChamp(champEmail, "L'email est obligatoire.");
            valide = false;
        } else if (!emailValide(email)) {
            erreurChamp(champEmail, "Format d'email invalide.");
            valide = false;
        } else if (trouverCompte(email)) {
            erreurChamp(champEmail, "Un compte existe déjà avec cet email.");
            valide = false;
        }

        if (mdp === "") {
            erreurChamp(champMdp, "Le mot de passe est obligatoire.");
            valide = false;
        } else if (mdp.length < 8) {
            erreurChamp(champMdp, "Le mot de passe doit contenir au moins 8 caractères.");
            valide = false;
        }

        if (confirm === "") {
            erreurChamp(champConfirm, "Veuillez confirmer le mot de passe.");
            valide = false;
        } else if (confirm !== mdp) {
            erreurChamp(champConfirm, "Les mots de passe ne sont pas identiques.");
            valide = false;
        }

        if (!caseAccepte.checked) {
            erreurChamp(caseAccepte, "Vous devez accepter les conditions d'utilisation.");
            valide = false;
        }

        if (!valide) return;

        // Création du compte
        const nouveauCompte = {
            nom: nom,
            email: normaliserEmail(email),
            motDePasse: mdp
        };

        const comptes = getComptes();
        comptes.push(nouveauCompte);
        saveComptes(comptes);

        // Connexion automatique puis redirection
        ouvrirSession(nouveauCompte, false);
        window.location.href = "dashboard.html";
    });
}