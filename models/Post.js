import mongoose from 'mongoose';
import slugify from 'slugify';
import isEmail from 'validator/lib/isEmail';
const PostSchema = new mongoose.Schema({
  tituloEntrada: {
    type: String,
    required: [true, 'El título es requerido'],
    unique: [true, 'debe ser una mierda única y original'],
    trim: true,
    maxlength: [40, 'El título no debe ser más largo de 40 caracteres'],
  },

  contenido: {
    type: String,
    required: [true, 'Contenido requerido'],
    trim: true,
  },
  accesos: {
    type: Number,
    required: [true],
  },
  fechaPublicacion: {
    type: Date,
    //required: [true],
    default: new Date(),
  },
  correo: {
    type: String,
    validate: [isEmail, 'Un miserable correo pirobo'],
  },
  slug: {
    type: String,
    required: true,
  },
});
//MIDDLEWARES
/* 
validate save remove updateOne deleteOne init=>sync
*/
//PostSchema.post('remove');

/* PostSchema.pre('updateOne', function (next) {
  this.set({ slug: slugify(this.tituloEntrada) });
  next();
}); */

PostSchema.pre('validate', function (next) {
  this.slug = slugify(this.tituloEntrada);
  next();
});
PostSchema.pre('save', function (next) {
  console.log('De la FUGA aprendí...');
  next();
});

PostSchema.virtual('info')
  .get(function () {
    //this => documento
    return {
      nombre: this.contenido,
      accesos: this.accesos,
    };
  })
  .set();

//module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);

let PronosDataset = mongoose.models.post || mongoose.model('post', PostSchema);

export default PronosDataset;
