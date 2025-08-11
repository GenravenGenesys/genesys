export interface JwtPayload {
    sub: string;
    role: 'DM' | 'PLAYER';
    exp: number;
    iat: number;
}

export interface AuthContextType {
    token: string | null;
    role: JwtPayload['role'] | null;
    login: (token: string) => void;
    logout: () => void;
}

export interface LoginResponse {
    token: string;
}

export interface SignupPayload {
    username: string;
    password: string;
    role: 'DM' | 'PLAYER';
}