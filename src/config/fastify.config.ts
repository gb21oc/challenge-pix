import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { FastifyConstants } from "src/common/constants";

export class FastifyConfig {

    static config(app: INestApplication) {
        const logger = new Logger(FastifyConfig.name)
        app.useGlobalPipes(new ValidationPipe({
            transform: true
        }));
        app.setGlobalPrefix("challenges-pix")
        logger.log(FastifyConstants.RUNNING());

    }
}