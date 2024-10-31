"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("seeding your database...");
        for (let i = 0; i < 100; i++) {
            const currentDate = faker_1.faker.date.between({
                from: "2020-01-01",
                to: Date.now(),
            });
            const user = yield prisma.user.create({
                data: {
                    email: faker_1.faker.internet.email(),
                    name: faker_1.faker.person.fullName(),
                    password: faker_1.faker.internet.password(),
                    Task: {
                        create: Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
                            title: faker_1.faker.lorem.sentence(),
                            description: faker_1.faker.lorem.paragraph(),
                            done: faker_1.faker.datatype.boolean(),
                            createdAt: currentDate,
                            finishBy: Math.random() < 0.5
                                ? faker_1.faker.date.between({
                                    from: currentDate,
                                    to: "2026-01-01",
                                })
                                : null,
                        })),
                    },
                },
            });
            console.log(`Created user with ID: ${user.id}`);
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=seed.js.map