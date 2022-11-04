import axios from 'axios'

const BASE_URL = 'https://api.zippopotam.us/'

type PlacesType = {
  placeName: String,
  stateAbbreviation: String,
  longiture: String,
  latitude: String,
  state: String
}

type PostCodeResponseType = {
  postCode: String,
  country: String,
  places?: PlacesType[] 
}

export const getInfo= async (country: String, postCode: String): Promise<PostCodeResponseType> => {
  // country is US by default, goes from the client (specified in the requirements).
  // Need to handle the empty or wrong postCode
  if (!postCode) return { country: country, postCode: postCode}

  const { data } = await axios(`${BASE_URL}${country}/${postCode}`)
  // TODO refactor. We can write (or use lodash) a proper deep renaming function to remove spaces from keys for all keys in the object (including nested)
  delete Object.assign(data, {postCode: data['post code']})['post code'];
  delete Object.assign(data, {countryAbbreviation: data['country abbreviation']})['country abbreviation'];
  data.places = data.places.map(item => {
    return {
      placeName: item['place name'],
      stateAbbreviation: item['state abbreviation'],
      longitude: item.longitude,
      latitude:item.latitude,
      state: item.state,
    };
  });
  return data
}