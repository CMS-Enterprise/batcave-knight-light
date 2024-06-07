pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'npm run test:unit'
      }
    }

    stage('Delivery') {
      agent {
        // Use a kubernetes pod with image ghcr.io/cms-enterprise/batcave/workflow-engine:podman-v0.0.1-rc.4
        kubernetes {
          yaml """
          apiVersion: v1
          kind: Pod
          spec:
            containers:
            - name: podman
              image: ghcr.io/cms-enterprise/batcave/workflow-engine:podman-v0.0.1-rc.4
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
        sh 'podman login --compat-auth-file "$HOME/.docker/config.json" "$CONTAINER_REGISTRY" -u "$REGISTRY_USER" -p "$REGISTRY_TOKEN"'
        sh 'workflow-engine run all --verbose --semgrep-experimental --cli-interface podman'
      }
    }
  }
}
