pipeline {
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
        - name: workflow-engine
          image: ghcr.io/cms-enterprise/batcave/workflow-engine:podman-v0.0.1-rc.16
          command: ['tail', '-f', '/dev/null']
      """
    }
  }

  stages {
    stage('Build') {
      steps {
        container('build') {
          dir('node-server') {
            sh 'npm ci'
          }
        }
      }
    }

    stage('Unit-Tests') {
      steps {
        container('build') {
          dir('node-server') {
            sh 'npm run test:unit'
          }
        }
      }
    }

    stage('Lint') {
      steps {
        container('build') {
          dir('node-server') {
            sh 'npm run lint'
          }
        }
      }
    }
  }
}
