import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://odds.p.rapidapi.com/v1/odds',
  params: {
    sport: 'soccer_epl',
    region: 'us',
    mkt: 'h2h',
    dateFormat: 'iso',
    oddsFormat: 'american'
  },
  headers: {
    'x-rapidapi-host': 'odds.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
  }
}

export const fetchOdds = async () => {
  try {
    const result = await axios.request(options)
    return {
      success: true,
      data: result.data.data
    }
  } catch (e) {
    return {
      error: true,
      data: e
    }
  }
}
