import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { RoleWhereUniqueInput } from "./RoleWhereUniqueInput";

@ArgsType()
class DeleteRoleArgs {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  where!: RoleWhereUniqueInput;
}

export { DeleteRoleArgs };
