/**
 * Test script for Pi price mock fallback system
 * This demonstrates how the system handles different scenarios
 */

// Test the Pi price API endpoint
async function testPiPriceAPI() {
  console.log('🧪 Testing Pi Price API Fallback System\n')
  
  try {
    console.log('📡 Fetching Pi price from API...')
    const response = await fetch('http://localhost:3000/api/pricing/pi-price')
    const data = await response.json()
    
    console.log('✅ API Response:')
    console.log(`   Price: $${data.data.priceUsd}`)
    console.log(`   Source: ${data.data.source}`)
    console.log(`   Timestamp: ${data.data.timestamp}`)
    
    if (data.warning) {
      console.log(`⚠️  Warning: ${data.warning}`)
    }
    
    // Determine data type
    const isMockData = ['mock_simulation', 'mock_fallback', 'database_fallback', 'emergency_fallback'].includes(data.data.source)
    
    if (isMockData) {
      console.log('🎭 Using simulated price data')
      console.log('   This is expected when:')
      console.log('   - CoinGecko API is unavailable')
      console.log('   - Network connection issues')
      console.log('   - API rate limits reached')
      console.log('   - Development/testing environment')
    } else {
      console.log('🌐 Using live price data from CoinGecko')
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error)
  }
}

// Test multiple requests to see price variation
async function testPriceVariation() {
  console.log('\n📊 Testing price variation over multiple requests...')
  
  const prices = []
  
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch('http://localhost:3000/api/pricing/pi-price')
      const data = await response.json()
      prices.push({
        price: data.data.priceUsd,
        source: data.data.source,
        timestamp: new Date(data.data.timestamp).toLocaleTimeString()
      })
      
      // Wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Request ${i + 1} failed:`, error)
    }
  }
  
  console.log('\n📈 Price History:')
  prices.forEach((p, index) => {
    console.log(`   ${index + 1}. $${p.price} (${p.source}) at ${p.timestamp}`)
  })
  
  if (prices.length > 1) {
    const minPrice = Math.min(...prices.map(p => p.price))
    const maxPrice = Math.max(...prices.map(p => p.price))
    const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length
    
    console.log('\n📊 Statistics:')
    console.log(`   Min: $${minPrice.toFixed(4)}`)
    console.log(`   Max: $${maxPrice.toFixed(4)}`)
    console.log(`   Avg: $${avgPrice.toFixed(4)}`)
    console.log(`   Variation: ${((maxPrice - minPrice) / avgPrice * 100).toFixed(2)}%`)
  }
}

// Main test execution
if (typeof window === 'undefined') {
  // Node.js environment
  testPiPriceAPI().then(() => testPriceVariation())
} else {
  // Browser environment
  console.log('Pi Price Mock Fallback Test loaded')
  console.log('Open browser console and run:')
  console.log('testPiPriceAPI() or testPriceVariation()')
  
  // Make functions available globally
  ;(window as any).testPiPriceAPI = testPiPriceAPI
  ;(window as any).testPriceVariation = testPriceVariation
}

export { testPiPriceAPI, testPriceVariation }