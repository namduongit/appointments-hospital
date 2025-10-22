export interface MedicineModel {
    id: number,
    name: string,
    unit: string;

    price: number;
    costPrice: number;

    barcode: string;
    manufacturer: string
    status: string;

    currentStock: number;

    categoryId: number;

    minStock: number;
    maxStock: number;

    description: string;
}
