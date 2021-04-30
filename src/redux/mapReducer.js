const initialState = {
    lat: 33.49108030585244,
    lng: -111.92781239256058
  };

  export const updateLocation = (lat, lng) => {
    return {
      type: "update",
      payload: { lat, lng},
    };
  };

  export default function mapReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case "update":
        return {
          ...state,
          lat: payload.lat,
          lng: payload.lng
        };
      default:
        return state;
    }
  }
