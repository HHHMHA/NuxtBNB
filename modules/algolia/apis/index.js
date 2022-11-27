import userAPI from './user'

export default (algoliaConfig) => {
  return {
    user: userAPI(algoliaConfig),
  }
}
