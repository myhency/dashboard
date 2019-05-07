pipeline {
    agent {
        docker { 
            image 'node:6-alpine' 
            args '-p 3006:3006'
            args '--name bass-portal-front-end'
            label 'baas-portal-front'
        }
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Docker Build') {
            steps {
                sh 'apk add --update python make g++'
            }
        }

        stage('NPM Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}

// node {
//     checkout scm

//     docker.withRegistry('10.40.111.60:5000/baas-portal-front') {

//         def customImage = docker.build("my-image:${env.BUILD_ID}")

//         /* Push the container to the custom Registry */
//         customImage.push()
//     }
// }