class Pipeline {
  run(job) {
    this.currentlyRunningJob = job;
    this.isRunning = true;
  }

  pause() {
    this.isRunning = false;
  }

  resume() {
    if (this.isRunning) {
      throw new Error('job is already running');
    }

    this.isRunning = true;
  }

  reportFailure() {
    this.currentlyRunningJob.reportFailureStatus(true);
  }
}

module.exports = Pipeline;
