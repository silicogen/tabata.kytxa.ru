 
let API_ROUTE:string

process.env.NODE_ENV === 'development'
  ? API_ROUTE = 'http://127.0.0.1:8888/api/v1'
  : API_ROUTE = 'https://api.tabata.kytxa.ru/api/v1'

// API_ROUTE = 'https://api.tabata.kytxa.ru/api/v1'


export default API_ROUTE