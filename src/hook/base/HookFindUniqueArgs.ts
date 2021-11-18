import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { HookWhereUniqueInput } from "./HookWhereUniqueInput";

@ArgsType()
class HookFindUniqueArgs {
  @Field(() => HookWhereUniqueInput, { nullable: false })
  where!: HookWhereUniqueInput;
}

export { HookFindUniqueArgs };
