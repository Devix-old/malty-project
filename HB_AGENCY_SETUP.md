# HB Agency Setup Instructions

## 🎯 **Solution Professionnelle Implémentée**

J'ai créé une solution complète pour intégrer HB Agency dans votre Next.js app avec des composants React appropriés.

## 📁 **Fichiers Créés/Modifiés :**

### **1. Nouveau composant : `src/components/ads/AdPlacements.js`**
- **InPageAd** : Pour les annonces in-page (241543, 241544, 241545)
- **FooterAd** : Pour les annonces footer avec React Portal (241541, 241542)
- **StickyFooterAd** : Pour les annonces sticky

### **2. Pages mises à jour :**
- **HomeClient.js** : Annonces homepage
- **recept/[slug]/page.js** : Annonces pages de recettes

## 🔧 **Étapes Restantes (CRITIQUES) :**

### **1. Script Principal HB Agency**
Vous devez ajouter le script principal HB Agency dans `src/app/layout.js` :

```javascript
// Dans src/app/layout.js, ajoutez ceci dans le <head> :
<Script
  src="https://ads.hbagency.com/VOTRE_SCRIPT_PRINCIPAL.js"
  strategy="afterInteractive"
/>
```

**⚠️ IMPORTANT :** Remplacez `VOTRE_SCRIPT_PRINCIPAL.js` par le vrai script que HB Agency vous a donné.

### **2. Fichier ads.txt**
Placez votre fichier `ads.txt` dans le dossier `public/` de votre projet.

### **3. Fonctions HB Agency**
Dans `AdPlacements.js`, j'ai utilisé des fonctions placeholder :
- `window.hbagency.loadAd()`
- `window.hbagency.refresh()`

**Vous devez vérifier avec HB Agency quelles sont les vraies fonctions à utiliser.**

## 🎯 **Comment Utiliser les Nouveaux Composants :**

### **Annonces In-Page :**
```jsx
// Simple ad
<InPageAd adId="241544" adType="simple" />

// In-page avec wrapper
<InPageAd 
  adId="241545" 
  adType="inpage_style_2"
  className="max-w-7xl mx-auto px-4"
  style={{ minHeight: '300px' }}
/>
```

### **Annonces Footer (avec React Portal) :**
```jsx
// Footer ads - s'affichent directement dans document.body
<FooterAd adId="241541" />
<FooterAd adId="241542" />
```

## 🚀 **Avantages de Cette Solution :**

1. **React Portal** : Les annonces footer sont rendues directement dans `document.body`
2. **Pas de conflit DOM** : Les boutons de fermeture fonctionneront
3. **Chargement intelligent** : Les annonces se chargent quand les composants sont visibles
4. **Flexibilité** : Facile à réutiliser dans toutes vos pages

## 🔍 **Test et Debug :**

1. **Console** : Regardez les logs `[HB Agency]` pour voir si les annonces se chargent
2. **Network** : Vérifiez que le script principal se charge
3. **Elements** : Inspectez pour voir si les divs HB Agency sont présents

## ⚠️ **Points Critiques :**

1. **Script principal** : DOIT être ajouté dans layout.js
2. **ads.txt** : DOIT être dans public/
3. **Fonctions HB Agency** : Vérifiez les vraies fonctions avec HB Agency
4. **Production** : Les annonces ne s'affichent qu'en production

## 📞 **Support HB Agency :**

Si les annonces ne fonctionnent toujours pas, envoyez-leur :
1. Le code HTML généré par vos composants
2. Les logs de la console
3. L'URL de votre site en production

**Cette solution résout les problèmes de conflit entre HB Agency et Next.js !** 🎉
