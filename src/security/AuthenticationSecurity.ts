class AuthenticationSecurity {

  public getAccessToken() {
    return localStorage.getItem('accessToken')!;
  }

  public getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  public isAuthentication(){

  }

}

export default new AuthenticationSecurity()