export interface ParentAuthorizationResponse {
    id: number;
    parentId: number;
    reason: string;
    status: number;
    authorizationDate: Date;
}
