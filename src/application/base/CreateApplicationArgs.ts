import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { ApplicationCreateInput } from "./ApplicationCreateInput";

@ArgsType()
class CreateApplicationArgs {
  @Field(() => ApplicationCreateInput, { nullable: false })
  data!: ApplicationCreateInput;
}

export { CreateApplicationArgs };
