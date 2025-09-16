'use client'
import { usePiPrice } from '../../hooks/usePiPrice'
import { useEffect } from 'react'

export default function TestPiPrice() {
  const { price, isLoading, error, lastUpdated, source, isMockData, refreshPrice, convertUsdtToPi } = usePiPrice()

  useEffect(() => {
    console.log('Pi Price Hook State:', { price, isLoading, error, lastUpdated, source, isMockData })
  }, [price, isLoading, error, lastUpdated, source, isMockData])

  const handleConvert = () => {
    const usdtAmount = 10
    const piAmount = convertUsdtToPi(usdtAmount)
    console.log(`${usdtAmount} USDT = ${piAmount} Pi`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pi Price Test</h1>
      
      <div className="mb-4">
        <p>Price: {price ? `$${price.toFixed(5)}` : 'Loading...'}</p>
        <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
        <p>Last Updated: {lastUpdated || 'Never'}</p>
        <p>Source: {source || 'Unknown'}</p>
        <p>Mock Data: {isMockData ? 'Yes' : 'No'}</p>
      </div>

      <div className="space-x-2">
        <button 
          onClick={refreshPrice}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh Price
        </button>
        
        <button 
          onClick={handleConvert}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Convert 10 USDT to Pi
        </button>
      </div>
    </div>
  )
}