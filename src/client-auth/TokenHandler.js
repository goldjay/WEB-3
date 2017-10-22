//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

//Class to handle all token management.
class TokenHandler {

  static setUserToken(token) {
    localStorage.setItem('token', token);
  }

  static setAdminToken(token) {
    localStorage.setItem('tokenAdmin', token);
  }

  static userTokenPresent() {
    return localStorage.getItem('token') !== null;
  }

  static adminTokenPresent() {
    return localStorage.getItem('tokenAdmin') !== null;
  }

  static removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenAdmin');
    localStorage.removeItem('usrname');
  }

  static returnUserToken() {
    return localStorage.getItem('token');
  }

  static returnAdminToken() {
    return localStorage.getItem('tokenAdmin');
  }

}

export default TokenHandler;
