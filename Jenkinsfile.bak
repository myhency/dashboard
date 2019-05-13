pipeline {
  environment {
    registry = "10.40.111.60:5000/baas-portal-front"
    registryCredential = ''
    dockerImage = ''
  }
  agent any
  tools {nodejs "node" }
  stages {
    // stage('Cloning Git') {
    //   steps {
    //     git 'http://10.40.111.60:10080/baas/portal-front.git'
    //   }
    // }
    stage('Build') {
       steps {
         sh 'npm install'
       }
    }
    // stage('Test') {
    //   steps {
    //     sh 'npm test'
    //   }
    // }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps{
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
  }
}

