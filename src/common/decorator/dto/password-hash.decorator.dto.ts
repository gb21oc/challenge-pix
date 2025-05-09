import { hashSync } from "bcrypt"
import { Transform, TransformFnParams } from "class-transformer";
import { SALT_ROUNDS } from "src/common/constants";

export function Hashing() {
    return Transform((value: TransformFnParams) => {
        return hashSync(value.value, SALT_ROUNDS)
    })
}