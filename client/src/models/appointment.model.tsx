export interface Appointment {
    id: number,
    user_id: number,
    room_id?: number,
    department_id?: number,
    doctor_id?: number,
    full_name: string,
    phone: string,
    birthdate?: string,
    appointment_time: Date,
    confirmed_time?: Date,
    status: "Chưa xác nhận" | "Đã xác nhận" | "Đang khám" | "Đã hoàn thành",
    note?: string,
}
