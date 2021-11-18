import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { RoleCreateInput } from "./RoleCreateInput";

@ArgsType()
class CreateRoleArgs {
  @Field(() => RoleCreateInput, { nullable: false })
  data!: RoleCreateInput;
}

export { CreateRoleArgs };
