
pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        IMAGE_NAME = "project-09-playwright:${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout / Workspace Check') {
            steps {
                sh '''
                    echo "Checking GitHub checkout..."
                    test -f Dockerfile
                    test -f package.json
                    test -f package-lock.json
                    test -f playwright.config.ts
                    test -d tests
                    echo "Project files found in Jenkins workspace."
                    echo "Workspace: $WORKSPACE"
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t "$IMAGE_NAME" .'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                    mkdir -p docker-results playwright-report

                    docker run --rm --init --ipc=host \
                      -e CI=true \
                      -v "$WORKSPACE/docker-results:/app/test-results" \
                      -v "$WORKSPACE/playwright-report:/app/playwright-report" \
                      "$IMAGE_NAME"
                '''
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    reportName: 'Playwright HTML Report',
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: true
                ])
            }
        }
    }

    post {
        always {
            echo 'Project 09 pipeline execution finished.'
        }
    }
}

