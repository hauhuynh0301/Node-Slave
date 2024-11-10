pipeline {
    agent { label 'nodejs-builder' }  // This defines where the pipeline will run (any available agent)

    environment {
        // Define the Docker Hub credentials ID stored in Jenkins (you'll need to set this up)
        DOCKER_CREDENTIALS = 'docker_credentials'
        DOCKER_IMAGE = 'longn1/react-hello-world'
        TAG = ''  // Will be dynamically set based on commit ID
        GIT_REPO = 'https://github.com/hauhuynh0301/Node-Slave.git' // Your GitHub repository URL
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your repository from GitHub
                git url: GIT_REPO, branch: 'master'  // Ensure you're pulling from the main branch or adjust as needed
            }
        }

        stage('Get Commit ID') {
            steps {
                script {
                    // Get the latest commit hash
                    TAG = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    echo "Commit ID: ${TAG}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image and tag it with the commit ID
                    sh "docker build -t ${DOCKER_IMAGE}:${TAG} ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image to Docker Hub with the commit-based tag
                    sh "docker push ${DOCKER_IMAGE}:${TAG}"
                }
            }
        }
    }

    post {
        success {
            echo 'Docker image pushed successfully to Docker Hub.'
        }
        failure {
            echo 'There was an error pushing the Docker image.'
        }
    }
}
