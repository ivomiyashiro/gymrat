import { model, Schema } from 'mongoose';

interface IVendor {
  name: string;
}

const Vendor = new Schema<IVendor>({
  name: {
    type: String,
    default: '',
    unique: true
  }
});

export default model<IVendor>('Vendor', Vendor);
