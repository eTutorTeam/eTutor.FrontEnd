interface UserResponse {
    name: string;
    lastName: string;
    personalId: string;
    isActive: boolean;
    isEmailValidated: boolean;
    isTemporaryPassword: boolean;
    gender: number;
    fullName: string;
    parents: ParentStudent[];
    createdDate: string;
    updatedDate: string;
    id: number;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}

interface ParentStudent {
    studentId: number;
    parentId: number;
    relationship: number;
    id: number;
    createdDate: string;
    updatedDate: string;
}
