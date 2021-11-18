import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { NavigationWhereUniqueInput } from "./NavigationWhereUniqueInput";

@ArgsType()
class NavigationFindUniqueArgs {
  @Field(() => NavigationWhereUniqueInput, { nullable: false })
  where!: NavigationWhereUniqueInput;
}

export { NavigationFindUniqueArgs };
