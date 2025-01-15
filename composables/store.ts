// interface指定物件型別
interface AuthState {
    email: string;
    loggedIn: boolean;
}
// export輸出結果，箭頭函式宣告，useState<型別>指定store名稱與初始值
export const useAuth = () =>
    useState<AuthState>('auth', () => ({
        email: '',
        loggedIn: false,
    }));
