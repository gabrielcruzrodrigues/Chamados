export type CreateSector = {
     name: string
}

export type Sector = {
     id: number,
     name: string,
     status: boolean,
     createdAt: string,
     lastUpdatedAt: string
}

export type UpdateSector = {
     id: number,
     name: string
}