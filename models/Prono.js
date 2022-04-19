import mongoose from 'mongoose';
const pronoSchema = new mongoose.Schema(
  {
    match: {
      type: Number,
      required: [true, 'Debe existir un ID de match'],
    },
    pollero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'polleros',
      required: true,
      unique: true,
    },
    mloc: { type: Number, required: [true, 'Marcador equipo local requerido'] },
    mvis: {
      type: Number,
      required: [true, 'Marcador equipo visitante requerido'],
    },
    comodin: { type: Boolean, default: false },

    procesado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

let PronosDataset =
  mongoose.models.pronos || mongoose.model('pronos', partidoSchema);

export default PronosDataset;
