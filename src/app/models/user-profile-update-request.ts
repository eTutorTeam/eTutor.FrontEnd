import {Genders} from "../enums/Genders";

export interface UserProfileUpdateRequest {
    address: string;
    name: string;
    lastName: string;
    gender: Genders;
    latitude: number;
    longitude: number;
    email: string;
    aboutMe: string;
    personalId: string;
    userName: string;
    phoneNumber: string;
}
