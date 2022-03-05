export default function ({ $axios, $config }, inject) {

  const api = $axios.create({
    headers: {
      common: {
        Authorization: `Bearer ${$config.apiToken}`
      }
    }
  })

  api.setBaseURL($config.apiUrl)

  // Inject to context as $api
  inject('api', api)
}