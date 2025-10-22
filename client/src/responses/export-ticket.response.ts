type ExportTicketItemResponse = {
    id: number,
    medicineId: number,
    medicineName: string,
    quantity: number,
}

type ExportTicketResponse = {
    id: number,
    reason: string,
    performedBy: string,
    status: string,
    items: ExportTicketItemResponse[],
    createdAt: string,
    updatedAt: string
}

export type { ExportTicketResponse };