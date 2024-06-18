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

  triggers {
    GenericWebhookTrigger(
      token: 'batcave-knight-light',
      causeString: 'Triggered by GitHub webhook',
      printContributedVariables: true,
      printPostContent: true,
      slientResponse: false
    )
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
        stage('Node-Server') {
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
        stage('Node-UI') {
          stages {
            stage('Build') {
              steps {
                container('node') {
                  dir('ui') {
                    sh 'npm ci'
                  }
                }
              }
            }
            stage('Unit-Tests') {
              steps {
                container('node') {
                  dir('ui') {
                    sh 'npm run test:unit'
                  }
                }
              }
            }
            stage('Lint') {
              steps {
                container('node') {
                  dir('ui') {
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
