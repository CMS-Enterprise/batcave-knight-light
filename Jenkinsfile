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
          image: artifactory.cloud.cms.gov/docker/node:18
          imagePullPolicy: Always
          command:
          - cat
          tty: true
          volumeMounts:
          - mountPath: "/home/jenkins/agent"
            name: "workspace-volume"
            readOnly: false
          workingDir: "/home/jenkins/agent"
          resources:
            limits:
              memory: 3Gi
        - name: gradle
          image: artifactory.cloud.cms.gov/docker/amazoncorretto:17
          imagePullPolicy: Always
          command:
          - cat
          tty: true
          volumeMounts:
          - mountPath: "/home/jenkins/agent"
            name: "workspace-volume"
            readOnly: false
          workingDir: "/home/jenkins/agent"
      """
    }
  }

  stages {
    stage('Parallel Execution') {
      parallel {
        stage('Java') {
          stages {
            stage('Build') {  
              steps {
                container('gradle') {
                  dir('java-server') {
                    sh 'gradle build'
                  }
                }
              }
            }
            stage('Unit-Tests') {
              steps {
                container('gradle') {
                  dir('java-server') {
                    sh 'gradle test jacocoTestReport'
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
