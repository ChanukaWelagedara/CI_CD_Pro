// pipeline {
//     agent any

//     stages {
//         stage('Clone Repository') {
//             steps {
//                 // Git checkout step
//                 git branch: "main", url: "https://github.com/ChanukaWelagedara/CI_CD_Pro.git"
//             }
//         }

//         stage('Build Docker Images') {
//             steps {
//                 script {
//                     // Build Docker images using Docker Compose
//                     bat 'docker-compose build'
//                 }
//             }
//         }

//         stage('Push Docker Images') {
//             steps {
//                 script {
//                     // Push Docker images using Docker Compose
//                     bat 'docker-compose push'
//                 }
//             }
//         }

//         stage('Deploy Application') {
//             steps {
//                 script {
//                     // Restart Docker containers using Docker Compose
//                     bat 'docker-compose down'
//                     bat 'docker-compose up -d'
//                 }
//             }
//         }
//     }
// }





// withCredentials([string(credentialsId: 'CI_CD_Pro_Pass', variable: 'CI_CD_Pro_Pass')]) {
//     // some block
// }

pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'chanukawelagedara/ci_cd_pro'
        BACKEND_TAG = 'backend'
        FRONTEND_TAG = 'frontend'
        COMPOSE_HTTP_TIMEOUT = '200' // Increase the timeout value if necessary
    }

    stages {
        stage('SCM Checkout') {
            steps {
                // Git checkout step
                git branch: "main", url: "https://github.com/ChanukaWelagedara/CI_CD_Pro.git"
            }
        }
        stage('Build API Docker Image') {
            steps {
                dir('backend') {
                    bat 'docker build -t chanukawelagedara/apiappv1:%BUILD_NUMBER% .'
                }
            }
        }

        stage('Build Client Docker Image') {
            steps {
                dir('frontend') {
                    bat 'docker build -t chanukawelagedara/clientappv1:%BUILD_NUMBER% .'
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'CICDPro', variable: 'CICDPro')]) {
                    script {
                        bat "docker login -u chanukawelagedara -p %CICDPro%"
                    }
                }
            }
        }

        stage('Tag Docker Images') {
            steps {
                script {
                    bat "docker tag chanukawelagedara/apiappv1:%BUILD_NUMBER% %DOCKER_HUB_REPO%:%BACKEND_TAG%"
                    bat "docker tag chanukawelagedara/clientappv1:%BUILD_NUMBER% %DOCKER_HUB_REPO%:%FRONTEND_TAG%"
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                script {
                    bat 'docker images' // List images to verify they exist

                    retry(5) { // Increase retry count
                        bat "docker push %DOCKER_HUB_REPO%:%BACKEND_TAG%"
                    }
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    bat 'docker images' // List images to verify they exist

                    retry(5) { // Increase retry count
                        bat "docker push %DOCKER_HUB_REPO%:%FRONTEND_TAG%"
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    // Stop existing Docker containers
                    bat 'docker-compose down'
                    
                    // Pull the latest Docker image from Docker Hub
                    bat 'docker-compose pull'
                    
                    // Start Docker containers
                    bat 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}

