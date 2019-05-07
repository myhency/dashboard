pipeline {
    agent {
        docker { image 'node:6-alpine' }
    }

    stages {
        stage('Docker Build') {
            steps {
                sh 'apk add --update python make g++'
            }
        }
    }
}