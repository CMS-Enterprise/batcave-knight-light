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
      """
    }
  }

  stages {
    stage('Parallel Execution') {
      parallel {
        stage('Go') {
          stage('Build') {
            steps {
              container('build') {
                dir('go-server') {
                  sh 'go build'
                }
              }
            }
          }
          stage('Unit-Tests') {
            steps {
              container('build') {
                dir('go-server') {
                  sh 'go test'
                }
              }
            }
          }
          stage('Lint') {
            steps {
              container('build') {
                dir('go-server') {
                  sh 'go lint'
                }
              }
            }
          }
        }
        stage('NPM') {
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
    }
  }
}
