![Uploading Architecture_CI_CD.png…]()

Cette architecture montre comment GitHub Actions et Docker Hub travaillent ensemble pour 
automatiser le processus de développement, du commit du code jusqu'au déploiement des images 
Docker. - - 
Intégration Continue : Processus d'automatisation pour la compilation et les tests après 
chaque commit. 
Déploiement Continu : Déploiement automatique des images Docker vers Docker Hub 
après chaque intégration réussie. 
Vue d'Ensemble du Workflow CI/CD 
1. Commit de Code : Les développeurs committent leurs modifications Dans GitHup 
2. Checkout du code : On a utilisé GitHup Aciton pour commence le processus CI  
o qui fait Les tests automatisés sont exécutés pour vérifier la fonctionnalité et la 
correction du code. 
o Cette  tests incluent des tests unitaires, des tests d'intégration, et d'autres suites de 
tests automatisés. 
3. Configuration du Fichier Docker : GitHub Actions utilise un fichier de configuration 
Docker (Dockerfile) pour définir comment construire l'image Docker. 
4. Construction de l'Image Docker : GitHub Actions construit l'image Docker en utilisant le 
Dockerfile. 
5. Push de l'Image vers Docker Hub : Une fois l'image Docker construite, elle est poussée 
vers Docker Hub pour le stockage et le déploiement. 
6. Déploiement : Les artéfacts sont déployés automatiquement. 
 Le pipeline CI/CD assure une intégration et un déploiement continus en surveillant les 
commits et en déclenchant automatiquement la construction et le déploiement des nouvelles 
images. 
Objectif du Checkout 
L'objectif principal du checkout est d'assurer que l'environnement de build CI/CD dispose de la 
version la plus récente et correcte du code source pour effectuer des tâches comme la compilation, 
les tests, la construction d'images Docker, et le déploiement.  
  GitHub : Utilisé pour héberger le code source et gérer les versions du projet. 
  GitHub Actions : Utilisé pour créer le pipeline CI/CD qui automatise les étapes de construction, 
de test et de déploiement. 
  Python : Le langage utilisé pour développer l'application Flask dans le projet. 
  Flask : Un framework léger en Python pour créer des applications web. 
  Docker : Utilisé pour containeriser l'application afin de garantir qu'elle fonctionne de manière 
cohérente dans différents environnements. 
  Docker Hub : Un registre Docker où les images Docker sont stockées et accessibles pour le 
déploiement. 
  Virtualenv : Un outil pour créer des environnements virtuels Python afin d'isoler les 
dépendances. 
  pytest : Utilisé pour exécuter des tests automatisés dans le cadre du pipeline CI. 
  Git : Utilisé pour le contrôle de version, permettant de gérer et de suivre les modifications du 
code source. 
Create a New Repository on GitHub 
Push Your Code to GitHub 
Configurer GitHub Actions pour CI/CD  
Verify CI Pipeline git pull origin main –rebase 
Create new repository in docker hub 
Add Docker Hub Username and Password 
Update GitHub Actions Workflow 
Create a Test App File and Dockerfile  
Add TestAppFile and Dockerfile to Git 
Docker Deployment  and test image 
We Make an Error to See if Pytest will Detects It 
Pytest Detects the error 
test_app.py : Ce fichier contient les tests pour notre application Flask en utilisant Pytest.  
Dockerfile : Ce fichier décrit comment construire l'image Docker de notre application Flask : 
pylint.yml : Ce fichier configure GitHub Actions pour automatiser les tests et le déploiement de notre 
application  
Explication des Commentaires 
 test_app.py : 
o client(): Configure l'application Flask en mode test et crée un client de test. 
o test_index(client): Envoie une requête GET à la route / et vérifie que le statut 
de la réponse est 200 OK. 
 Dockerfile : 
o FROM python:3.8-slim: Utilise l'image officielle de Python 3.8 à partir de Docker 
Hub. 
o WORKDIR /app: Définit le répertoire de travail dans le conteneur. 
o COPY . /app: Copie le contenu du répertoire actuel dans le conteneur à /app. 
o RUN pip install --no-cache-dir -r requirements.txt: Installe les packages 
nécessaires spécifiés dans requirements.txt. 
o EXPOSE 5000: Rend le port 5000 disponible pour le monde extérieur au conteneur. 
o ENV NAME World: Définit une variable d'environnement. 
o CMD ["python", "app.py"]: Exécute app.py lorsque le conteneur est lancé. 
 pylint.yml : 
o on: push: La pipeline s'exécute sur les pushs vers la branche main. 
o jobs: build: Décrit le job de build qui utilise un conteneur Ubuntu. 
 steps: 
 Checkout code: Vérifie le code source. 
 Set up Python: Configure Python. 
 Install dependencies: Installe les dépendances du fichier 
requirements.txt. 
 Run tests: Exécute les tests avec Pytest. 
o jobs: deploy: Décrit le job de déploiement qui dépend du job de build. 
 steps: 
 Checkout code: Vérifie le code source. 
 Log in to Docker Hub: Se connecte à Docker Hub. 
 Build the Docker image: Construit l'image Docker. 
Push the Docker image: Pousse l'image Docker vers Docker Hub.
