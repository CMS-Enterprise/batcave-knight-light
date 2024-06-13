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
        - name: maven
          image: artifactory.cloud.cms.gov/docker/maven:3.9-amazoncorretto-17
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
                container('maven') {
                  dir('java-server') {
                    sh 'mvn package -P prod -DskipTests=true'
                  }
                }
              }
            }
            stage('Unit-Tests') {
              steps {
                container('maven') {
                  dir('java-server') {
                    sh 'mvn clean test'
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
