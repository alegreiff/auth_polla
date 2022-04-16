import * as Yup from 'yup';

export const validaPerfil = Yup.object({
  usuario: Yup.string().required('Nombres completos, en lo posible'),
  hincha: Yup.string().required('Debe seleccionar una opción.'),
});
