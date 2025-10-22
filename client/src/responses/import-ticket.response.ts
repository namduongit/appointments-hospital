type ImportTicketItemResponse = {
    id: number,
    medicineId: number,
    medicineName: string,
    quantity: number,
    unitPrice: number,
    totalPrice: number
}


type ImportTicketResponse = {
    id: number,
    supplierName: string,
    reason: string,
    performedBy: string,
    status: string,
    items: ImportTicketItemResponse[],
    createdAt: string,
    updatedAt: string
}

export type { ImportTicketResponse };
