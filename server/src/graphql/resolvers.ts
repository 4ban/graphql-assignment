import { getInfo} from './db.js'

export const resolvers = {
  Query: {
    info: (_: any, {country, postCode}) => getInfo(country, String(postCode)),
  },
};

export default resolvers