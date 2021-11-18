import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { NavigationWhereUniqueInput } from "./NavigationWhereUniqueInput";
import { NavigationUpdateInput } from "./NavigationUpdateInput";

@ArgsType()
class UpdateNavigationArgs {
  @Field(() => NavigationWhereUniqueInput, { nullable: false })
  where!: NavigationWhereUniqueInput;
  @Field(() => NavigationUpdateInput, { nullable: false })
  data!: NavigationUpdateInput;
}

export { UpdateNavigationArgs };
