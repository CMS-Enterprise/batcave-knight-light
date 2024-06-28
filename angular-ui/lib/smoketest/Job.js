class Job {
  reportFailureStatus(value) {
    throw new Error('pipeline job failed');
  }
}

module.exports = Job;
