# 📋 Plan d'Amélioration du Portfolio - Gauthier Souquet

## 📅 Date d'analyse : 10 Janvier 2026

---

## 🎨 1. Design & Cohérence Visuelle

### 🔴 Problèmes Critiques

#### 1.1 Incohérence de Design entre les Pages
- **Problème** : Chaque page de projet utilise un style différent
  - `NDI.astro` : Utilise des gradients colorés (bleu, violet, turquoise)
  - `SAE3A.astro` : Utilise la DA standard avec bordures et arrondis
  - `stage.astro` : Utilise la DA standard avec bordures et arrondis
  - `train.astro` : Utilise des gradients colorés (orange, bleu)
  - `alternance.astro` : Page en Lorem Ipsum, pas finalisée

- **Impact** : Manque de cohérence visuelle, l'utilisateur ne se sent pas dans le même site
- **Solution recommandée** :
  - ✅ Choisir **une seule DA** et l'appliquer à toutes les pages de projets
  - Option 1 : DA avec bordures `border-2 border-gray-600 rounded-2xl` (plus sobre)
  - Option 2 : DA avec gradients de fond (plus moderne mais attention à l'accessibilité)
  - **Recommandation** : Garder la DA avec bordures (comme `stage.astro` et `SAE3A.astro`)

#### 1.2 Problème de Contraste et Lisibilité
- **Problème** : Dans `NDI.astro` et `train.astro`, les gradients de fond peuvent nuire à la lisibilité
- **Impact** : Difficulté de lecture, fatigue visuelle
- **Solution** :
  - Utiliser des fonds unis avec des accents colorés pour les badges et boutons
  - Éviter les gradients en arrière-plan des sections de texte

#### 1.3 Coins Arrondis Invisibles
- **Problème mentionné** : "on ne voit pas les coins arrondis de la section d'en haut et d'en bas"
- **Cause** : La balise `<main>` a `border-2 border-gray-600 rounded-2xl` mais les sections internes peuvent déborder
- **Solution** :
  - Ajouter `overflow: hidden` sur le main
  - Ou retirer les bordures et gérer les espaces différemment

---

## 🧩 2. Composants & Réutilisabilité

### 🟡 Problèmes Moyens

#### 2.1 Duplication Massive de Code
- **Problème** : Chaque page de projet répète la même structure :
  - Section Hero (titre, icône, badge, description)
  - Section Tags
  - Section Rôle/Présentation
  - Section Apprentissages/Compétences acquises
  - Section Contact + BackToTop

- **Impact** : 
  - Maintenance difficile (modifier un élément = modifier 5+ fichiers)
  - Code très verbeux (~300 lignes par page)
  - Risques d'incohérences

- **Solution recommandée** :
  - Créer des composants réutilisables :
    - `ProjectHero.astro` (Hero + Tags)
    - `ProjectRole.astro` (Description du rôle)
    - `ProjectCompetences.astro` (Liste des AC)
    - `ProjectLayout.astro` (Layout global pour les projets)

```astro
// Exemple d'utilisation
---
import ProjectLayout from '@layouts/ProjectLayout.astro';
import ProjectHero from '@components/project/ProjectHero.astro';
---

<ProjectLayout>
  <ProjectHero 
    icon="🍽️"
    badge="Stage Professionnel"
    title="Stage - Réservation Cantine"
    description="Amélioration d'un système..."
    tags={['PHP', 'MySQL']}
  />
  <!-- Contenu spécifique au projet -->
</ProjectLayout>
```

#### 2.2 Composant Contact Sous-Utilisé
- **Problème** : Le composant `Contact.astro` est très simple (juste un titre et `<Social />`)
- **Observation** : Sur certaines pages, on parle de "Contactez-moi" mais le composant n'offre pas de vraie section de contact
- **Solution** :
  - Enrichir le composant avec un vrai formulaire de contact
  - Ou ajouter plus d'informations (email, LinkedIn, GitHub)
  - Actuellement, il semble y avoir une section email/LinkedIn qui n'est pas dans ce composant

---

## 🎯 3. Accessibilité & UX

### 🟢 Problèmes Mineurs mais Importants

#### 3.1 Carrousel - Problèmes Identifiés
- **Problème 1** : "Astro: prevBtn is possibly null"
  - Le code ne vérifie pas suffisamment l'existence des éléments
  - ✅ **Déjà corrigé** dans le code actuel (vérification présente)

- **Problème 2** : "le nombre de points de la ou on est dans le carroussel n'est pas calculé en fonction du nombre de card"
  - Les dots sont créés statiquement pour chaque projet
  - Mais la logique de scroll devrait tenir compte du nombre de cartes visibles à l'écran
  - **Solution** : Calculer dynamiquement les dots en fonction de `totalCards / cardsPerView`

#### 3.2 Carrousel - Scroll Horizontal
- **Demande** : "fais en sorte que le carroussel fonctionne avec le scroll"
- **État actuel** : Le carrousel utilise des boutons mais pourrait aussi supporter le scroll natif
- **Solution** :
  - Ajouter `overflow-x: scroll` sur le container
  - Ajouter un event listener sur le scroll pour mettre à jour les dots
  - Améliorer l'expérience tactile sur mobile

#### 3.3 Textes Alternatifs (alt) des Images
- **À vérifier** : Tous les `<Image>` ont-ils des descriptions alt pertinentes ?
- **Importance** : Crucial pour l'accessibilité (lecteurs d'écran)
- **Action** : Audit complet des attributs `alt`

#### 3.4 Navigation au Clavier
- **À tester** : Le carrousel est-il utilisable au clavier (Tab, Flèches) ?
- **À tester** : Les liens et boutons ont-ils des focus visibles ?

---

## 📱 4. Responsive & Mobile

### 🟡 Points à Vérifier

#### 4.1 Test Mobile Systématique
- **Action nécessaire** : Tester toutes les pages sur mobile
- **Points critiques** :
  - Taille des textes (lisibilité)
  - Espacements (pas de débordement)
  - Images (chargement et taille)
  - Carrousel (swipe sur mobile)

#### 4.2 Images Lourdes
- **Observation** : Les images sont en PNG et peuvent être lourdes
- **Solution** :
  - Utiliser le format WebP avec fallback
  - Optimiser les images (compression)
  - Utiliser `loading="lazy"` sauf pour les images above-the-fold

---

## 🚀 5. Performance

### 🟢 Bonnes Pratiques à Appliquer

#### 5.1 Optimisation du Chargement
- **Action** : Audit Lighthouse
- **Points à vérifier** :
  - Score Performance
  - Score Accessibilité
  - Score Best Practices
  - Score SEO

#### 5.2 Code JavaScript
- **Problème potentiel** : Le script du carrousel se répète sur chaque chargement de page
- **Solution** : Externaliser dans un fichier `.js` ou `.ts` séparé

---

## 📝 6. Contenu

### 🔴 Contenu Manquant

#### 6.1 Page Alternance Incomplète
- **État actuel** : Lorem Ipsum uniquement
- **Action urgente** : Remplir avec le vrai contenu
- **À faire** :
  - Définir l'entreprise d'alternance
  - Décrire les missions
  - Lister les technologies utilisées
  - Ajouter des images du projet
  - Définir les compétences acquises

#### 6.2 Page Présentation
- **Observation** : Contenu présent mais pourrait être enrichi
- **Suggestions** :
  - Ajouter une timeline du parcours
  - Ajouter des chiffres clés (années d'études, projets réalisés, etc.)
  - Photo personnelle ?

#### 6.3 Section "À propos" vs Page "Présentation"
- **Problème** : Duplication de contenu
- **Solution** : 
  - Page d'accueil : Version courte et accrocheuse
  - Page Présentation : Version détaillée et complète

---

## 🔧 7. Code Quality & Maintenance

### 🟡 Améliorations Techniques

#### 7.1 TypeScript
- **Observation** : Le projet utilise TypeScript mais peu de typage dans les composants
- **Action** : Ajouter des types pour les props des composants

```typescript
// Exemple
interface ProjectHeroProps {
  icon: string;
  badge: string;
  title: string;
  description: string;
  tags: string[];
}
```

#### 7.2 Configuration Tailwind
- **À vérifier** : Les classes Tailwind custom sont-elles bien définies dans `tailwind.config.cjs` ?
- **Exemple** : `.text-orange`, `.bg-orange` → Créer des couleurs custom

#### 7.3 Gestion des Erreurs
- **Observation** : Le carrousel a un `console.error` mais pas de fallback UI
- **Solution** : Afficher un message gracieux si le carrousel échoue

#### 7.4 Tests
- **Observation** : Des tests Playwright existent (`tests/`)
- **Action** : S'assurer que tous les nouveaux composants sont testés

---

## 📊 8. SEO & Métadonnées

### 🟢 Optimisations SEO

#### 8.1 Balises Meta
- **À vérifier** : Chaque page a-t-elle :
  - Un `<title>` unique et descriptif
  - Une meta description
  - Des Open Graph tags (pour le partage sur réseaux sociaux)

#### 8.2 Sitemap & robots.txt
- **Action** : Générer un sitemap.xml
- **Action** : Créer un robots.txt

---

## 🎨 9. Animations & Interactions

### 🟢 Améliorations UX

#### 9.1 Animations Actuelles
- **Présentes** : 
  - `hover:scale-105` sur les cards
  - `transition-all duration-300`
  - Animations sur les dots du carrousel

- **Suggestions** :
  - Ajouter des animations d'entrée (fade-in, slide-in)
  - Utiliser Intersection Observer pour animer au scroll
  - Ajouter des micro-interactions (hover sur les icônes)

#### 9.2 Page Loader
- **Observation** : Il existe un composant `PageLoader.astro`
- **À vérifier** : Est-il utilisé ? Fonctionne-t-il correctement ?

---

## 🌐 10. Internationalisation

### 🔵 Évolution Future

#### 10.1 Multilingue
- **Question** : Le portfolio sera-t-il traduit en anglais ?
- **Si oui** : Prévoir une structure i18n dès maintenant
- **Astro i18n** : Utiliser le routing i18n d'Astro 3+

---

## ✅ 11. Plan d'Action Prioritaire

### Phase 1 : Corrections Urgentes (1-2 jours)
1. ✅ Unifier la DA sur toutes les pages de projets
2. ✅ Finir la page Alternance avec du vrai contenu
3. ✅ Corriger les problèmes du carrousel (dots dynamiques)
4. ✅ Vérifier les coins arrondis invisibles

### Phase 2 : Refactoring (3-5 jours)
1. Créer des composants réutilisables pour les pages de projets
2. Externaliser le JavaScript du carrousel
3. Ajouter des types TypeScript aux composants
4. Audit et optimisation des images

### Phase 3 : Améliorations (1 semaine)
1. Enrichir le composant Contact avec un formulaire
2. Ajouter des animations au scroll
3. Améliorer l'accessibilité (navigation clavier, focus)
4. Tests Playwright complets

### Phase 4 : Optimisation (2-3 jours)
1. Audit Lighthouse et corrections
2. SEO : Meta tags, sitemap, robots.txt
3. Test sur vrais devices mobiles
4. Documentation du code

---

## 📈 12. Métriques de Succès

### KPIs à Suivre
- ✅ Lighthouse Performance Score > 90
- ✅ Lighthouse Accessibility Score > 95
- ✅ Temps de chargement < 2s
- ✅ 0 erreur de console
- ✅ Mobile-friendly (Google Test)
- ✅ Cohérence visuelle : 100% (même DA partout)

---

## 💡 13. Recommandations Finales

### Ce qui est BIEN dans le Projet Actuel
- ✅ Utilisation d'Astro (excellent choix pour un portfolio)
- ✅ Dark mode implémenté
- ✅ Composants UI de base bien structurés
- ✅ Utilisation de Tailwind CSS
- ✅ Images optimisées avec le composant Image d'Astro
- ✅ Navigation claire et intuitive
- ✅ Tests Playwright en place

### Ce qui DOIT être Amélioré en Priorité
1. **Cohérence visuelle** : Unifier la DA des pages de projets
2. **Réutilisabilité** : Créer des composants pour éviter la duplication
3. **Contenu** : Finir la page Alternance
4. **Carrousel** : Corriger les bugs et améliorer l'UX
5. **Accessibilité** : Navigation clavier et focus visibles

### Conseil Général
- Ne pas chercher à faire trop "fancy" visuellement
- Privilégier la **clarté** et la **lisibilité**
- Un portfolio sobre et professionnel > un portfolio flashy et illisible
- Tester sur de vrais utilisateurs (amis, profs, professionnels)

---

## 📞 Contact & Questions

Pour toute question sur ce plan d'amélioration, n'hésitez pas à :
- Relire ce document régulièrement
- Cocher les tâches au fur et à mesure
- Prioriser selon les deadlines (candidatures, soutenances, etc.)

**Bon courage pour les améliorations ! 🚀**

