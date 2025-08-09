export interface User {
    id: string;
    name: string;
    email: string;
}

export interface UserState {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
}
