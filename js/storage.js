/* ============================================================
   storage.js : fonctions communes (chargé avant les autres JS)
   Données uniquement dans le navigateur (localStorage / sessionStorage)
   ============================================================ */

const CLE_COMPTES = "taskflow_comptes";
const CLE_SESSION = "taskflow_session";

/* ---------- Lecture / écriture sécurisées ---------- */
function lireJSON(stockage, cle, defaut) {
    try {
        const valeur = stockage.getItem(cle);
        return valeur ? JSON.parse(valeur) : defaut;
    } catch (e) {
        return defaut;
    }
}

/* ---------- Comptes ---------- */
function getComptes() {
    const comptes = lireJSON(localStorage, CLE_COMPTES, []);
    return Array.isArray(comptes) ? comptes : [];
}

function saveComptes(comptes) {
    localStorage.setItem(CLE_COMPTES, JSON.stringify(comptes));
}

function normaliserEmail(email) {
    return email.trim().toLowerCase();
}

function trouverCompte(email) {
    const e = normaliserEmail(email);
    return getComptes().find(function (c) { return c.email === e; }) || null;
}

function emailValide(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/* ---------- Session ----------
   "Se souvenir de moi" coché  -> localStorage  (reste après fermeture du navigateur)
   sinon                       -> sessionStorage (supprimée à la fermeture de l'onglet) */
function ouvrirSession(compte, souvenir) {
    fermerSession();
    const session = { nom: compte.nom, email: compte.email };
    const stockage = souvenir ? localStorage : sessionStorage;
    stockage.setItem(CLE_SESSION, JSON.stringify(session));
}

function getSession() {
    return lireJSON(sessionStorage, CLE_SESSION, null) ||
           lireJSON(localStorage, CLE_SESSION, null);
}

function fermerSession() {
    sessionStorage.removeItem(CLE_SESSION);
    localStorage.removeItem(CLE_SESSION);
}

/* ---------- Protection des pages ---------- */
// Page interne : redirige vers la connexion si pas de session
function protegerPage() {
    const session = getSession();
    if (!session) {
        window.location.replace("login.html");
        return null;
    }
    return session;
}

// Page publique : redirige vers le dashboard si déjà connecté
function redirigerSiConnecte() {
    if (getSession()) {
        window.location.replace("dashboard.html");
        return true;
    }
    return false;
}

/* ---------- Message général (#message) ---------- */
function afficherMessage(texte, type) {
    const zone = document.getElementById("message");
    if (!zone) return;
    zone.textContent = texte;
    zone.className = type;          // "erreur" ou "succes" (classes de style.css)
    zone.hidden = false;
}

function cacherMessage() {
    const zone = document.getElementById("message");
    if (!zone) return;
    zone.hidden = true;
    zone.textContent = "";
    zone.className = "";
}

/* ---------- Erreurs sous chaque champ ---------- */
function erreurChamp(input, texte) {
    const apres = input.closest("#conditions") || input;
    if (input.type !== "checkbox") input.style.borderColor = "#c0392b";

    const petit = document.createElement("small");
    petit.className = "erreur-champ";
    petit.textContent = texte;
    petit.style.color = "#c0392b";
    petit.style.fontSize = "13px";
    apres.insertAdjacentElement("afterend", petit);
}

function effacerErreurs(formulaire) {
    formulaire.querySelectorAll(".erreur-champ").forEach(function (e) { e.remove(); });
    formulaire.querySelectorAll("input").forEach(function (i) { i.style.borderColor = ""; });
    cacherMessage();
}