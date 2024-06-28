const Pipeline = require('../../lib/smoketest/Pipeline');
const Job = require('../../lib/smoketest/Job');

describe('Pipeline', function() {
  let pipeline;
  let job;

  beforeEach(function() {
    pipeline = new Pipeline();
    job = new Job();
  });

  it('should be able to run a Job', function() {
    pipeline.run(job);
    expect(pipeline.currentlyRunningJob).toEqual(job);

    // demonstrates use of custom matcher
    expect(pipeline).toBeRunning(job);
  });

  describe('when a job has been paused', function() {
    beforeEach(function() {
      pipeline.run(job);
      pipeline.pause();
    });

    it('should indicate that the job is currently paused', function() {
      expect(pipeline.isRunning).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(pipeline).not.toBeRunning(job);
    });

    it('should be possible to resume', function() {
      pipeline.resume();
      expect(pipeline.isRunning).toBeTruthy();
      expect(pipeline.currentlyRunningJob).toEqual(job);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it('tells the current job if there is a failure', function() {
    spyOn(job, 'reportFailureStatus');

    pipeline.run(job);
    pipeline.reportFailure();

    expect(job.reportFailureStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe('#resume', function() {
    it('should throw an exception if job is already running', function() {
      pipeline.run(job);

      expect(function() {
        pipeline.resume();
      }).toThrowError('job is already running');
    });
  });
});
