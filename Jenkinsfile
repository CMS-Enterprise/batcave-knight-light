pipeline {
  agent {
    kubernetes {
      yaml """
      apiVersion: v1
      kind: Pod
      spec:
        restartPolicy: Never
        containers:
        - name: node
          image: node:18
          command: ['tail', '-f', '/dev/null']
        - name: go
          image: golang:1.18
          command: ['tail', '-f', '/dev/null']          
      """
    }
  }

  stages {
    stage('Parallel Execution') {
      parallel {
        stage('Go') {
          stages {
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
        }
        stage('NPM') {
          stages {
            stage('Build') {
              steps {
                container('node') {
                  dir('node-server') {
                    sh 'npm ci'
                  }
                }
              }
            }
            stage('Unit-Tests') {
              steps {
                container('node') {
                  dir('node-server') {
                    sh 'npm run test:unit'
                  }
                }
              }
            }
            stage('Lint') {
              steps {
                container('node') {
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
}
