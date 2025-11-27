import mongoose, { Document } from 'mongoose';
export interface IPackage extends Document {
    title: string;
    description: string;
    destination: string;
    duration: number;
    price: number;
    currency: string;
    images: string[];
    inclusions: string[];
    exclusions: string[];
    availability: boolean;
    maxPersons: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IPackage, {}, {}, {}, mongoose.Document<unknown, {}, IPackage, {}, {}> & IPackage & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Package.d.ts.map