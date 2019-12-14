export interface DeviceTokenRequest {
    userId?: number;
    platforms: string[];
    fcmToken: string;
}
