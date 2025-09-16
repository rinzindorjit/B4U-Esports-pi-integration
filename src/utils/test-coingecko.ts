/**
 * CoinGecko API Test Script
 * This script verifies the CoinGecko API key and Pi Network price fetching
 */

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price'
const API_KEY = 'CG-z4MZkBd78fn7PgPhPYcKq1r4'

async function testCoinGeckoAPI() {
  console.log('\ud83e\uddea Testing CoinGecko API for Pi Network pricing...')
  
  try {
    const apiUrl = `${COINGECKO_API_URL}?ids=pi-network&vs_currencies=usd&x_cg_demo_api_key=${API_KEY}`
    console.log('\ud83d\udd17 API URL:', apiUrl.replace(API_KEY, '[API_KEY]'))
    
    console.log('\ud83d\udce1 Fetching Pi Network price...')
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'B4U-Esports-Test/1.0'
      }
    })
    
    console.log('\ud83d\udcca Response Status:', response.status, response.statusText)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('\u274c API Error Response:', errorText)
      return
    }
    
    const data = await response.json()
    console.log('\ud83d\udcc8 Raw API Response:', JSON.stringify(data, null, 2))
    
    const piPrice = data['pi-network']?.usd
    
    if (piPrice && typeof piPrice === 'number') {
      console.log('\u2705 Success! Pi Network Price: $' + piPrice.toFixed(4))
      console.log('\ud83d\udcb0 Price updated at:', new Date().toISOString())
      
      // Test multiple currencies
      console.log('\n\ud83c\udf0d Testing multiple currencies...')
      const multiCurrencyUrl = `${COINGECKO_API_URL}?ids=pi-network&vs_currencies=usd,eur,btc&x_cg_demo_api_key=${API_KEY}`
      const multiResponse = await fetch(multiCurrencyUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'B4U-Esports-Test/1.0'
        }
      })
      
      if (multiResponse.ok) {
        const multiData = await multiResponse.json()
        console.log('\ud83d\udcb1 Multi-currency response:', JSON.stringify(multiData, null, 2))
      }
      
    } else {
      console.error('\u274c Invalid price data received:', data)
    }
    
  } catch (error) {
    console.error('\u274c Test failed:', error)
  }
}

// Test API rate limits
async function testRateLimits() {
  console.log('\n\ud83d\udd70\ufe0f Testing API rate limits...')
  
  for (let i = 1; i <= 5; i++) {
    try {
      const start = Date.now()
      const response = await fetch(`${COINGECKO_API_URL}?ids=pi-network&vs_currencies=usd&x_cg_demo_api_key=${API_KEY}`)
      const end = Date.now()
      
      console.log(`Request ${i}: ${response.status} (${end - start}ms)`)
      
      if (response.ok) {
        const data = await response.json()
        console.log(`  Pi Price: $${data['pi-network']?.usd || 'N/A'}`)
      }
      
      // Wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Request ${i} failed:`, error instanceof Error ? error.message : error)
    }
  }
}

// Run tests
if (typeof window === 'undefined') {
  // Node.js environment
  testCoinGeckoAPI().then(() => testRateLimits())
} else {
  // Browser environment
  console.log('CoinGecko API Test loaded')
  console.log('Run testCoinGeckoAPI() in the console')
  ;(window as any).testCoinGeckoAPI = testCoinGeckoAPI
  ;(window as any).testRateLimits = testRateLimits
}

export { testCoinGeckoAPI, testRateLimits }