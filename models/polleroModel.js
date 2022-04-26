import mongoose from 'mongoose';
import { equiposColombia } from '../lib';

const polleroSchema = new mongoose.Schema({
  hincha: {
    type: String,
    enum: equiposColombia,
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true,
  },
  pronos: {
    type: [[]],
  },
  numeroPronos: {
    type: Number,
  },
});

let PolleroDataset =
  mongoose.models.polleros || mongoose.model('polleros', polleroSchema);

export default PolleroDataset;
