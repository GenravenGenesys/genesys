export interface Message {
    text: string;
}

export interface AppError {
    message: string;
}

export interface ApiResponse {
    data: Message | null;
    error: AppError | null;
}

export interface UserProfile {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
}

export interface Auth0Resource {
    path: string;
    label: string;
}
