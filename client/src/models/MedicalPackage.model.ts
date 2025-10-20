export interface MedicalPackage {
    id: number,
    name: string,
    description: string,
    status: 'ACTIVE' | 'INACTIVE',
    price: number
}