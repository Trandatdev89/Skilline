class AuthenticationSecurity {

  public getAccessToken() {
    return localStorage.getItem('accessToken')!
  }

  public getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  public getRole() {

  }

  public setAccessToken(token: string) {
    localStorage.setItem('accessToken', token)
  }

  public setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token)
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

}

export default new AuthenticationSecurity()