export type LoginMutationData = { 
  login: {
    token: string
    refreshToken: string
    user: User
  }
}