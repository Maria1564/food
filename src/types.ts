export enum Meta {
    instal = "instal",
    loading = "loading",
    error = "error",
    success = "success"
} 

export type QueryParams = {
    offset: number;
    page: number;
    query?: string;
};