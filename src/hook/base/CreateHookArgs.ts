import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { HookCreateInput } from "./HookCreateInput";

@ArgsType()
class CreateHookArgs {
  @Field(() => HookCreateInput, { nullable: false })
  data!: HookCreateInput;
}

export { CreateHookArgs };
