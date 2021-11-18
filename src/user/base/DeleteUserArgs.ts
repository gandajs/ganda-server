import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { UserWhereUniqueInput } from "./UserWhereUniqueInput";

@ArgsType()
class DeleteUserArgs {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  where!: UserWhereUniqueInput;
}

export { DeleteUserArgs };
