export interface MedicineCategoryModel {
    id: number;
    name: string;
    description?: string;
    status: string; // active, inactive
    
    createdAt: Date;
    updatedAt: Date;
}
