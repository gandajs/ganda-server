import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { HookWhereUniqueInput } from "./HookWhereUniqueInput";
import { HookUpdateInput } from "./HookUpdateInput";

@ArgsType()
class UpdateHookArgs {
  @Field(() => HookWhereUniqueInput, { nullable: false })
  where!: HookWhereUniqueInput;
  @Field(() => HookUpdateInput, { nullable: false })
  data!: HookUpdateInput;
}

export { UpdateHookArgs };
