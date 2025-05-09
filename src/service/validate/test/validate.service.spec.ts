import { TestingModule, Test } from "@nestjs/testing";
import { ValidateModule } from "../validate.module";
import { PixDTO } from "src/service/pix/dto/pix.dto";
import { ValidateService } from "../validate.service";

describe("ValidateService", () => {
    let module: TestingModule
    let validateService: ValidateService;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                ValidateModule
            ],
        }).compile();
        validateService = module.get<ValidateService>(ValidateService);
    });

    describe("validate", () => {
        it("should return error in validate DTO", async () => {
            const data = new PixDTO({})
            const errors = await validateService.dto(data)
            expect(errors).toEqual(
                expect.arrayContaining([
                    {
                        property: expect.any(String),
                        error: expect.arrayContaining([expect.any(String)]),
                    }
                ]),
            );
        })
    })

    afterAll(async () => {
        await module.close()
    })
})