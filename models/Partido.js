import mongoose from 'mongoose';
const partidoSchema = new mongoose.Schema(
  {
    team1: { type: Number },
    team2: { type: Number },
    datte: { type: Date },
    hour: { type: Number },
    estadio: { type: Number },
    fase: { type: Number },
    grupo: { type: String },
  },
  { timestamps: true }
);

let PartidosDataset =
  mongoose.models.partidos || mongoose.model('partidos', partidoSchema);

export default PartidosDataset;
