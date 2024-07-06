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
        DOCKER_HUB_REPO = 'chanukawelagedara/ci_cd_pro_cuban'
        BACKEND_TAG = '14-backend'
        FRONTEND_TAG = '14-frontend'
    }

    stages {
        stage('SCM Checkout')  {
            steps {
                // Git checkout step
                git branch: "main", url: "https://github.com/ChanukaWelagedara/CI_CD_Pro.git"
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker-compose build'
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
            bat "docker tag ci_cd_pro_backend:latest %DOCKER_HUB_REPO%:%BACKEND_TAG%"
            bat "docker tag ci_cd_pro_frontend:latest %DOCKER_HUB_REPO%:%FRONTEND_TAG%"
        }
    }
}


   stage('Push Docker Images') {
    steps {
        script {
            bat "docker push %DOCKER_HUB_REPO%:%BACKEND_TAG%"
            bat "docker push %DOCKER_HUB_REPO%:%FRONTEND_TAG%"
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
