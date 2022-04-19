import mongoose from 'mongoose';
const partidoSchema = new mongoose.Schema(
  {
    match: {
      type: Number,
      required: [true, 'Debe existir un ID de match'],
    },
    team1: { type: Number },
    team2: { type: Number },
    datte: { type: Date },
    hour: { type: Number },
    estadio: { type: Number },
    fase: { type: Number },
    grupo: { type: String },
    mloc: { type: Number },
    mvis: { type: Number },
    procesado: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

let PartidosDataset =
  mongoose.models.partidos || mongoose.model('partidos', partidoSchema);

export default PartidosDataset;
