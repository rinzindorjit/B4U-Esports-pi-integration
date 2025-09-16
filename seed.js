const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create PUBG Mobile packages
  const pubgPackages = [
    { name: '60 UC', game: 'PUBG_MOBILE', amount: 60, usdtPrice: 0.99, description: 'Perfect for a single crate opening' },
    { name: '325 UC', game: 'PUBG_MOBILE', amount: 325, usdtPrice: 4.99, description: 'Popular choice for item purchases' },
    { name: '660 UC', game: 'PUBG_MOBILE', amount: 660, usdtPrice: 9.99, description: 'Great value for multiple purchases' },
    { name: '1800 UC', game: 'PUBG_MOBILE', amount: 1800, usdtPrice: 24.99, description: 'Premium package for serious players' },
    { name: '3850 UC', game: 'PUBG_MOBILE', amount: 3850, usdtPrice: 49.99, description: 'Ultimate UC package' },
    { name: '8100 UC', game: 'PUBG_MOBILE', amount: 8100, usdtPrice: 99.99, description: 'Maximum value package' }
  ]

  // Create Mobile Legends packages
  const mlbbPackages = [
    { name: '86 Diamonds', game: 'MLBB', amount: 86, usdtPrice: 1.49, description: 'Weekly diamond card' },
    { name: '172 Diamonds', game: 'MLBB', amount: 172, usdtPrice: 2.99, description: 'Basic hero unlock' },
    { name: '344 Diamonds', game: 'MLBB', amount: 344, usdtPrice: 5.99, description: 'Skin purchase option' },
    { name: '706 Diamonds', game: 'MLBB', amount: 706, usdtPrice: 11.99, description: 'Premium skin unlock' },
    { name: '1446 Diamonds', game: 'MLBB', amount: 1446, usdtPrice: 23.99, description: 'Epic skin collection' },
    { name: '3099 Diamonds', game: 'MLBB', amount: 3099, usdtPrice: 49.99, description: 'Legendary skin package' }
  ]

  // Seed PUBG packages
  for (const pkg of pubgPackages) {
    await prisma.package.upsert({
      where: { name: pkg.name },
      update: {},
      create: pkg
    })
  }

  // Seed MLBB packages  
  for (const pkg of mlbbPackages) {
    await prisma.package.upsert({
      where: { name: pkg.name },
      update: {},
      create: pkg
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })