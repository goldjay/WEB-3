//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

//Class to handle all token management.
class TokenHandler {

  //Method that sets the user token in local storage.
  static setUserToken(token) {
    localStorage.setItem('userToken', token);
  }

  //Method that sets the admin token in local storage.
  static setAdminToken(token) {
    localStorage.setItem('adminToken', token);
  }

  //Method that checks if user token is present.
  static userTokenPresent() {
    return localStorage.getItem('userToken') !== null;
  }

  //Method that checks if admin token is present.
  static adminTokenPresent() {
    return localStorage.getItem('adminToken') !== null;
  }

  //Method that removes all locally stored auth info
  static removeToken() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('headerName');
  }

  //Returns user token string to client.
  static returnUserToken() {
    return localStorage.getItem('userToken');
  }

  //Returns admin token string to client.
  static returnAdminToken() {
    return localStorage.getItem('adminToken');
  }

}

export default TokenHandler;
