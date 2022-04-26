import { format } from 'date-fns';
import { es } from 'date-fns/locale';
export const FechaSimple = ({ fecha }) => {
  //format(fecha, "dd 'de' MMM H':'mm a", { locale: es }

  const mes = format(fecha, 'MMM').toString().charAt(0);
  const dia = format(fecha, 'dd');
  const hora = format(fecha, "H':'mm a");
  const salefecha = `${dia}${mes} - ${hora}`;

  return <>{salefecha}</>;
};
