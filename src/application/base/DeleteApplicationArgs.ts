import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { ApplicationWhereUniqueInput } from "./ApplicationWhereUniqueInput";

@ArgsType()
class DeleteApplicationArgs {
  @Field(() => ApplicationWhereUniqueInput, { nullable: false })
  where!: ApplicationWhereUniqueInput;
}

export { DeleteApplicationArgs };
