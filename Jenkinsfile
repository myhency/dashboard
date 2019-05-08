node {
    checkout scm

    def customImage = docker.build("bass-portal-front-end:${env.BUILD_ID}")

    stage("Run container") {
        sh "docker rm bass-portal-front-end"
        sh "docker run -dt --name bass-portal-front-end -p 3006:3006 bass-portal-front-end:${env.BUILD_ID}"
    }
}