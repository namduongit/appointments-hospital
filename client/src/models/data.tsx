import type { User } from "./user.model"
import type { Department } from "./department.model"
import type { Doctor } from "./doctor.model"
import type { Room } from "./room.model"
import type { Appointment } from "./appointment.model"

// Data ngoài luồng
import type { Row } from "./row.model"

export const rows: Row[] = [
    { id: 1, value: 5 },
    { id: 2, value: 10 },
    { id: 3, value: 15 }
]

// Dữ liệu mẫu cho User
export const users: User[] = [
  { id: 1, email: 'user1@example.com', type: 'patient', full_name: 'Nguyen Van A', phone: '0901000001', create_at: new Date(), status: 'Hoạt động' },
  { id: 2, email: 'user2@example.com', type: 'patient', create_at: new Date(), status: 'Hoạt động' },
  { id: 3, email: 'user3@example.com', type: 'patient', full_name: 'Tran Thi B', birthdate: '1990-01-01', create_at: new Date(), status: 'Bị khóa' },
  { id: 4, email: 'user4@example.com', type: 'patient', full_name: 'Le Van C', phone: '0901000004', create_at: new Date(), status: 'Hoạt động' },
  { id: 5, email: 'user5@example.com', type: 'patient', create_at: new Date(), status: 'Hoạt động' },
  { id: 6, email: 'user6@example.com', type: 'patient', full_name: 'Pham Thi D', phone: '0901000006', create_at: new Date(), status: 'Hoạt động' },
  { id: 7, email: 'user7@example.com', type: 'patient', create_at: new Date(), status: 'Bị khóa' },
  { id: 8, email: 'user8@example.com', type: 'patient', full_name: 'Hoang Van E', create_at: new Date(), status: 'Hoạt động' },
  { id: 9, email: 'user9@example.com', type: 'patient', full_name: 'Vu Thi F', phone: '0901000009', create_at: new Date(), status: 'Hoạt động' },
  { id: 10, email: 'user10@example.com', type: 'patient', create_at: new Date(), status: 'Hoạt động' },
];

// Dữ liệu mẫu cho Department
export const departments: Department[] = [
  { id: 1, name: 'Khoa Nội', doctor_id: 1 },
  { id: 2, name: 'Khoa Ngoại', doctor_id: 2 },
];

// Dữ liệu mẫu cho Doctor
export const doctors: Doctor[] = [
  { id: 1, user_id: 1, department_id: 1, full_name: 'BS. Nguyen Van A', gender: 'Nam', specialization: 'Nội tổng quát', experience_years: '10', status: 'Đang khám' },
  { id: 2, user_id: 2, department_id: 2, full_name: 'BS. Tran Thi B', gender: 'Nữ', specialization: 'Ngoại tổng quát', experience_years: '8', description: 'Chuyên gia phẫu thuật', status: 'Tạm nghỉ' },
  { id: 3, user_id: 3, department_id: 1, full_name: 'BS. Le Van C', gender: 'Nam', specialization: 'Nội tim mạch', experience_years: '12', status: 'Đang khám' },
];

// Dữ liệu mẫu cho Room
export const rooms: Room[] = [
  { id: 1, name: 'Phòng 101', status: 'Trống' },
  { id: 2, name: 'Phòng 102', status: 'Hết chỗ' },
];

// Dữ liệu mẫu cho Appointment
export const appointments: Appointment[] = [
  { id: 1, user_id: 1, room_id: 1, department_id: 1, doctor_id: 1, full_name: 'Nguyen Van A', phone: '0901000001', appointment_time: new Date(), confirmed_time: new Date(), status: 'Chưa xác nhận' },
  { id: 2, user_id: 2, full_name: 'Tran Thi B', phone: '0901000002', appointment_time: new Date(), status: 'Đã xác nhận' },
  { id: 3, user_id: 3, room_id: 2, doctor_id: 2, full_name: 'Le Van C', phone: '0901000003', appointment_time: new Date(), confirmed_time: new Date(), status: 'Đang khám', note: 'Khám lại' },
  { id: 4, user_id: 4, department_id: 2, full_name: 'Pham Thi D', phone: '0901000004', appointment_time: new Date(), confirmed_time: new Date(), status: 'Đã hoàn thành' },
  { id: 5, user_id: 5, full_name: 'Hoang Van E', phone: '0901000005', appointment_time: new Date(), status: 'Chưa xác nhận', birthdate: '1992-05-10' },
  { id: 6, user_id: 6, room_id: 1, doctor_id: 1, full_name: 'Vu Thi F', phone: '0901000006', appointment_time: new Date(), confirmed_time: new Date(), status: 'Đã xác nhận' },
  { id: 7, user_id: 7, full_name: 'Dang Van G', phone: '0901000007', appointment_time: new Date(), confirmed_time: new Date(), status: 'Đang khám' },
  { id: 8, user_id: 8, room_id: 2, department_id: 1, full_name: 'Bui Thi H', phone: '0901000008', appointment_time: new Date(), status: 'Đã hoàn thành', note: 'Khám tổng quát' },
  { id: 9, user_id: 9, doctor_id: 3, full_name: 'Ngo Van I', phone: '0901000009', appointment_time: new Date(), status: 'Chưa xác nhận' },
  { id: 10, user_id: 10, full_name: 'Do Thi K', phone: '0901000010', appointment_time: new Date(), status: 'Đã xác nhận' },
  { id: 11, user_id: 1, room_id: 1, full_name: 'Nguyen Van A', phone: '0901000001', appointment_time: new Date(), status: 'Đang khám' },
  { id: 12, user_id: 2, department_id: 2, full_name: 'Tran Thi B', phone: '0901000002', appointment_time: new Date(), status: 'Đã hoàn thành' },
  { id: 13, user_id: 3, full_name: 'Le Van C', phone: '0901000003', appointment_time: new Date(), status: 'Chưa xác nhận' },
  { id: 14, user_id: 4, room_id: 2, doctor_id: 2, full_name: 'Pham Thi D', phone: '0901000004', appointment_time: new Date(), status: 'Đã xác nhận' },
  { id: 15, user_id: 5, full_name: 'Hoang Van E', phone: '0901000005', appointment_time: new Date(), status: 'Đang khám', note: 'Khám chuyên khoa' },
];

