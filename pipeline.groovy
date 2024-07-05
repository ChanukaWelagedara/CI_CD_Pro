pipeline {
    agent any
triggers{
    githubPush()
  }
    environment {
        REPO_URL = 'https://github.com/ChanukaWelagedara/CI_CD_Pro.git'
        BRANCH = 'main'
        APP_NAME = 'Music-Instruments'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    sh '''
                    docker-compose push
                    '''
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}


