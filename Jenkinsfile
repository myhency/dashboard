node {
    checkout scm

    def customImage = docker.build("baas-portal-front-end:${env.BUILD_ID}")

    stage("Run container") {
        try {
            sh "docker stop baas-portal-front-end"
            sh "docker rm baas-portal-front-end"
            // sh "docker system prune --force"
        } catch (exc) {
            echo 'baas-portal-front-end exists'
            // throw
        } finally {
            sh "docker run -dt --name baas-portal-front-end -p 3006:3006 baas-portal-front-end:${env.BUILD_ID}"
        }
    }

    stage("Save container"){
        try {
            previousBuildNumber = "${env.BUILD_ID}" as Integer
            sh "docker save -o baas-portal-front-end-latest.tar baas-portal-front-end:${env.BUILD_ID}"
            sh "docker rmi baas-portal-front-end:" + (previousBuildNumber - 1)
            sh "scp -P 1322 baas-portal-front-end-latest.tar devadmin@10.40.111.56:/var/www/html"
            sh "ssh devadmin@10.40.111.56 -p 1322 chmod 664 /var/www/html/baas-portal-front-end-latest.tar"
            echo 'baas-portal-front-end file copy completed'
        } catch (exc) {
            echo 'baas-portal-front-end not exists(something wrong)'
            // echo "${env}"
            // throw
        } finally {
            sh "rm baas-portal-front-end-latest.tar"
        }
    }
}