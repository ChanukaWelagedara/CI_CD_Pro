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

    stages {
        stage('SCM Checkout') {
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
                // Ensure the credentials ID matches the ID in Jenkins credentials store
                withCredentials([string(credentialsId: 'CICDPro', variable: 'CICDPro')]) {
                    script {
                        // Use secure login method
                        bat "echo %CICDPro% | docker login -u chanukawelagedara --password-stdin"
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push chanukawelagedara/nodeapp-cuban:%BUILD_NUMBER%'
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
