pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'
            args '-p 3006:3006'
            args '--name bass-portal-front-end'
        }
    }
    environment {
        CI = 'true'
        registry = "10.40.111.60:5000/baas-portal-front"
        registryCredential = ''
        dockerImage = ''
  
    }
    stages {
        stage('Build') { 
            steps {
                // sh 'chmod 777 ./jenkins/scripts/kill.sh'
                // sh './jenkins/scripts/kill.sh'
                sh 'npm install' 
            }
        }
        // stage('Test') {
        //     steps {
        //         sh 'chmod 777 ./jenkins/scripts/test.sh'
        //         sh './jenkins/scripts/test.sh'
        //     }
        // }
        // stage('Deliver') {
        //     steps {
        //         sh 'chmod 777 ./jenkins/scripts/deliver.sh'
        //         sh './jenkins/scripts/deliver.sh'
        //         // input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //         // sh './jenkins/scripts/kill.sh'
        //     }
        // }
        // stage('Building image') {
        //     steps{
        //         script {
        //             dockerImage = docker.build registry + ":$BUILD_NUMBER"
        //         }
        //     }
        // }
        // stage('Deploy Image') {
        //     steps{
        //         script {
        //             docker.withRegistry( '', registryCredential ) {
        //             dockerImage.push()
        //         }
        //        }
        //     }
        // }
        // stage('Remove Unused docker image') {
        //     steps{
        //         sh "docker rmi $registry:$BUILD_NUMBER"
        //     }
        // }
            dockerImage = docker.build registry + ":$BUILD_NUMBER"
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
        }
    }
}
