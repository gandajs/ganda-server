import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { IntegrationWhereUniqueInput } from "./IntegrationWhereUniqueInput";

@ArgsType()
class DeleteIntegrationArgs {
  @Field(() => IntegrationWhereUniqueInput, { nullable: false })
  where!: IntegrationWhereUniqueInput;
}

export { DeleteIntegrationArgs };
