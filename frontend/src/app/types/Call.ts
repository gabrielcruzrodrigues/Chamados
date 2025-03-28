export type CreateCall = {
     title: string,
     content: string,
     sectorId: number,
     userId: number
}

export type Call = {
     id: number,
     title: string,
     content: string,
     sectorId: number,
     userId: number,
     createdAt: string
}

export type CallTable = {
     id: number,
     title: string,
     content: string,
     sectorName: string,
     userName: string,
     createdAt: string
}