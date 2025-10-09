import { jwtDecode } from 'jwt-decode'

class AuthenticationSecurity {

  public getAccessToken() {
    return localStorage.getItem('accessToken')!;
  }

  public getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  public getRole(){

  }
}

export default new AuthenticationSecurity()