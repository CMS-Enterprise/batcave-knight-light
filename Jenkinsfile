pipeline {
  stages {
    stage('Build') {
      agent {
        kubernetes {
          yaml """
          apiVersion: v1
          kind: Pod
          spec:
            restartPolicy: Never
            containers:
            - name: build
              image: node:18
              command: ['tail', '-f', '/dev/null']
          """
        }
      }

      steps {
        container('build') {
          sh 'npm ci'
          sh 'npm run test:unit'
        }
      }
    }

    stage('Delivery') {
      agent {
        kubernetes {
          yaml """
          apiVersion: v1
          kind: Pod
          spec:
            restartPolicy: Never
            containers:
            - name: workflow-engine
              image: ghcr.io/cms-enterprise/batcave/workflow-engine:podman-v0.0.1-rc.4
              command: ['tail', '-f', '/dev/null']
          """
        }
      }

      environment {
        WFE_IMAGE_BUILD_DIR = 'node-server'
        WFE_IMAGE_BUILD_DOCKERFILE = 'node-service/Dockerfile'
        WFE_IMAGE_TAG = "artifactory.cloud.cms.gov/batcave-docker/ado-repositories/nightwing/knight-light/jenkins-knight-light/node-server:${GIT_COMMIT[0..6]}"
        CONTAINER_REGISTRY = 'artifactory.cloud.cms.gov'
        REGISTRY_USER = "$REGISTRY_USER"
        REGISTRY_TOKEN = credentials("artifactory-registry-token")
      }

      steps {
        container('workflow-engine') {
          sh 'podman login --compat-auth-file "$HOME/.docker/config.json" "$CONTAINER_REGISTRY" -u "$REGISTRY_USER" -p "$REGISTRY_TOKEN"'
          sh 'workflow-engine run all --verbose --semgrep-experimental --cli-interface podman'
        }
      }
    }
  }
}
