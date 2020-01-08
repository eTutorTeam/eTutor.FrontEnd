import {Genders} from "../enums/Genders";

export interface UserProfileResponse {
    name: string;
    lastName: string;
    personalId: string;
    isActive: boolean;
    isEmailValidated: boolean;
    isTemporaryPassword: boolean;
    gender: Genders;
    email: string;
    address: string;
    longitude: number;
    latitude: number;
    birthDate: Date;
    profileImageUrl: string;
    fullName: string;
    aboutMe: string;
    userName: string;
    ratings: number;
    phoneNumber: string;
}
