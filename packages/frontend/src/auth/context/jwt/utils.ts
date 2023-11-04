export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken)
  } else {
    sessionStorage.removeItem('accessToken')
  }
}
