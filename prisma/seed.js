
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('admin', 10)

    const user = await prisma.user.upsert({
        where: { username: 'Admin' },
        update: {},
        create: {
            username: 'Admin',
            name: 'Administrator',
            password: password,
            email: 'admin@masdevelopers.in'
        },
    })

    console.log({ user })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
