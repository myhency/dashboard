node {
    checkout scm

    def customImage = docker.build("bass-portal-front-end:${env.BUILD_ID}")

    stage("Run container") {
        try {
            sh "docker stop bass-portal-front-end"
            sh "docker rm bass-portal-front-end"
            sh "docker system prune --force"
        } catch (exc) {
            echo 'bass-portal-front-end exists'
            // throw
        } finally {
            sh "docker run -dt --name bass-portal-front-end -p 3006:3006 bass-portal-front-end:${env.BUILD_ID}"
        }
    }

    stage("Save container"){
        try {
            sh "docker save -o bass-portal-front-end-latest.tar bass-portal-front-end:${env.BUILD_ID}"
            sh "docker rmi bass-portal-front-end:${env.BUILD_ID}"
            sh "scp -P 1322 bass-portal-front-end-latest.tar devadmin@10.40.111.56:/var/www/html"
            sh "ssh devadmin@10.40.111.56 -p 1322 chmod 664 /var/www/html/bass-portal-front-end-latest.tar"
            echo 'bass-portal-front-end file copy completed'
        } catch (exc) {
            echo 'bass-portal-front-end not exists(something wrong)'
            // throw
        } finally {
            sh "rm bass-portal-front-end-latest.tar"
        }
    }
}