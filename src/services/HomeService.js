import axios from 'axios'
import api from '@/services/api'

const ENDPOINT = '/flight'

export default {
  getLMainFlightList (date, page = null, limit = null) {
    let params = {
      ...date,
    }
    if (page && limit) {
      params = { ...params, page, limit }
    }
    return api.get(`${ENDPOINT}/getflightforcustom`, {
      params
    })
  },
}