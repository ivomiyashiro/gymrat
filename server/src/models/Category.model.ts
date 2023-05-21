import { model, Schema } from 'mongoose';

interface ICategory {
  name: string;
}

const Category = new Schema<ICategory>({
  name: {
    type: String,
    default: '',
    unique: true
  }
}, {
  versionKey: false
});

export default model<ICategory>('Category', Category);
