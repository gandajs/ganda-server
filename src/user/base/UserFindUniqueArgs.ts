import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { UserWhereUniqueInput } from "./UserWhereUniqueInput";

@ArgsType()
class UserFindUniqueArgs {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  where!: UserWhereUniqueInput;
}

export { UserFindUniqueArgs };
