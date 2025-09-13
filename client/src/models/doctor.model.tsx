export interface Doctor {
    id: number,
    user_id: number,
    department_id: number,
    full_name: string,
    gender: "Nam" | "Nữ",
    specialization: string,
    experience_years: string,
    description?: string,
    status: "Đang khám" | "Tạm nghỉ"
}