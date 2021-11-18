import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { NavigationWhereUniqueInput } from "./NavigationWhereUniqueInput";

@ArgsType()
class DeleteNavigationArgs {
  @Field(() => NavigationWhereUniqueInput, { nullable: false })
  where!: NavigationWhereUniqueInput;
}

export { DeleteNavigationArgs };
