node {
    checkout scm

    def customImage = docker.build("bass-portal-front-end:${env.BUILD_ID}")

    stage("Run container") {
        try {
            sh "docker stop bass-portal-front-end"
            sh "docker rm bass-portal-front-end"
        } catch (exc) {
            echo 'bass-portal-front-end exists'
            // throw
        } finally {
            sh "docker run -dt --name bass-portal-front-end -p 3006:3006 bass-portal-front-end:${env.BUILD_ID}"
        }
    }

    stage("Save container"){
        try {
            sh "docker save -o bass-portal-front-end-${env.BUILD_ID}.tar bass-portal-front-end:${env.BUILD_ID}"
        } catch (exc) {
            echo 'bass-portal-front-end not exists'
            // throw
        } finally {
            echo 'bass-portal-front-end saved'
        }
    }
}