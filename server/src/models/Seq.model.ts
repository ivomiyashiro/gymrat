import { model, Schema } from 'mongoose';

interface ISeq {
  id: 'seq';
  number: number;
}

const Seq = new Schema<ISeq>({
  id: {
    type: String,
    default: 'seq'
  },
  number: {
    type: Number
  }
}, {
  versionKey: false
});

export default model<ISeq>('Seq', Seq);
