import { PrismaClient } from "@prisma/client";
import {faker} from "@faker-js/faker";

const prisma =  new PrismaClient();

async function main(){
    console.log("seeding your database...");
    for (let i = 0; i < 100; i++) {
        const user = await prisma.user.create({
          data: {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password(),
            Task: {
              create: Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                done: faker.datatype.boolean(),
              })),
            },
          },
        });
    
        console.log(`Created user with ID: ${user.id}`);
      }
    
}

main()
    .catch(e=>{
        console.error(e);
        process.exit(1)
    })
    .finally(async ()=>{
        await prisma.$disconnect();
    })