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