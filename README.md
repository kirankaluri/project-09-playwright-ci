# Project 09 — Playwright Automation Testing with Jenkins CI

## Overview

Project 09 is a hands-on test automation project using Playwright and TypeScript. It demonstrates browser-based UI testing, Docker-based test execution, and Continuous Integration (CI) using Jenkins.

The project uses the SauceDemo website to demonstrate login validation, product selection, cart functionality, and common Playwright locator techniques.

## Technology Stack

- **Automation:** Playwright
- **Language:** TypeScript
- **Runtime:** Node.js
- **Package manager:** npm
- **Containerization:** Docker
- **CI/CD:** Jenkins
- **Test reporting:** Playwright HTML Report and Jenkins HTML Publisher
- **Browser:** Chromium

## Project Structure

```text
project-09/
├── tests/
│   ├── locator-demo.spec.ts
│   ├── locator-demo2.spec.ts
│   ├── multiple-elements.spec.ts
│   ├── saucedemo-home.spec.ts
│   ├── saucedemo-cart.spec.ts
│   ├── saucedemo-login.spec.ts
│   └── saucedemo-login-negative.spec.ts
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

## Test Coverage

The project includes seven automated tests covering:

1. SauceDemo home page loading
2. Successful login
3. Login failure with invalid credentials
4. Adding a product to the shopping cart
5. Playwright locator examples
6. Working with multiple page elements

## Prerequisites

For local execution, install:

- Node.js compatible with the project's Playwright version
- npm
- Git

Docker and Jenkins are required for the corresponding container and CI workflows.

## Run Tests Locally

Clone the repository:

```bash
git clone https://github.com/kirankaluri/project-09-playwright-ci.git
cd project-09-playwright-ci
```

Install dependencies:

```bash
npm ci
```

Install the Playwright Chromium browser and required browser dependencies:

```bash
npx playwright install --with-deps chromium
```

Run the tests:

```bash
npm test
```

Run tests with a visible browser:

```bash
npm run test:headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Docker Execution

Build the Docker image:

```bash
docker build -t project-09-playwright:v1 .
```

Run the tests inside the container:

```bash
docker run --rm project-09-playwright:v1
```

The Docker image uses the Playwright `v1.64.1-noble` base image.

## Jenkins CI Pipeline

The project is configured with a Jenkins job named `Project-09-Playwright-CI`.

The demonstrated pipeline workflow includes:

1. Building the Docker image
2. Executing Playwright tests
3. Collecting test results
4. Publishing the HTML report in Jenkins

The Jenkins HTML Publisher plugin is used to make the Playwright report accessible from the Jenkins job.

## Latest Verified Test Result

The latest reported local test run completed successfully:

- **Tests passed:** 7
- **Tests failed:** 0
- **Execution time:** Approximately 7.7 seconds

Test results may vary depending on browser setup, network access, and the availability of the test website.

## Learning Objectives

This project demonstrates hands-on experience with:

- Browser UI automation using Playwright
- TypeScript-based test organization
- Automated login and shopping-cart validation
- Docker image creation and containerized test execution
- Jenkins pipeline integration
- HTML test reporting
- Git and GitHub source control

## Disclaimer

This is a learning and portfolio project. It demonstrates hands-on practice and should not be interpreted as professional production DevOps experience.
