import { PrismaClient, GameType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  await prisma.admin.upsert({
    where: { email: 'admin@b4uesports.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@b4uesports.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  })

  // Create PUBG Mobile packages
  const pubgPackages = [
    { name: '60 UC', amount: 60, usdtPrice: 1.5000 },
    { name: '325 UC', amount: 325, usdtPrice: 6.5000 },
    { name: '660 UC', amount: 660, usdtPrice: 12.0000 },
    { name: '1800 UC', amount: 1800, usdtPrice: 25.0000 },
    { name: '3850 UC', amount: 3850, usdtPrice: 49.0000 },
    { name: '8100 UC', amount: 8100, usdtPrice: 96.0000 },
    { name: '16200 UC', amount: 16200, usdtPrice: 186.0000 },
    { name: '24300 UC', amount: 24300, usdtPrice: 278.0000 },
    { name: '32400 UC', amount: 32400, usdtPrice: 369.0000 },
    { name: '40500 UC', amount: 40500, usdtPrice: 459.0000 },
  ]

  for (const pkg of pubgPackages) {
    await prisma.package.upsert({
      where: { name: pkg.name },
      update: {},
      create: {
        name: pkg.name,
        game: GameType.PUBG_MOBILE,
        description: `PUBG Mobile ${pkg.amount} UC`,
        amount: pkg.amount,
        usdtPrice: pkg.usdtPrice,
      },
    })
  }

  // Create MLBB packages
  const mlbbPackages = [
    { name: '56 Diamonds', amount: 56, usdtPrice: 3.0000 },
    { name: '278 Diamonds', amount: 278, usdtPrice: 6.0000 },
    { name: '571 Diamonds', amount: 571, usdtPrice: 11.0000 },
    { name: '1783 Diamonds', amount: 1783, usdtPrice: 33.0000 },
    { name: '3005 Diamonds', amount: 3005, usdtPrice: 52.0000 },
    { name: '6012 Diamonds', amount: 6012, usdtPrice: 99.0000 },
    { name: '12000 Diamonds', amount: 12000, usdtPrice: 200.0000 },
  ]

  for (const pkg of mlbbPackages) {
    await prisma.package.upsert({
      where: { name: pkg.name },
      update: {},
      create: {
        name: pkg.name,
        game: GameType.MLBB,
        description: `Mobile Legends ${pkg.amount} Diamonds`,
        amount: pkg.amount,
        usdtPrice: pkg.usdtPrice,
      },
    })
  }

  // Add initial settings
  const settings = [
    { key: 'pi_testnet_mode', value: 'true', type: 'boolean' },
    { key: 'maintenance_mode', value: 'false', type: 'boolean' },
    { key: 'max_transaction_amount', value: '1000', type: 'number' },
    { key: 'min_transaction_amount', value: '1', type: 'number' },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })