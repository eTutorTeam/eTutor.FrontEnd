export interface UserProfileResponse {
    name: string;
    lastName: string;
    personalId: string;
    isActive: boolean;
    isEmailValidated: boolean;
    isTemporaryPassword: boolean;
    gender: number;
    email: string;
    address: string;
    longitude: number;
    latitude: number;
    birthDate: Date;
    profileImageUrl: string;
    fullName: string;
}
