pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        IMAGE_NAME = 'project-09-playwright:v1'
        PROJECT_DIR = '/home/kiran-personal/Desktop/project-09'
    }

    stages {
        stage('Checkout / Workspace Check') {
            steps {
                sh '''
                    echo "Checking Project 09 files..."
                    test -f "$PROJECT_DIR/Dockerfile"
                    test -f "$PROJECT_DIR/package.json"
                    test -f "$PROJECT_DIR/playwright.config.ts"
                    echo "Project files found."
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    cd "$PROJECT_DIR"
                    docker build -t "$IMAGE_NAME" .
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                    cd "$PROJECT_DIR"
                    mkdir -p docker-results playwright-report
                    docker run --rm --init --ipc=host \
                      -e CI=true \
                      -v "$PROJECT_DIR/docker-results:/app/test-results" \
                      -v "$PROJECT_DIR/playwright-report:/app/playwright-report" \
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
