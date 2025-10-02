import type { AppointmentModel } from "../models/Appointment.model"
import type { UserProfileModel } from "../models/UserProfile.model"

export type AccountDetail = {
    id: number,
    email: string,
    role: string,
    type: string,
    status: string,
    userProfileModel: UserProfileModel,
    userAppointmets: AppointmentModel[]
}

export type AppointmentDetail = {
    id: number,
    fullName: string,
    phone: string,
    time: string,
    note: string,
    status: string
};