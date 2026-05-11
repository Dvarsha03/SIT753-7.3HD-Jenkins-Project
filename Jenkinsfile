pipeline {
    agent any

    environment {
        IMAGE_NAME = "sit753-jenkins-app"
        CONTAINER_NAME = "sit753-container"
    }

    stages {

        stage('Build') {
            steps {
                echo 'Installing dependencies and building project...'
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality check...'
                bat 'npx eslint . || exit 0'
            }
        }

        stage('Security') {
            steps {
                echo 'Running security scan...'
                bat 'npm audit || exit 0'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t %IMAGE_NAME% .'

                echo 'Stopping old container if it exists...'
                bat 'docker stop %CONTAINER_NAME% || exit 0'
                bat 'docker rm %CONTAINER_NAME% || exit 0'

                echo 'Deploying application container...'
                bat 'docker run -d -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%'
            }
        }

        stage('Release') {
            steps {
                echo "Release created for build number: ${BUILD_NUMBER}"
                echo "Release version: v1.0.${BUILD_NUMBER}"
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking application health endpoint...'
                bat 'curl http://localhost:3000/health'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Please check the console output.'
        }
    }
}