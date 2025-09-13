export interface User {
    id: number,
    email: string,
    type: string,
    full_name?: string,
    birthdate?: string,
    phone?: string,
    create_at: Date,
    status: "Hoạt động" | "Bị khóa"
}