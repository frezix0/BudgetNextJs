import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    // Create demo user
    const hashedPassword = await bcrypt.hash("password123", 10)
    
    const user = await prisma.user.upsert({
        where: { email: "demo@budgetapp.com" },
        update: {},
        create: {
            email: "demo@budgetapp.com",
            name: "Demo User",
            password: hashedPassword,
        },
    })

    console.log("✅ Created demo user:", user.email)

    // Create demo budgets
    const budget1 = await prisma.budget.create({
        data: {
            namaBudget: "Belanja Bulanan",
            total: 3000000,
            userId: user.id,
            pengeluaran: {
                create: [
                    {
                        namaPengeluaran: "Sayuran",
                        jumlah: 150000,
                        tanggal: new Date("2024-01-15"),
                    },
                    {
                        namaPengeluaran: "Daging",
                        jumlah: 200000,
                        tanggal: new Date("2024-01-16"),
                    },
                ],
            },
        },
    })

    const budget2 = await prisma.budget.create({
        data: {
            namaBudget: "Transportasi",
            total: 1000000,
            userId: user.id,
            pengeluaran: {
                create: [
                    {
                        namaPengeluaran: "Bensin",
                        jumlah: 150000,
                        tanggal: new Date("2024-01-10"),
                    },
                ],
            },
        },
    })

    console.log("✅ Created demo budgets:", budget1.namaBudget, budget2.namaBudget)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })