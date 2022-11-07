import { getInfo} from './db'

type ArgsType = {
  country: string,
  postCode: string
}

export const resolvers = {
  Query: {
    info: (_: any, {country, postCode}:ArgsType) => getInfo(country, String(postCode)),
    test: () => {return {name: "Hello world!"}}
  },
};

export default resolvers