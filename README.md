# 🚀 Portfolio Personnel - Gauthier Souquet

Un portfolio moderne et interactif développé avec **Astro**, incluant un système de contact fonctionnel avec envoi d'emails automatisé.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration du formulaire de contact](#configuration-du-formulaire-de-contact)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Déploiement](#déploiement)
- [Contribution](#contribution)

## 🎯 Aperçu

Portfolio personnel présentant mes compétences, projets et expériences en tant qu'étudiant en informatique. Le site inclut un formulaire de contact fonctionnel avec envoi d'emails automatique et confirmation.

### 🌟 Fonctionnalités

- ✨ **Design moderne** avec animations fluides et effets hover
- 🌙 **Mode sombre/clair** adaptatif
- 📱 **Responsive design** optimisé pour tous les écrans
- 📧 **Formulaire de contact** avec envoi d'emails automatique
- ⚡ **Performance optimisée** avec Astro
- 🎨 **Interface utilisateur** intuitive et accessible
- 🔒 **Sécurisé** avec validation côté serveur et client

## 🛠️ Technologies utilisées

- **[Astro](https://astro.build/)** - Framework web moderne
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Nodemailer](https://nodemailer.com/)** - Envoi d'emails Node.js
- **JavaScript** - Interactivité côté client
- **HTML5 & CSS3** - Structure et style

## 📦 Installation

### Prérequis

- **Node.js** (version 18+ recommandée)
- **Yarn** package manager
- **Compte email** (Gmail recommandé)

### 1. Cloner le projet

```bash
git clone <url-du-repository>
cd portfolio-gauthier
```

### 2. Installer les dépendances

```bash
yarn install
```

### 3. Installer Nodemailer pour le formulaire de contact

```bash
yarn add nodemailer
```

## 📧 Configuration du formulaire de contact

### 1. Créer le fichier de variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Configuration Gmail (Recommandé)
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application

# Alternative Outlook/Hotmail
# EMAIL_SERVICE=outlook
# EMAIL_HOST=smtp-mail.outlook.com
# EMAIL_PORT=587

# Serveur SMTP personnalisé
# EMAIL_HOST=smtp.votre-domaine.com
# EMAIL_PORT=587
# EMAIL_SECURE=false
```

### 2. Configuration Gmail (Méthode recommandée)

#### Étape A : Activer l'authentification à 2 facteurs
1. Allez sur [myaccount.google.com](https://myaccount.google.com)
2. **Sécurité** → **Authentification à 2 facteurs** → **Activer**

#### Étape B : Générer un mot de passe d'application
1. **Sécurité** → **Mots de passe des applications**
2. Sélectionnez **"Autre (nom personnalisé)"**
3. Tapez **"Portfolio Contact"**
4. Cliquez sur **"Générer"**
5. Copiez le mot de passe de 16 caractères dans `EMAIL_PASS`

### 3. Configuration alternative (Outlook)

Pour utiliser Outlook/Hotmail :

```env
EMAIL_SERVICE=outlook
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=votre.email@outlook.com
EMAIL_PASS=votre_mot_de_passe
```

### 4. Modifier l'email de réception

Dans `src/pages/api/contact.js`, ligne 47, changez :

```javascript
to: 'votre.email@exemple.com', // Votre email de réception
```

## 🚀 Scripts disponibles

### Développement

```bash
# Lancer le serveur de développement
yarn dev

# Lancer avec un port spécifique
yarn dev --port 3000
```

Le site sera accessible sur `http://localhost:4321`

### Build et Preview

```bash
# Construire pour la production
yarn build

# Prévisualiser le build de production
yarn preview

# Build + Preview en une commande
yarn build && yarn preview
```

### Autres commandes utiles

```bash
# Vérifier le code avec Astro
yarn astro check

# Nettoyer le cache
yarn astro clean

# Voir toutes les commandes disponibles
yarn astro --help
```

## 🧪 Test du formulaire de contact

### Test en développement

1. Lancez le serveur : `yarn dev`
2. Allez sur `/contact`
3. Remplissez et envoyez le formulaire
4. Vérifiez vos emails (inbox + dossier spam)

### Validation des tests

- ✅ Envoi avec tous les champs remplis
- ✅ Tentative d'envoi avec champs vides
- ✅ Test avec email invalide
- ✅ Réception de l'email principal
- ✅ Réception de l'email de confirmation

## 🌐 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
yarn global add vercel

# Déployer
vercel

# Configurer les variables d'environnement
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
```

### Netlify

```bash
# Build du projet
yarn build

# Le dossier dist/ est prêt pour le déploiement
```

**Important** : N'oubliez pas de configurer les variables d'environnement dans votre plateforme de déploiement.

## 🔒 Sécurité

### Variables d'environnement

- ❌ **Jamais** commiter le fichier `.env.local`
- ✅ Ajouter `.env.local` au `.gitignore`
- ✅ Utiliser des mots de passe d'application
- ✅ Configurer les variables sur la plateforme de déploiement

### Bonnes pratiques

- Utilisez toujours HTTPS en production
- Validez les données côté serveur ET client
- Surveillez les logs d'erreur
- Mettez à jour régulièrement les dépendances

## 🐛 Dépannage

### Problèmes courants

**Le formulaire ne s'envoie pas :**
- Vérifiez que `.env.local` existe et contient les bonnes valeurs
- Vérifiez que Nodemailer est installé : `yarn add nodemailer`
- Consultez les logs dans la console du navigateur

**Emails non reçus :**
- Vérifiez le dossier spam
- Testez avec un autre email
- Vérifiez la configuration Gmail (2FA + mot de passe d'application)

**Erreur 500 :**
- Vérifiez les variables d'environnement
- Consultez les logs du serveur
- Vérifiez que l'API `/api/contact.js` existe

## 📞 Support

Pour toute question ou problème :

- 📧 Email : [Gauthier.34m@gmail.com](mailto:Gauthier.34m@gmail.com)
- 💼 LinkedIn : [Gauthier Souquet](https://www.linkedin.com/in/gauthier-souquet-878aab202/)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

⭐ **Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !**

Développé avec ❤️ par [Gauthier Souquet](https://github.com/votre-username)