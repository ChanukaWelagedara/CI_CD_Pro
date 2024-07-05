pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Git checkout step
                git branch: "main", url: "https://github.com/ChanukaWelagedara/CI_CD_Pro.git"
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build Docker images using Docker Compose
                    sh 'docker-compose build'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Push Docker images using Docker Compose
                    sh 'docker-compose push'
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    // Restart Docker containers using Docker Compose
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
