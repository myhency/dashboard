pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}