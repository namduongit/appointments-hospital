
import { useEffect, useState } from "react";
import { appointments } from "../../../models/data";
import { rooms } from "../../../models/data";
import { rows } from "../../../models/data";
import { departments } from "../../../models/data";
import AppointmentComponent from "../../components/appointment/appointment.component";

const DoctorAppointmentPage = () => {
    const [select, setSelect] = useState<string>("all");
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("")


    const [appointmentArray, setAppointmentArray] = useState(appointments);
    const [roomArray, setRoomArray] = useState(rooms);
    const [departmentArray, setDepartmentArray] = useState(departments);

    useEffect(() => {
        setAppointmentArray(appointments)
        const status = select === "all" ? "" : select === "confirm" ? "Đã xác nhận" : select === "pending" ? "Chưa xác nhận" : "Đã hoàn thành";
        if (status !== "") {
            setAppointmentArray(appointmentArray => appointmentArray.filter(appointment => appointment.status === status));
        } else {
            setAppointmentArray(appointments);
        }
    }, [select]);

    return (
        <main className="appointment-page">
            <div className="appointment-page__warp">
                <div className="appointment-page__title text-2xl text-blue-600 font-bold">
                    <h3 className="mb-5">Lịch khám của bệnh nhân</h3>
                </div>
                <div className="appointment-page__sort">
                    <div className="appointment-page__search flex justify-between bg-white rounded-lg px-3 py-4 shadow">
                        <section className="grid grid-cols-2 lg:grid-cols-4 md:gap-4 gap-2 w-full">
                            <input
                                type="text"
                                placeholder="Nhập tên bệnh nhân..."
                                className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />

                            <select
                                className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                            >
                                <option value="">Khoa khám</option>
                                {departmentArray.map((department, id) => (<option key={id} value={department.id}>{department.name}</option>))}
                            </select>

                            <select
                                className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                            >
                                <option value="">Phòng khám số</option>
                                {roomArray.map((room, id) => (<option key={id} value={room.id}>{room.name}</option>))}
                            </select>

                            <select
                                className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                            >
                                <option value="">Hiển thị theo</option>
                                {rows.map((row, id) => (<option key={id} value={row.id}>{row.value} hàng</option>))}
                            </select>
                        </section>
                    </div>
                    <div className="appointment-page__buttons flex justify-end lg:justify-start gap-4 font-bold-[500] mb-5 mt-5">
                        <div className="button-select lg:hidden">
                            <select
                                className="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                            >
                                <option value="">Chọn loại lịch khám</option>
                                
                            </select>
                        </div>
                        <div className="button-row hidden lg:block">
                            <button className={`bg-white px-3 pt-2 pb-1 ${select === "all" && "border-b-3 rounded border-blue-600"} cursor-pointer
                        hover:text-blue-600 hover:font-bold`}
                                onClick={() => setSelect("all")}>
                                <i className="fa-solid fa-border-all me-1"></i>
                                Tất cả
                            </button>
                            <button className={`bg-white px-3 pt-2 pb-1 ${select === "confirm" && "border-b-3 rounded border-blue-600"} cursor-pointer
                        hover:text-blue-600 hover:font-bold`}
                                onClick={() => setSelect("confirm")}>
                                <i className="fa-solid fa-circle-check me-1"></i>
                                Đã xác nhận
                            </button>
                            <button className={`bg-white px-3 pt-2 pb-1 ${select === "pending" && "border-b-3 rounded border-blue-600"} cursor-pointer
                        hover:text-blue-600 hover:font-bold`}
                                onClick={() => setSelect("pending")}>
                                <i className="fa-solid fa-hourglass-half me-1"></i>
                                Chưa xác nhận
                            </button>
                            <button className={`bg-white px-3 pt-2 pb-1 ${select === "done" && "border-b-3 rounded border-blue-600"} cursor-pointer
                        hover:text-blue-600 hover:font-bold`}
                                onClick={() => setSelect("done")}>
                                <i className="fa-solid fa-check-double me-1"></i>
                                Đã hoàn thành
                            </button>
                        </div>
                    </div>
                </div>
                <div className="appointment-page__list">
                    {appointmentArray && appointmentArray.map((appointment, id) => (<AppointmentComponent key={id} {...appointment} />))}
                </div>
            </div>
        </main>
    )
}

export default DoctorAppointmentPage;