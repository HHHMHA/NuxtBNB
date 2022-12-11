import userAPI from './user'
import homeAPI from './homes'

export default (algoliaConfig) => {
  return {
    user: userAPI(algoliaConfig),
    home: homeAPI(algoliaConfig),
  }
}
