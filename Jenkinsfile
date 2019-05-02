pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'
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