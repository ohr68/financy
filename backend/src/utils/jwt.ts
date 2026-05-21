import  jwt, { type Secret, SignOptions } from "jsonwebtoken"
import { env } from "../env"

export type JwtPayload = {
  id: string
  email: string
}

export const signJwt = (payload: JwtPayload, expiresIn?: string) => {
  const secret: Secret = env.JWT_SECRET as unknown as Secret
  let options: SignOptions
  let expiration = expiresIn

  if(expiresIn) {
    options = {
      expiresIn: expiration as unknown as NonNullable<SignOptions['expiresIn']>
    }
  }

  return jwt.sign(payload, secret, options)
}

export const verifyJwt = (token: string) => {
  const secret: Secret = env.JWT_SECRET as unknown as Secret

  return jwt.verify(token, secret) as JwtPayload
}