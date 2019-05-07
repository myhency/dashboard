// pipeline {
//     agent {
//         docker { image 'node:6-alpine' }
//     }

//     stages {
//         stage('Docker Build') {
//             steps {
//                 sh 'apk add --update python make g++'
//             }
//         }
//     }
// }

node {
    checkout scm

    docker.withRegistry('10.40.111.60:5000/baas-portal-front') {

        def customImage = docker.build("my-image:${env.BUILD_ID}")

        /* Push the container to the custom Registry */
        customImage.push()
    }
}