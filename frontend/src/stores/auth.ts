import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../@types/users/user";
import type { RegisterInput } from "../@types/auth/register-input";
import { apolloClient } from "../lib/apollo-client";
import { LOGIN, REGISTER } from "../graphql/mutations/auth-mutations";
import type { TypedDocumentNode } from "@apollo/client";
import type { RegisterMutationData } from "../@types/auth/register-mutation-data";
import type { LoginInput } from "../@types/auth/login-input";
import type { LoginMutationData } from "../@types/auth/login-mutation-data";

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  rememberedEmail: string | null
  register: (data: RegisterInput) => Promise<boolean>
  login: (data: LoginInput, rememberMe?: boolean) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
}

type RegisterMutationVariables = {
  data: RegisterInput
}

const typedRegisterMutation =
  REGISTER as TypedDocumentNode<
    RegisterMutationData,
    RegisterMutationVariables
  >

type LoginMutationVariables = {
  data: LoginInput
}

const typedLoginMutation =
  LOGIN as TypedDocumentNode<
    LoginMutationData,
    LoginMutationVariables
  >

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      rememberedEmail: null,
      register: async (registerData: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate({
            mutation: typedRegisterMutation,
            variables: {
              data: {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password
              }
            }
          })

          if (data?.register) {
            const { token, user } = data.register

            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true
            })

            return true
          }

          return false
        }
        catch (error) {
          console.error("Erro ao fazer o cadastro:", error);
          throw error
        }
      },

      login: async (
        loginData: LoginInput,
        rememberMe = false
      ) => {
        try {
          const { data } = await apolloClient.mutate({
            mutation: typedLoginMutation,
            variables: {
              data: {
                email: loginData.email,
                password: loginData.password
              }
            }
          })

          if (data?.login) {
            const { token, user } = data.login

            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
              rememberedEmail: rememberMe
                ? loginData.email
                : null
            })

            return true
          }

          return false

        } catch (error) {
          console.error("Erro ao fazer o cadastro:", error);
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          rememberedEmail: null
        })

        apolloClient.clearStore()
      },

      setUser: (user: User) => {
        set({
          user
        })
      },
    }),
    {
      name: "auth-storage",
    }
  )
)