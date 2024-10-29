# CI/CD Pipeline for Automated Docker Deployment using GitHub Actions

This project demonstrates a CI/CD pipeline setup using **GitHub Actions** and **Docker Hub** to automate the integration, testing, and deployment process of a Python Flask application. By leveraging containerization with Docker, this pipeline ensures consistent application deployment across various environments.

## Overview

The pipeline is designed to:
1. Automate testing and validation of code changes after each commit.
2. Build a Docker image of the application.
3. Push the Docker image to Docker Hub for storage and easy deployment.

## Architecture

![Architecture_CI_CD](https://github.com/user-attachments/assets/0f0a0ff4-ac3f-4434-ad54-c1165874a3e6)

## Workflow Steps

1. **Code Commit**: Developers commit code to GitHub, triggering the CI/CD process.
2. **Checkout Code**: GitHub Actions checks out the latest code.
3. **Testing**: Automated tests using `pytest` are run to ensure code quality and functionality. This includes:
   - Unit tests
   - Integration tests
4. **Docker Image Build**: GitHub Actions uses a `Dockerfile` to build the Docker image of the Flask application.
5. **Push to Docker Hub**: The built image is pushed to Docker Hub, making it accessible for deployment.
6. **Deployment**: Artifacts are automatically deployed from Docker Hub as needed.

## Key Components

- **GitHub Actions**: Automates CI/CD tasks like testing, building, and deployment.
- **Docker** & **Docker Hub**: Used to containerize the application and host Docker images.
- **Flask**: A lightweight Python web framework for building web applications.
- **pytest**: Executes automated tests as part of the CI pipeline.
- **Virtualenv**: Manages isolated Python environments to ensure dependency consistency.
- **Git**: Used for version control, tracking changes to the source code.

## File Descriptions

- **test_app.py**: Contains the `pytest` tests for the Flask application.
  - `client()`: Sets up the Flask application in test mode.
  - `test_index(client)`: Sends a GET request to the `/` route and verifies a 200 OK status.
- **Dockerfile**: Defines the Docker image for the Flask application.
  - **FROM python:3.8-slim**: Uses the official Python 3.8 slim image.
  - **WORKDIR /app**: Sets the working directory inside the container.
  - **COPY . /app**: Copies the code into the container.
  - **RUN pip install --no-cache-dir -r requirements.txt**: Installs dependencies.
  - **EXPOSE 5000**: Opens port 5000 for external access.
  - **CMD ["python", "app.py"]**: Runs the application.
- **pylint.yml**: Configures GitHub Actions for automating testing and deployment.
  - **on: push**: Triggers on pushes to the `main` branch.
  - **jobs: build**: Specifies the build job with testing steps.
  - **jobs: deploy**: Specifies the deployment job that depends on a successful build.

## How to Set Up

1. **Create a GitHub Repository**: Initialize a new repository on GitHub and push your code.
2. **Configure GitHub Actions**:
   - Add a GitHub Actions workflow file (e.g., `pylint.yml`) to define the CI/CD pipeline steps.
3. **Set Up Docker Hub**:
   - Create a new repository on Docker Hub.
   - Add your Docker Hub credentials to GitHub as secrets for secure access.
4. **Add Test and Docker Files**:
   - Add `test_app.py` for testing and `Dockerfile` for building the Docker image.
5. **Verify CI Pipeline**:
   - Push code changes and observe the GitHub Actions workflow for testing, building, and pushing the Docker image.


