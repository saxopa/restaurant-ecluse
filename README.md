# L'Écluse — Site vitrine

Site statique (HTML / CSS / JS, zéro dépendance) pour le restaurant L'Écluse, Castanet-Tolosan.

## Structure

```
index.html
assets/
  css/style.css
  js/main.js
  img/            (logo, hero, plats, 20 photos galerie)
CNAME             (nom de domaine personnalisé)
```

## Prévisualiser en local

```bash
cd restaurant-ecluse
python3 -m http.server 8080
# ouvrir http://localhost:8080
```

## Mise en ligne gratuite — GitHub Pages

1. Créer un compte sur https://github.com (gratuit).
2. Créer un dépôt public, ex. `restaurant-ecluse`.
3. Y déposer **tout le contenu de ce dossier** (glisser-déposer via « Add file → Upload files », ou en ligne de commande) :
   ```bash
   git init && git add . && git commit -m "Site L'Écluse"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/restaurant-ecluse.git
   git push -u origin main
   ```
4. Dépôt → **Settings → Pages** → Source : `Deploy from a branch` → Branche `main` / dossier `/ (root)` → Save.
5. Au bout d'~1 min le site est en ligne : `https://VOTRE-COMPTE.github.io/restaurant-ecluse/`

**Hébergement = 0 € / an. À vie.**

## Nom de domaine (≈ 10–12 € / an)

Seule dépense : le nom de domaine, qui appartient alors **à la cliente**.

1. Acheter le domaine (Gandi, OVH, Infomaniak…) — ex. `restaurant-ecluse.fr`.
2. Dans le fichier `CNAME` à la racine, mettre **uniquement** le domaine choisi, ex. :
   ```
   restaurant-ecluse.fr
   ```
3. Chez le registrar (zone DNS), créer :
   - un enregistrement **A** `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - un enregistrement **CNAME** `www` → `VOTRE-COMPTE.github.io`
4. GitHub → Settings → Pages → Custom domain : saisir le domaine → cocher **Enforce HTTPS**.

> Si l'on garde le domaine Wix actuel `restauranteclusecastanet.fr`, il suffit de pointer ses DNS vers GitHub Pages (mêmes enregistrements A/CNAME) après résiliation de l'abonnement Wix.

## Contenu repris du site Wix

Textes, formules, horaires (été/hiver), coordonnées, et **40 photos** récupérées en haute définition depuis l'ancien site. Aucune perte.
