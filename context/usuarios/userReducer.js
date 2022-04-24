export const types = {
  userLogin: 'USER - LOGIN',
  userLogout: 'USER - LOGOUT',
  cargaPerfil: 'CARGA PERFIL',
  cargaPartidos: 'CARGA PARTIDOS',
  cargaEquipos: 'CARGA EQUIPOS',
};

export const initialStore = {
  user: null,
  perfil: null,
  partidos: null,
  equipos: null,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case types.userLogout:
      return {
        ...state,
        user: null,
        perfil: null,
      };
    case types.userLogin:
      return {
        ...state,
        user: action.payload,
      };
    case types.cargaPerfil:
      return {
        ...state,
        perfil: action.payload,
      };
    case types.cargaPartidos:
      return {
        ...state,
        partidos: action.payload,
      };
    case types.cargaEquipos:
      //console.log('CAREGANOO OS TEAMES', action.payload);
      return {
        ...state,
        equipos: action.payload,
      };

    default:
      return state;
  }
};
