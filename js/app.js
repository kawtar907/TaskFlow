/* ============================================================
   Règles de statut et de progression
   ============================================================ */
function calculerStatut(checks) {
    const coches = checks.filter(Boolean).length;
    if (coches === 0) return "À faire";
    if (coches === checks.length) return "Terminé";
    return "En cours";
}

// Retourne l'état d'une tâche (créé / réparé si besoin). Le statut découle toujours de la checklist.
function entree(typeId, num) {
    const modele = TYPES[typeId].taches[num - 1];
    const n = modele.checklist.length;
    if (!etat.types[typeId]) etat.types[typeId] = {};
    let e = etat.types[typeId][num];
    if (!e || !Array.isArray(e.checks)) {
        e = etat.types[typeId][num] = { statut: "À faire", checks: [] };
    }
    while (e.checks.length < n) e.checks.push(false);
    e.checks.length = n;
    e.checks = e.checks.map(Boolean);
    e.statut = calculerStatut(e.checks);
    return e;
}

function progression(typeId) {
    const taches = TYPES[typeId].taches;
    let termines = 0;
    taches.forEach(function (t) {
        if (entree(typeId, t.numero).statut === "Terminé") termines++;
    });
    return {
        termines: termines,
        total: taches.length,
        pct: Math.round(termines / taches.length * 100)
    };
}

/* ============================================================
   Actions (chacune enregistre puis réaffiche)
   ============================================================ */
function cocher(typeId, num, index, valeur) {
    entree(typeId, num).checks[index] = valeur;
    finirAction();
}

function terminerTache(typeId, num) {
    const e = entree(typeId, num);
    e.checks = e.checks.map(function () { return true; });
    finirAction();
}

function rouvrirTache(typeId, num) {
    const e = entree(typeId, num);
    e.checks[e.checks.length - 1] = false;          // décoche la dernière sous-étape
    finirAction();
}

function recommencerProjet(typeId) {
    TYPES[typeId].taches.forEach(function (t) {
        const e = entree(typeId, t.numero);
        e.checks = e.checks.map(function () { return false; });
    });
    finirAction();
}

function finirAction() {
    // statuts recalculés à chaque lecture (entree), puis sauvegarde, puis affichage
    ORDRE_TYPES.forEach(function (id) { progression(id); });
    sauver();
    afficher(true);
}

/* ============================================================
   Composants d'affichage
   ============================================================ */
function lienOutil(nom) {
    const o = OUTILS[nom];
    if (!o) return esc(nom);
    return '<a class="outil" href="' + esc(o.url) + '" target="_blank" rel="noopener" data-outil="' +
           esc(nom) + '">' + esc(nom) + '</a>';
}

// Texte avec [[Outil]] transformés en liens verts
function texteRiche(texte) {
    return esc(texte).replace(/\[\[([^\]]+)\]\]/g, function (m, nom) { return lienOutil(nom); });
}

function badgePriorite(priorite) {
    return '<span class="badge ' + CLASSE_PRIORITE[priorite] + '">' + esc(priorite) + '</span>';
}

function barre(pct) {
    return '<div class="barre" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct +
           '"><span style="width:' + pct + '%"></span></div>';
}

function entete(titre, sousTitre) {
    return '<header class="entete">' +
        '<div><h1>' + esc(titre) + '</h1><p class="sous-titre">' + sousTitre + '</p></div>' +
        '<div class="actions">' +
            '<button type="button" id="deconnexion" class="btn btn-sec">Déconnexion</button>' +
            '<span class="avatar" title="' + esc(utilisateur.nom) + '" aria-label="' + esc(utilisateur.nom) + '">' +
                esc(initiales(utilisateur.nom)) + '</span>' +
        '</div></header>';
}

function carteTache(typeId, t) {
    const outils = t.outils.map(lienOutil).join(", ");
    return '<div class="tache-carte" role="button" tabindex="0" data-href="#tache/' + typeId + '/' + t.numero + '">' +
        '<div class="tache-haut"><span class="num">' + t.numero + '</span>' + badgePriorite(t.priorite) + '</div>' +
        '<h4>' + esc(t.titre) + '</h4>' +
        '<p class="outils-ligne">Outils : ' + outils + '</p></div>';
}

function miniTache(typeId, t) {
    return '<div class="tache-carte mini" role="button" tabindex="0" data-href="#tache/' + typeId + '/' + t.numero + '">' +
        '<span class="num">' + t.numero + '</span><h4>' + esc(t.titre) + '</h4></div>';
}

function colonnesHTML(typeId, compact) {
    const colonnes = STATUTS.map(function (s) { return { statut: s, items: [] }; });
    TYPES[typeId].taches.forEach(function (t) {
        const e = entree(typeId, t.numero);
        colonnes[STATUTS.indexOf(e.statut)].items.push(t);      // reste classé par numéro d'étape
    });

    return '<div class="colonnes">' + colonnes.map(function (c) {
        const m = META_STATUT[c.statut];
        const contenu = c.items.length
            ? c.items.map(function (t) { return compact ? miniTache(typeId, t) : carteTache(typeId, t); }).join("")
            : '<p class="vide">Aucune tâche</p>';
        return '<section class="colonne ' + m.bordure + '">' +
            '<div class="colonne-tete"><h3>' + c.statut + '</h3><span class="compteur">' + c.items.length + '</span></div>' +
            contenu + '</section>';
    }).join("") + '</div>';
}

/* ============================================================
   Vue 1 : tableau de bord
   ============================================================ */
function vueDashboard() {
    let html = entete("Tableau de bord", "Bonjour ! Voici l'avancement de vos projets.");

    html += '<div class="grille-types">' + ORDRE_TYPES.map(function (id) {
        const type = TYPES[id];
        const p = progression(id);
        return '<a class="carte carte-type" href="#type/' + id + '">' +
            '<div class="carte-type-haut"><span class="icone-type">' + ICONES[id] + '</span><h2>' + esc(type.nom) + '</h2></div>' +
            '<p class="detail">' + p.termines + ' / ' + p.total + ' tâches terminées</p>' +
            '<div class="ligne-pct"><span>Progression</span><strong>' + p.pct + ' %</strong></div>' +
            barre(p.pct) + '</a>';
    }).join("") + '</div>';

    const actif = TYPES[etat.actif];
    html += '<section class="carte projet-actif">' +
        '<div class="projet-actif-tete"><h2>Projet actif : ' + esc(actif.titre) + '</h2>' +
        '<a class="lien" href="#type/' + actif.id + '">Ouvrir le projet</a></div>' +
        colonnesHTML(actif.id, true) + '</section>';

    return html;
}

/* ============================================================
   Vue 2 : écran des tâches d'un type
   ============================================================ */
function vueType(typeId) {
    const type = TYPES[typeId];
    const p = progression(typeId);

    let html = entete(type.titre, esc(type.categorie) + " · " + type.taches.length + " étapes");

    html += '<div class="notice-vert">Les outils en <span class="outil-exemple">vert</span> sont cliquables : ' +
            'cliquez dessus pour ouvrir leur documentation.</div>';

    html += '<section class="carte progression-globale">' +
        '<div class="ligne-pct"><h2>Progression globale</h2><strong>' + p.pct + ' %</strong></div>' +
        barre(p.pct) +
        '<p class="detail">' + p.termines + ' / ' + p.total + ' tâches terminées</p></section>';

    html += (p.pct === 100) ? ecranFin(typeId) : colonnesHTML(typeId, false);
    return html;
}

/* ============================================================
   Écran « Projet terminé »
   ============================================================ */
function ecranFin(typeId) {
    const type = TYPES[typeId];
    return '<section class="carte fin">' +
        '<div class="fin-icone">' + ICONES.checkGrand + '</div>' +
        '<h2>Bravo, votre projet est terminé !</h2>' +
        '<p class="detail">' + type.taches.length + ' étapes sur ' + type.taches.length + ' accomplies</p>' +
        barre(100) +
        '<div class="fin-boutons">' +
            '<button type="button" class="btn btn-prim" data-action="recommencer" data-type="' + typeId + '">Recommencer le projet</button>' +
            '<a class="btn btn-sec" href="#dashboard">Choisir un autre type</a>' +
        '</div>' +
        '<ol class="fin-liste">' + type.taches.map(function (t) {
            return '<li><span class="num">' + t.numero + '</span><span>' + esc(t.titre) + '</span>' +
                   '<span class="coche-verte" aria-label="Terminé">' + ICONES.check + '</span></li>';
        }).join("") + '</ol></section>';
}

/* ============================================================
   Vue 3 : détail d'une tâche
   ============================================================ */
function vueTache(typeId, num) {
    const type = TYPES[typeId];
    const t = type.taches[num - 1];
    const e = entree(typeId, num);
    const coches = e.checks.filter(Boolean).length;
    const total = e.checks.length;
    const pct = Math.round(coches / total * 100);
    const termine = e.statut === "Terminé";

    let html = entete(t.titre, esc(type.nom) + " › Étape " + num + " sur " + type.taches.length);

    html += '<div class="detail-grille">';

    // ----- Colonne principale
    html += '<div class="detail-principal">' +
        '<section class="carte"><h2>Description</h2><p>' + texteRiche(t.description) + '</p></section>' +
        '<section class="carte"><h2>Résultat attendu</h2><p>' + esc(t.resultat) + '</p></section>' +
        '<section class="carte"><div class="ligne-pct"><h2>Checklist</h2><strong>' + coches + ' / ' + total + '</strong></div>' +
        barre(pct) +
        '<ul class="checklist" data-type="' + typeId + '" data-num="' + num + '">' +
        t.checklist.map(function (texte, i) {
            const id = "sous-etape-" + i;
            return '<li><input type="checkbox" id="' + id + '" data-index="' + i + '"' + (e.checks[i] ? " checked" : "") + '>' +
                   '<label for="' + id + '" class="' + (e.checks[i] ? "faite" : "") + '">' + texteRiche(texte) + '</label></li>';
        }).join("") + '</ul></section></div>';

    // ----- Colonne d'informations
    html += '<aside class="detail-infos carte">' +
        '<h2>Informations</h2>' +
        '<dl>' +
            '<dt>Statut</dt><dd><span class="badge ' + META_STATUT[e.statut].badge + '">' + e.statut + '</span></dd>' +
            '<dt>Priorité</dt><dd>' + badgePriorite(t.priorite) + '</dd>' +
            '<dt>Durée estimée</dt><dd>' + esc(t.duree) + '</dd>' +
            '<dt>Outils recommandés</dt><dd><ul class="liste-outils">' +
                t.outils.map(function (o) { return '<li>' + lienOutil(o) + '</li>'; }).join("") +
            '</ul></dd>' +
        '</dl>' +
        (termine
            ? '<button type="button" class="btn btn-sec bloc" data-action="rouvrir" data-type="' + typeId + '" data-num="' + num + '">Rouvrir la tâche</button>'
            : '<button type="button" class="btn btn-prim bloc" data-action="terminer" data-type="' + typeId + '" data-num="' + num + '">Marquer comme terminé</button>') +
        '<a class="btn btn-sec bloc" href="#type/' + typeId + '">← Retour aux tâches</a>' +
        '</aside></div>';

    return html;
}

/* ============================================================
   Routage par #hash
   #dashboard | #type/web | #tache/web/4
   ============================================================ */
function lireRoute() {
    const p = location.hash.replace(/^#\/?/, "").split("/");
    if (p[0] === "type" && TYPES[p[1]]) {
        return { vue: "type", type: p[1] };
    }
    if (p[0] === "tache" && TYPES[p[1]]) {
        const n = parseInt(p[2], 10);
        if (n >= 1 && n <= TYPES[p[1]].taches.length) {
            return { vue: "tache", type: p[1], num: n };
        }
    }
    return { vue: "dashboard" };
}

function afficher(garderScroll) {
    const y = window.scrollY;
    const r = lireRoute();
    let html;

    if (r.vue === "type" || r.vue === "tache") {
        if (etat.actif !== r.type) { etat.actif = r.type; sauver(); }   // dernier projet ouvert
    }

    if (r.vue === "type")       html = vueType(r.type);
    else if (r.vue === "tache") html = vueTache(r.type, r.num);
    else                        html = vueDashboard();

    racine.innerHTML = html;
    masquerInfobulle();

    // lien actif dans la barre latérale
    const courant = r.vue === "dashboard" ? "dashboard" : r.type;
    document.querySelectorAll(".nav-lien").forEach(function (a) {
        const actif = a.dataset.nav === courant;
        a.classList.toggle("actif", actif);
        if (actif) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });

    window.scrollTo(0, garderScroll ? y : 0);
}

/* ============================================================
   Info-bulles des outils (survol + focus clavier)
   ============================================================ */
const infobulle = document.createElement("div");
infobulle.className = "infobulle";
infobulle.setAttribute("role", "tooltip");
infobulle.hidden = true;
document.body.appendChild(infobulle);

let minuteurMasquage = null;

function adresseCourte(url) {
    try {
        const u = new URL(url);
        return u.host.replace(/^www\./, "") + u.pathname.replace(/\/$/, "");
    } catch (e) {
        return url;
    }
}

function montrerInfobulle(lien) {
    const o = OUTILS[lien.dataset.outil];
    if (!o) return;
    annulerMasquage();

    infobulle.innerHTML =
        "<strong>" + esc(lien.dataset.outil) + "</strong>" +
        "<p>" + esc(o.description) + "</p>" +
        '<span class="adresse">' + esc(adresseCourte(o.url)) + "</span>" +
        '<a class="btn-doc" href="' + esc(o.url) + '" target="_blank" rel="noopener">Ouvrir la documentation</a>';
    infobulle.hidden = false;

    const r = lien.getBoundingClientRect();
    const w = infobulle.offsetWidth;
    const h = infobulle.offsetHeight;
    let gauche = Math.max(12, Math.min(r.left, window.innerWidth - w - 12));
    let haut = r.bottom + 6;
    if (haut + h > window.innerHeight - 12 && r.top - h - 6 > 12) haut = r.top - h - 6;   // pas la place dessous
    infobulle.style.left = gauche + "px";
    infobulle.style.top = haut + "px";
}

function planifierMasquage() {
    annulerMasquage();
    minuteurMasquage = setTimeout(masquerInfobulle, 180);
}
function annulerMasquage() {
    if (minuteurMasquage) { clearTimeout(minuteurMasquage); minuteurMasquage = null; }
}
function masquerInfobulle() {
    annulerMasquage();
    infobulle.hidden = true;
}

document.addEventListener("mouseover", function (e) {
    const outil = e.target.closest(".outil");
    if (outil) montrerInfobulle(outil);
    else if (e.target.closest(".infobulle")) annulerMasquage();
});
document.addEventListener("mouseout", function (e) {
    if (e.target.closest(".outil") || e.target.closest(".infobulle")) planifierMasquage();
});
document.addEventListener("focusin", function (e) {
    const outil = e.target.closest(".outil");
    if (outil) montrerInfobulle(outil);
});
document.addEventListener("focusout", function (e) {
    if (e.target.closest(".outil")) planifierMasquage();
});
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") masquerInfobulle();
});
window.addEventListener("scroll", masquerInfobulle, { passive: true });

/* ============================================================
   Événements de la page
   ============================================================ */
function brancherEvenements() {
    // clics (délégation)
    document.addEventListener("click", function (e) {
        // Déconnexion : la session est supprimée, l'avancement reste
        if (e.target.closest("#deconnexion")) {
            fermerSession();
            window.location.href = "login.html";
            return;
        }

        // Un clic sur un outil ouvre sa doc (nouvel onglet) sans ouvrir la carte
        if (e.target.closest(".outil") || e.target.closest(".infobulle")) return;

        const carte = e.target.closest(".tache-carte");
        if (carte) {
            location.hash = carte.dataset.href;
            return;
        }

        const bouton = e.target.closest("[data-action]");
        if (!bouton) return;
        const typeId = bouton.dataset.type;
        const num = parseInt(bouton.dataset.num, 10);

        switch (bouton.dataset.action) {
            case "terminer":
                terminerTache(typeId, num);
                break;
            case "rouvrir":
                rouvrirTache(typeId, num);
                break;
            case "recommencer":
                if (window.confirm("Recommencer le projet ? Toutes les tâches repasseront à « À faire » et les checklists seront décochées.")) {
                    recommencerProjet(typeId);
                }
                break;
        }
    });

    // cartes accessibles au clavier
    document.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("tache-carte")) {
            e.preventDefault();
            location.hash = e.target.dataset.href;
        }
    });

    // cases de la checklist
    document.addEventListener("change", function (e) {
        const caseCochee = e.target.closest(".checklist input[data-index]");
        if (!caseCochee) return;
        const liste = caseCochee.closest(".checklist");
        cocher(liste.dataset.type, parseInt(liste.dataset.num, 10),
               parseInt(caseCochee.dataset.index, 10), caseCochee.checked);
    });

    window.addEventListener("hashchange", function () { afficher(false); });
}

/* ============================================================
   Démarrage
   ============================================================ */
function demarrer() {
    racine = document.getElementById("vue");
    etat = chargerEtat();
    brancherEvenements();
    afficher(false);
}

if (utilisateur) demarrer();