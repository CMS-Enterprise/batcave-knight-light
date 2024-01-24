import axios from 'axios';

class MockApi {
  static activateRouteRegex = /^\/(?<service>[^\/]*)\/activate$/;
  static deactivateRouteRegex = /^\/(?<service>[^\/]*)\/deactivate$/;
  static statusRouteRegex = /^\/(?<service>[^\/]*)\/(status\/)?$/;
  constructor() {
    console.log('USING MOCK API');
    this.status = {
      'go-api': true,
      'java-api': true,
      'nodejs-api': true,
      'flask-api': true,
    };
  }
  async get(route) {
    let match;
    // TODO: error cases could better reflect what axios actually does
    if ((match = MockApi.activateRouteRegex.exec(route))) {
      if (this.status.hasOwnProperty(match.groups['service'])) {
        this.status[match.groups['service']] = true;
        return { data: { status: 'ON' } };
      } else {
        throw new Error(`Service ${match.groups['service']} not found`);
      }
    } else if ((match = MockApi.deactivateRouteRegex.exec(route))) {
      if (this.status.hasOwnProperty(match.groups['service'])) {
        this.status[match.groups['service']] = false;
        return { data: { status: 'OFF' } };
      } else {
        throw new Error(`Service ${match.groups['service']} not found`);
      }
    } else if ((match = MockApi.statusRouteRegex.exec(route))) {
      if (this.status.hasOwnProperty(match.groups['service'])) {
        return this.status[match.groups['service']]
          ? { data: { status: 'ON' } }
          : { data: { status: 'OFF' } };
      } else {
        throw new Error(`Service ${match.groups['service']} not found`);
      }
    } else {
      throw new Error(`The specified route was not found: ${route}`);
    }
  }
}

// export default import.meta.env.DEV && import.meta.env.VITE_MOCK_API
//   ? new MockApi()
//   : axios.create({
//       baseURL: 'https://knight-light.batcave-impl.internal.cms.gov/',
//     });
export default axios.create({
  baseURL: 'https://knight-light.batcave-impl.internal.cms.gov/',
});
