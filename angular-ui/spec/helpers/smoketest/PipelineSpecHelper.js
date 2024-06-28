beforeEach(function () {
  jasmine.addMatchers({
    toBeRunning: function () {
      return {
        compare: function (actual, expected) {
          const pipeline = actual;

          return {
            pass: pipeline.currentlyRunningJob === expected && pipeline.isRunning
          };
        }
      };
    }
  });
});
