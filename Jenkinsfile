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
          image: alpine:3
          command: ['tail', '-f', '/dev/null']
      """
    }
  }

  stages {
    stage('Build') {
      steps {
        container('build') {
          sh 'echo TODO: implement build stage'
        }
      }
    }

    stage('Delivery') {
      steps {
        build(job: 'Node Server Delivery Pipeline', wait: true, propagate: true, parameters: [
          string(name: 'image', value: 'OVERRIDE')
        ])
        container('build') {
          sh 'echo Child pipeline completed'
        }
      }
    }
  }
}
