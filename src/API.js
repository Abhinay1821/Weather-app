function queryCreation(city,lati,lon){
  let query;
  if (city) {
      query = city;
  } else if (lati !== null && lon !== null) {
      query = `${lati},${lon}`; // Use latitude and longitude
  } else {
      throw new Error('No valid location provided');
  }
  return query
}
export async function weatherAPI(city, lati, lon) {
  const query = queryCreation(city,lati,lon)
  try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=28840d898df24ccd944142509240809&q=${query}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
  }
}

export async function forcastAPI(city,lati,lon){
  const query = queryCreation(city,lati,lon)
  try{
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=28840d898df24ccd944142509240809&q=${query}&days=10`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  }
  catch(error){
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export function getGeolocation () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

// 28840d898df24ccd944142509240809