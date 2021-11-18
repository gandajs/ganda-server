import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { UserWhereUniqueInput } from "./UserWhereUniqueInput";
import { UserUpdateInput } from "./UserUpdateInput";

@ArgsType()
class UpdateUserArgs {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  where!: UserWhereUniqueInput;
  @Field(() => UserUpdateInput, { nullable: false })
  data!: UserUpdateInput;
}

export { UpdateUserArgs };
