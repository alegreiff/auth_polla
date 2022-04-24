import mongoose from 'mongoose';
const equipoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'Requerido'],
    },
    code: {
      type: String,
      required: [true, 'Requerido'],
    },
    nombre: {
      type: String,
      required: [true, 'Requerido'],
    },
    confederacion: {
      type: String,
      required: [true, 'Confederación requerida'],
    },
    pos: { type: String, required: [true, 'POS required'] },
    rank: { type: Number, required: [true, 'FIFA Rank required'] },
    grupo: { type: String, required: true },
    pg: { type: Number, default: 0 },
    pe: { type: Number, default: 0 },
    pp: { type: Number, default: 0 },
    gf: { type: Number, default: 0 },
    gc: { type: Number, default: 0 },
  },
  { timestamps: true }
);

//export default mongoose.models.Equipo || mongoose.model('Equipo', equipoSchema);

let EquiposDataset =
  mongoose.models.equipos || mongoose.model('equipos', equipoSchema);

export default EquiposDataset;
