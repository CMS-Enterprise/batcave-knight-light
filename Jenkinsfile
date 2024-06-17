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
          image: artifactory.cloud.cms.gov/docker/node:18
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

    stage ('Test') {
      parallel {
        stage('Unit Test') {
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

    stage('Delivery') {
      steps {
        sh 'env'
        echo "Building Image for commit ${GIT_COMMIT[0..7]}"
        echo "scm userRemoteConfigs.url is ${scm.userRemoteConfigs[0].url}"
        echo "scm userRemoteConfigs.refspec is ${scm.userRemoteConfigs[0].refspec}"
        echo "scm userRemoteConfigs.credentialsId is ${scm.userRemoteConfigs[0].credentialsId}"
        echo 'TODO: pass git configuration to child pipeline'
        build(job: 'Node Server Delivery', wait: true, propagate: true, parameters: [
          string(name: 'tag', value: "${GIT_COMMIT[0..7]}")
        ])
        container('build') {
          echo 'Child pipeline completed'
        }
      }
    }
  }
}
