const config = {
  supported_resolutions: ["1", "5", "15", "60", "240", "D"]
}

export const Datafeed = {
  onReady: cb => {
    console.log("cb", cb)
    setTimeout(() => cb(config), 0)
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    onResultReadyCallback([{
      "symbol": "ADBE",
      "full_name": "Adobe Inc.", // e.g. BTCE:BTCUSD
      "description": "Software company",
      "exchange": "NYSE",
      "ticker": "ADBE",
      "type": "stock" // or "futures" or "bitcoin" or "forex" or "index"
    },])
  },
  resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
    let split_data = symbolName.split(/[:/]/)
    console.log({symbolName})
    const symbol_stub = {
      name: symbolName,
      description: symbolName,
      type: 'forex',
      session: '24x7',
      timezone: 'Europe/Paris',
      ticker: symbolName,
      minmov: 1,
      pricescale: 100000,
      has_intraday: true,
      intraday_multipliers: ['15'],
      supported_resolution: config.supported_resolutions,
      volume_precision: 0,
      data_status: 'streaming',
    }

    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub)
    }, 0)
  },
  getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
    getBars(symbolInfo, resolution, from, to, firstDataRequest).then(bars => {
      if (bars.length)
        onHistoryCallback(bars, {noData: false})
      else
        onHistoryCallback(bars, {noData: true})
    }).catch(err => {
      console.log({err})
      onErrorCallback(err)
    })
  },
  subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
  },
  unsubscribeBars: subscriberUID => {
  },
}

function getBars(symbolInfo, resolution, from, to, first): Promise<any> {
  const split_symbol = symbolInfo.name.match(/.{1,3}/g)
  const api_root = 'https://fcsapi.com/api-v2'
  const token = 'DprWnIJ6wlAICq9GzudgBL2EiklnnmvnCOqN4Qb9KoR3YEjL2d'
  const url = `/forex/history?symbol=${split_symbol[0]}/${split_symbol[1]}
  &period=${resolution}&access_key=${token}`

  return new Promise((resolve, reject) => {
    this.http.get(`${api_root}${url}`)
      .toPromise()
      .then(data => {
        if (data['status'] === false) {
          console.log('Forex API error:', data['msg'])
          return []
        }
        if (data['code'] === 200 && data['response'].length > 0) {
          var bars = data['response'].map(el => {
            return {
              time: el.t, //TradingView requires bar time in ms
              low: el.l,
              high: el.h,
              open: el.o,
              close: el.c,
            }
          })
          resolve(bars)
          return bars
        }
      })
  })
}

const mockBars = [
  {
    time: 10349304,
    low: 10,
    high: 49,
    open: 21,
    close: 34,
  },
  {
    time: 10349304,
    low: 10,
    high: 49,
    open: 21,
    close: 34,
  },
  {
    time: 10349304,
    low: 10,
    high: 49,
    open: 21,
    close: 34,
  },
  {
    time: 10349304,
    low: 10,
    high: 49,
    open: 21,
    close: 34,
  },
  {
    time: 10349304,
    low: 10,
    high: 49,
    open: 21,
    close: 34,
  },
]
