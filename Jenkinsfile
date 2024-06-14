def Map properties=[
    emailRecipient: "brian.fohl@intellibridge.us",
    slackNotification: "",
    artifactName: "",
    artifactoryProjectName: "batcave-knight-light",
    artifactPackagePath: "",
    tech: "maven3.9",
    javaVersion: "17",
    buildArgs: "",
    testArgs: "",
    packageArgs: "$",
    ghOrg: "CMSEnt",
    adoIAMRole: "admin",
    sonarqube: [
        projectKey: ""
    ],
    build: [
        dockerargs: "",
        artifactHost: "",
        workDir: ".",
        dockerFile: "Dockerfile",
        zipPath: "",
        fileName: ""
    ],
    snyk: [
        orgId: "${org_id}"
    ]
] 
def sharedLibraryBranch
if (env.devopsDebugOverridesSharedLibraryBranch){ sharedLibraryBranch = env.devopsDebugOverridesSharedLibraryBranch }
else { sharedLibraryBranch = "main" }

library "dso-shared-lib@${sharedLibraryBranch}"
def podYaml = libraryResource "podTemplates/${properties.tech}-java${properties.javaVersion}-agent.yaml"
pipeline {
    agent{
        kubernetes {
            yaml podYaml
        }
    }
    stages{
        stage ("init"){
            steps {
                container ("jnlp"){
                    script{
                        init.paramValidator(properties)
                        init.getArtifactName(properties)
                    }
                }
            }
        }
         stage ("maven compile"){
            steps {
                container ("maven"){
                    script{
                        maven.compile(properties.buildArgs)
                    }
                }
            }
        }
         stage ("maven test"){
            steps {
                container ("maven"){
                    script{
                        maven.test(properties.testArgs)
                    }
                }
            }
        }
        stage ("maven package"){
            steps {
                container ("maven"){
                    script{
                        maven.mvnPackage(properties.packageArgs)
                    }
                }
            }
        }
         stage ("sonarqube scan"){
            when {
                expression { return properties.sonarqube.projectKey }
            }
            steps {
                container ("sonarqube"){
                    script{               
                        sonarqube.scan(properties)
                    }
                }
            }
        }
         stage ("snyk"){
            when {
                expression { return properties.snyk.orgId }
            }
            steps {
                container ("snyk"){
                    script{   
                        snyk.snykCodeTest(properties)             
                        snyk.snykTest(properties)
                    }
                }
            }
        }
        stage('Artifactory Publish') {
            steps {
                container ("awscli"){
                    script{
                        aws.assumeRole(properties.adoIAMRole)
                    }
                 }
                container('kaniko') {
                    script {
                        logger.stage()
                        kaniko.push(properties) //optional, for container builds
                    }
                }
                container('base-agent') {
                    script {
                        zip.zipBuild(properties)
                    }
                }
                container('jfrog') {
                    script {
                        // jfrog.buildDockerCreateAndPublish(properties) //optional, for container builds
                        jfrog.upload(properties) // optional for non-container builds
                        // jfrog.metaDataTagging(properties)
                    }
                }
            }
        }
         stage ("jfrog xray"){
            steps {
                container ("jfrog"){
                    script{               
                        jfrog.jfrogXray(properties)
                    }
                }
            }
        }
    }
    post {
        success {
            script{
                if (properties.slackNotification && (properties.slackNotification != "#example-channel")) {
                    notification.success(properties)
                    slackSend(channel: "${properties.slackNotification}", message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' completed successfully. See details: ${env.BUILD_URL}")
                }
            }
        }
        failure {
            script{
                if (properties.slackNotification && (properties.slackNotification != "#example-channel")) {
                    notification.failure(properties)
                    slackSend(channel: "${properties.slackNotification}", message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed. Check it out: ${env.BUILD_URL}")
                }
            }
        }
    }
}