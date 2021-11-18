import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { NavigationCreateInput } from "./NavigationCreateInput";

@ArgsType()
class CreateNavigationArgs {
  @Field(() => NavigationCreateInput, { nullable: false })
  data!: NavigationCreateInput;
}

export { CreateNavigationArgs };
