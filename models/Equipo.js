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
  },
  { timestamps: true }
);

//export default mongoose.models.Equipo || mongoose.model('Equipo', equipoSchema);

let EquiposDataset =
  mongoose.models.equipos || mongoose.model('equipos', equipoSchema);

export default EquiposDataset;
