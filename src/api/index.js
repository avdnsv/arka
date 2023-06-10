const base = import.meta.env.VITE_IP;

export default {
  getListOfCities: () => {
    return fetch(`${base}/api/cities`).then((res) => res.json());
  },

  getDataOfTheCity: (id) => {
    return fetch(`${base}/api/city?id=` + id).then((res) => res.json());
  },

  getHumidMode: (temperature, humidity, humidityZone) => {
    return fetch(
      `${base}/api/mode?temperature=${temperature}&humidity=${humidity}&humidity_zone=${humidityZone}`
    ).then((res) => res.text());
  },

  requestOfCalculation: (params) => {
    return fetch(`${base}/api/calc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(params),
    }).then((res) => res.json());
  },

  requestOfReport: (params) => {
    return fetch(`${base}/api/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(params),
    }).then((res) => res.blob());
  },
};
