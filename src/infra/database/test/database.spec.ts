import { Repository } from "typeorm"
import { UserEntity, TraderEntity } from "../entity"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { DatabaseModule } from "../database.module"
import { Test, TestingModule } from "@nestjs/testing"
import { ConfigModule } from "src/config/config.module"

describe("Database Service", () => {
    let module: TestingModule
    let userRepository: Repository<UserEntity>
    let traderRepository: Repository<TraderEntity>

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                ConfigModule,
                DatabaseModule,
                TypeOrmModule.forFeature([UserEntity, TraderEntity]),
            ],
        }).compile();
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
        traderRepository = module.get<Repository<TraderEntity>>(getRepositoryToken(TraderEntity));
    });

    it("should return repository is defined", async () => {
        expect(userRepository).toBeDefined()
        expect(traderRepository).toBeDefined()
    })

    describe("userEntity", () => {
        it("[userEntity] should return all itens in table", async () => {
            const result = await userRepository.find()
            console.log(result)
        })
    })


    afterAll(async () => {
        await module.close()
    })
})
