export enum DeleteProductStateEnum {
    ISDELETED,
    ISNOTDELETED,
    ERROR
}

export interface DeleteProductState<T> {
    deleteState?: DeleteProductStateEnum,
    data?: T,
    errorMessage?: string
}