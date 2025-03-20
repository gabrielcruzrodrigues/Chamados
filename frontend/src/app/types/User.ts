export type CreateUser = {
     name: string,
     email: string,
     password: string,
     role: number
}

export type ResponseCreateUser = {
     name: string,
     email: string,
     password: string,
     role: number,
     createdAt: string,
     lastUpdatedAt: string
}

export type ErrorResponseCreateUser = {
     error: {
          message: string,
          type: string,
          code: number
     }
}