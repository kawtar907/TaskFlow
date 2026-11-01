* ============================================================
   app.css : styles des pages internes (dashboard.html)
   (style.css reste utilisé uniquement par les pages de connexion)
   Couleurs : fond #F4F4FE, accent #5252DC, texte #1B1B3A, secondaire #6B6F8A
   ============================================================ */

:root {
    --fond: #F4F4FE;
    --accent: #5252DC;
    --accent-clair: #E8E8FB;
    --accent-fonce: #3737A8;
    --texte: #1B1B3A;
    --secondaire: #6B6F8A;
    --bord: #E3E3F4;
    --vert-outil: #12805C;
    --gris: #9CA3AF;
    --orange: #F59E0B;
    --vert: #16A34A;
}

* { box-sizing: border-box; }

body {
    margin: 0;
    font-family: 'Inter', Arial, sans-serif;
    background: var(--fond);
    color: var(--texte);
    line-height: 1.5;
}

h1, h2, h3, h4, p { margin: 0; }

:focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 2px;
}

/* ---------- Mise en page générale ---------- */
.layout {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 240px;
    flex-shrink: 0;
    background: white;
    border-right: 1px solid var(--bord);
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.contenu {
    flex: 1;
    min-width: 0;
    padding: 32px 40px 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* ---------- Barre latérale ---------- */
.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 8px;
    text-decoration: none;
    color: var(--texte);
}

.logo-icone {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: var(--accent);
    color: white;
}

.logo-texte {
    font-size: 22px;
    font-weight: 700;
}

nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.nav-titre {
    margin: 16px 12px 4px;
    font-size: 13px;
    font-weight: 600;
    color: var(--secondaire);
}

.nav-lien {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    padding: 0 12px;
    border-radius: 10px;
    color: var(--secondaire);
    font-weight: 500;
    text-decoration: none;
}

.nav-lien:hover { background: var(--fond); }

.nav-lien.actif {
    background: var(--accent-clair);
    color: var(--accent-fonce);
    font-weight: 700;
}

/* ---------- En-tête ---------- */
.entete {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
}

.entete h1 {
    font-size: 28px;
    font-weight: 700;
    line-height: 1.25;
}

.sous-titre {
    margin-top: 4px;
    color: var(--secondaire);
}

.actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--accent);
    color: white;
    font-weight: 700;
    font-size: 15px;
}

/* ---------- Boutons ---------- */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 20px;
    border-radius: 12px;
    border: 1px solid transparent;
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
}

.btn-prim { background: var(--accent); color: white; }
.btn-prim:hover { background: #4343C4; }

.btn-sec { background: white; color: var(--texte); border-color: var(--bord); }
.btn-sec:hover { background: var(--fond); }

.btn.bloc { width: 100%; }

/* ---------- Cartes génériques ---------- */
.carte {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(80, 80, 200, 0.08);
}

.carte h2 { font-size: 17px; font-weight: 700; }

.detail { color: var(--secondaire); font-size: 14px; }

.lien {
    color: var(--accent-fonce);
    font-weight: 600;
    text-decoration: none;
}
.lien:hover { text-decoration: underline; }

/* ---------- Barres de progression ---------- */
.barre {
    height: 10px;
    background: var(--accent-clair);
    border-radius: 999px;
    overflow: hidden;
}

.barre span {
    display: block;
    height: 100%;
    background: var(--accent);
    border-radius: 999px;
}

.ligne-pct {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 8px;
    color: var(--secondaire);
    font-size: 14px;
}
.ligne-pct strong { color: var(--texte); font-size: 16px; }
.ligne-pct h2 { color: var(--texte); }

/* ---------- Tableau de bord ---------- */
.grille-types {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.carte-type {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: inherit;
    text-decoration: none;
    border: 1px solid transparent;
}
.carte-type:hover { border-color: var(--accent); }

.carte-type-haut { display: flex; align-items: center; gap: 12px; }

.icone-type {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--accent-clair);
    color: var(--accent-fonce);
}

.projet-actif { display: flex; flex-direction: column; gap: 16px; }
.projet-actif-tete { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }

/* ---------- Colonnes ---------- */
.colonnes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: start;
}

.colonne {
    background: #FAFAFF;
    border: 1px solid var(--bord);
    border-top: 4px solid var(--gris);
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.colonne.gris   { border-top-color: var(--gris); }
.colonne.orange { border-top-color: var(--orange); }
.colonne.vert   { border-top-color: var(--vert); }

.colonne-tete {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.colonne-tete h3 { font-size: 15px; font-weight: 700; }

.compteur {
    min-width: 28px;
    padding: 2px 8px;
    border-radius: 999px;
    background: white;
    border: 1px solid var(--bord);
    font-size: 13px;
    font-weight: 700;
    text-align: center;
}

.vide {
    color: var(--secondaire);
    font-size: 14px;
    text-align: center;
    padding: 12px 0;
}

/* ---------- Cartes de tâches ---------- */
.tache-carte {
    background: white;
    border: 1px solid var(--bord);
    border-radius: 12px;
    padding: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 44px;
}
.tache-carte:hover { border-color: var(--accent); box-shadow: 0 4px 14px rgba(80, 80, 200, 0.12); }

.tache-carte.mini {
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.tache-haut { display: flex; justify-content: space-between; align-items: center; }

.tache-carte h4 { font-size: 14px; font-weight: 600; }

.outils-ligne { font-size: 13px; color: var(--secondaire); }

.num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--accent);
    color: white;
    font-size: 13px;
    font-weight: 700;
}

/* ---------- Badges ---------- */
.badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
}
.badge.haute   { background: #FDE8E8; color: #B42318; }
.badge.moyenne { background: #FEF0D6; color: #A15C07; }
.badge.basse   { background: #DCF5E6; color: #0F7A3D; }

.badge.b-afaire   { background: #ECECF4; color: #4B4F6A; }
.badge.b-encours  { background: #FEF0D6; color: #A15C07; }
.badge.b-termine  { background: #DCF5E6; color: #0F7A3D; }

/* ---------- Outils cliquables ---------- */
.outil {
    color: var(--vert-outil);
    font-weight: 700;
    text-decoration: underline;
}
.outil::after {
    content: "\2197";
    font-size: 0.75em;
    margin-left: 2px;
    display: inline-block;
    text-decoration: none;
}
.outil:hover { color: #0B5E43; }

.outil-exemple {
    color: var(--vert-outil);
    font-weight: 700;
    text-decoration: underline;
}

.notice-vert {
    background: #E3F6EC;
    border: 1px solid #B7E4CB;
    color: #0B5E43;
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 14px;
}

/* ---------- Info-bulle ---------- */
.infobulle {
    position: fixed;
    z-index: 1000;
    width: 270px;
    background: white;
    border: 1px solid var(--bord);
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 12px 32px rgba(40, 40, 120, 0.2);
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.infobulle[hidden] { display: none; }
.infobulle strong { font-size: 15px; }
.infobulle p { font-size: 13px; color: var(--secondaire); }
.infobulle .adresse { font-size: 12px; color: var(--vert-outil); font-weight: 600; }

.btn-doc {
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    border-radius: 10px;
    background: var(--vert-outil);
    color: white;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
}
.btn-doc:hover { background: #0B5E43; }

/* ---------- Progression globale ---------- */
.progression-globale { display: flex; flex-direction: column; gap: 8px; }
.progression-globale .ligne-pct { margin-bottom: 0; }

/* ---------- Détail d'une tâche ---------- */
.detail-grille {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 20px;
    align-items: start;
}

.detail-principal { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.detail-principal .carte h2 { margin-bottom: 8px; }
.detail-principal .carte p { color: var(--texte); }
.detail-principal .ligne-pct h2 { margin-bottom: 0; }

.checklist {
    list-style: none;
    margin: 12px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.checklist li {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    padding: 0 8px;
    border-radius: 10px;
}
.checklist li:hover { background: var(--fond); }

.checklist input[type="checkbox"] {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    accent-color: var(--accent);
    cursor: pointer;
}

.checklist label { flex: 1; padding: 8px 0; cursor: pointer; }
.checklist label.faite { color: var(--secondaire); text-decoration: line-through; }
.checklist label.faite .outil { text-decoration: underline; }

.detail-infos { display: flex; flex-direction: column; gap: 12px; }

.detail-infos dl { margin: 0; display: grid; gap: 4px; }
.detail-infos dt { font-size: 13px; color: var(--secondaire); margin-top: 8px; }
.detail-infos dd { margin: 0; font-weight: 600; }

.liste-outils { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px; }

/* ---------- Écran « Projet terminé » ---------- */
.fin {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    text-align: center;
    padding: 32px 24px;
}
.fin h2 { font-size: 24px; }
.fin .barre { width: 100%; max-width: 420px; }

.fin-icone {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #DCF5E6;
    color: var(--vert);
}

.fin-boutons { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin: 8px 0; }

.fin-liste {
    list-style: none;
    margin: 8px 0 0;
    padding: 0;
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;
}
.fin-liste li {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    padding: 0 12px;
    background: var(--fond);
    border-radius: 10px;
    font-weight: 500;
}
.fin-liste li span:nth-child(2) { flex: 1; }
.coche-verte { color: var(--vert); display: inline-flex; }

/* ---------- Petit écran (< 800 px) ---------- */
@media (max-width: 799px) {
    .layout { flex-direction: column; }

    .sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--bord);
        padding: 16px;
        gap: 12px;
    }

    nav { flex-direction: row; flex-wrap: wrap; align-items: center; }
    .nav-titre { display: none; }

    .contenu { padding: 20px 16px 40px; }

    .entete { flex-direction: column; }
    .entete h1 { font-size: 24px; }

    .grille-types,
    .colonnes,
    .detail-grille { grid-template-columns: 1fr; }
}