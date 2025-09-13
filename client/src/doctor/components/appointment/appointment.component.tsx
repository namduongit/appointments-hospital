import type { Appointment } from "../../../models/appointment.model";
import { formatDateToHourAndDay } from "../../../utils/fromatDate";


const statusColor = {
    "Chưa xác nhận": "bg-gray-200 text-gray-700",
    "Đã xác nhận": "bg-blue-100 text-blue-700",
    "Đang khám": "bg-yellow-100 text-yellow-800",
    "Đã hoàn thành": "bg-green-100 text-green-700"
};

const AppointmentComponent = (props: Appointment) => {
    return (
        <div className="appointment-component bg-white shadow-md rounded-xl px-4 py-4 mb-4 border-l-4 border-blue-500 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="appointment-wrap flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-4 lg:px-6">
                <div className="appointment__detail space-y-1 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg md:text-xl font-bold text-blue-700">{props.full_name}</h3>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ml-2 ${statusColor[props.status]}`}>{props.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="fa-regular fa-clock text-blue-500"></i>
                        <span>Thời gian khám:</span>
                        <span className="font-semibold text-gray-800">{props.confirmed_time ? formatDateToHourAndDay(props.confirmed_time) : "Chưa xác nhận giờ khám"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="fa-regular fa-note-sticky text-blue-400"></i>
                        <span>Ghi chú:</span>
                        <span className="text-gray-700">{props.note && props.note !== "" ? props.note : "Không có ghi chú"}</span>
                    </div>
                </div>
                <div className="appointment__buttons flex flex-row md:flex-col gap-2 md:gap-3 mt-2 md:mt-0">
                    <button className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold shadow hover:bg-blue-700 transition cursor-pointer">Thông tin</button>
                    {props.status === "Đã xác nhận" && (<button className="bg-green-100 text-green-700 rounded-lg px-4 py-2 font-semibold border border-green-200 hover:bg-green-200 transition cursor-pointer">Khám bệnh</button>)}
                    {props.status === "Chưa xác nhận" && (<button className="bg-orange-100 text-orange-700 rounded-lg px-4 py-2 font-semibold border border-orange-200 hover:bg-orange-200 transition cursor-pointer">Xác nhận thay</button>)}
                </div>
            </div>
        </div>
    );
};

export default AppointmentComponent;