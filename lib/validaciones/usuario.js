import * as Yup from 'yup';

export const validaNuevoUsuario = Yup.object({
  nombre: Yup.string().required('Nombres completos, en lo posible'),
  password: Yup.string()
    .required(
      'Es necesario que establezca su contraseña y la guarde y la quiera mucho'
    )
    .min(6, 'Por lo menos seis caracteres'),
  correo: Yup.string()
    .email('Debe ser un correo válido')
    .required('Se requiere un correo electrónico'),
  terminos: Yup.boolean().oneOf(
    [true],
    'Es necesario que acepte los términos y condiciones'
  ),
});

export const validaSignIn = Yup.object({
  password: Yup.string()
    .required(
      'Es necesario que establezca su contraseña y la guarde y la quiera mucho'
    )
    .min(6, 'Por lo menos seis caracteres'),
  correo: Yup.string()
    .email('Debe ser un correo válido')
    .required('Se requiere un correo electrónico'),
});

export const validaCambiaPassword = Yup.object({
  oldPassword: Yup.string()
    .required('Debe ser su contraseña actual')
    .min(6, 'Por lo menos seis caracteres'),
  newPassword: Yup.string()
    .required(
      'Es necesario que establezca su contraseña y la guarde y la quiera mucho'
    )
    .min(6, 'Por lo menos seis caracteres'),
});
