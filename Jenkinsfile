node {
    checkout scm

    stage("Prod-like") {
        steps {
            sh "echo $DOCKER_TLS_VERIFY"
        }
    }

    def customImage = docker.build("bass-portal-front-end:${env.BUILD_ID}")

    customImage.inside {
        sh 'npm install'   
    }

    docker.withRegistry('http://10.40.111.60:5000/baas-portal-front-end') {
        customImage.push()
    }
}
// pipeline {
//     agent {
//         docker { 
//             image 'node:6-alpine' 
//             args '-p 3006:3006'
//             args '--name bass-portal-front-end'
//             // label 'baas-portal-front'
//         }
//     }

//     environment {
//         CI = 'true'
//     }

//     stages {
//         stage('Docker Build') {
//             steps {
//                 sh 'apk add --update python make g++'
//             }
//         }

//         stage('NPM Build') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Deploy Image') {
//             steps{
//                 script {
//                     docker.withRegistry('10.40.111.60:5000/bass-portal-front-end') {
//                         dockerImage.push()
//                    }
//                 }
//             }
//         }
//     }
// }

// // node {
// //     checkout scm

// //     docker.withRegistry('10.40.111.60:5000/baas-portal-front') {

// //         def customImage = docker.build("my-image:${env.BUILD_ID}")

// //         /* Push the container to the custom Registry */
// //         customImage.push()
// //     }
// // }

// pipeline {
//   environment {
//     registry = "10.40.111.60:5000/baas-portal-front"
//     registryCredential = ''
//     dockerImage = ''
//   }
//   agent any
  
//   tools {nodejs "node" }
//   stages {
    
//     stage('Build') {
//        steps {
//          sh 'npm install'
//        }
//     }

//     stage('Building image') {
//       steps{
//         script {
//           dockerImage = docker.build registry + ":$BUILD_NUMBER"
//         }
//       }
//     }
//     stage('Deploy Image') {
//       steps{
//          script {
//             docker.withRegistry( '', registryCredential ) {
//             dockerImage.push()
//           }
//         }
//       }
//     }
//     stage('Remove Unused docker image') {
//       steps{
//         sh "docker rmi $registry:$BUILD_NUMBER"
//       }
//     }
//   }
// }