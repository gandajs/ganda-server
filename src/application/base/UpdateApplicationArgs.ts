import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { ApplicationWhereUniqueInput } from "./ApplicationWhereUniqueInput";
import { ApplicationUpdateInput } from "./ApplicationUpdateInput";

@ArgsType()
class UpdateApplicationArgs {
  @Field(() => ApplicationWhereUniqueInput, { nullable: false })
  where!: ApplicationWhereUniqueInput;
  @Field(() => ApplicationUpdateInput, { nullable: false })
  data!: ApplicationUpdateInput;
}

export { UpdateApplicationArgs };
