export enum DataStateEnum {
    LOADING,
    LOADER,
    ERROR
}

export interface AppDataState <T> {
     DataState?: DataStateEnum,
     data?: T,
     errorMessage?: string
}