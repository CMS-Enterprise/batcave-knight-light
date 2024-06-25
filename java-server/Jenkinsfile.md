# Jenkinsfile Documentation for Maven Projects

This document provides a detailed explanation of a Jenkinsfile template designed for Application Development Organizations to adapt for their own Maven projects. This template leverages Kubernetes for containerized builds and can be customized as per project requirements.

## Jenkinsfile Breakdown

### Agent Configuration

The pipeline utilizes a Kubernetes agent, defined using the `kubernetes` block. This sets up a pod with a Maven container.

```groovy
pipeline {
  agent {
    kubernetes {
      yaml """
      apiVersion: v1
      kind: Pod
      spec:
        restartPolicy: Never
        containers:
        - name: maven
          image: artifactory.cloud.cms.gov/docker/maven:3.8.5-openjdk-17
          command: ['tail', '-f', '/dev/null']
      """
    }
  }
```

- **apiVersion:** Specifies the Kubernetes API version.
- **kind:** Defines the kind of Kubernetes object, in this case, a Pod.
- **spec:** Contains the specifications for the Pod.
  - **restartPolicy:** Set to `Never` to prevent the Pod from restarting.
  - **containers:** Defines the containers within the Pod.
    - **name:** Name of the container (`maven`).
    - **image:** Docker image to use (`maven:3.8.5-openjdk-17`).
    - **command:** Command to keep the container running (`tail -f /dev/null`).

### Stages

The pipeline is divided into three stages: Build, Test, and Delivery.

#### Stage: Build

This stage compiles the Maven project.

```groovy
  stages {
    stage('Build') {
      steps {
        container('maven') {
          dir('java-server') {
            sh 'mvn package'
          }
        }
      }
    }
```

- **container:** Specifies the container (`maven`) to run the build steps.
- **dir:** Changes the directory to `java-server`.
- **sh:** Executes the `mvn package` command to compile the project.

#### Stage: Test

This stage runs the unit tests for the Maven project.

```groovy
    stage ('Test') {
      steps {
        container('maven') {
          dir('java-server') {
            sh 'mvn test'
          }
        }
      }
    }
```

- **container:** Specifies the container (`maven`) to run the test steps.
- **dir:** Changes the directory to `java-server`.
- **sh:** Executes the `mvn test` command to run the tests.

#### Stage: Delivery

This stage handles the delivery process, triggering another Jenkins job for deployment.

```groovy
    stage('Delivery') {
      steps {
        build(job: 'Java Server Delivery', wait: true, propagate: true, parameters: [
          string(name: 'tag', value: "${GIT_COMMIT[0..7]}"),
          string(name: 'git_repository', value: "${scm.userRemoteConfigs[0].url}"),
          string(name: 'git_credentials', value: "${scm.userRemoteConfigs[0].credentialsId}"),
          string(name: 'git_commit', value: "${GIT_COMMIT}"),
          string(name: 'build_dir', value: 'java-server'),
          string(name: 'dockerfile', value: 'java-server/Dockerfile')
        ])
        container('build') {
          echo 'Child pipeline completed'
        }
      }
    }  
  }
}
```

- **build:** Triggers the `Java Server Delivery` job with specified parameters.
  - **tag:** Shortened Git commit hash.
  - **git_repository:** URL of the Git repository.
  - **git_credentials:** Git credentials ID.
  - **git_commit:** Full Git commit hash.
  - **build_dir:** Directory containing the build files.
  - **dockerfile:** Path to the Dockerfile.

- **container:** Specifies the container (`build`) for post-build steps.
- **echo:** Outputs a message indicating the completion of the child pipeline.

## Customization

### Updating the Docker Image

To use a different Docker image, modify the `image` field under the `containers` specification in the `agent` block.

### Changing Directory Structure

If your project directory differs from `java-server`, update the `dir` field in both the Build and Test stages.

### Modifying Build Steps

You can add or modify steps within the stages to fit your project's build and testing requirements.

### Adjusting Delivery Job Parameters

Ensure the parameters passed to the `build` step in the Delivery stage match the requirements of your deployment job.