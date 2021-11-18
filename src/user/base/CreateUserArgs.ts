import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { UserCreateInput } from "./UserCreateInput";

@ArgsType()
class CreateUserArgs {
  @Field(() => UserCreateInput, { nullable: false })
  data!: UserCreateInput;
}

export { CreateUserArgs };
