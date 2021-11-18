import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { RoleWhereUniqueInput } from "./RoleWhereUniqueInput";
import { RoleUpdateInput } from "./RoleUpdateInput";

@ArgsType()
class UpdateRoleArgs {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  where!: RoleWhereUniqueInput;
  @Field(() => RoleUpdateInput, { nullable: false })
  data!: RoleUpdateInput;
}

export { UpdateRoleArgs };
