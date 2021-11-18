import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { IntegrationWhereUniqueInput } from "./IntegrationWhereUniqueInput";
import { IntegrationUpdateInput } from "./IntegrationUpdateInput";

@ArgsType()
class UpdateIntegrationArgs {
  @Field(() => IntegrationWhereUniqueInput, { nullable: false })
  where!: IntegrationWhereUniqueInput;
  @Field(() => IntegrationUpdateInput, { nullable: false })
  data!: IntegrationUpdateInput;
}

export { UpdateIntegrationArgs };
