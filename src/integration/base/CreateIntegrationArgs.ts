import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { IntegrationCreateInput } from "./IntegrationCreateInput";

@ArgsType()
class CreateIntegrationArgs {
  @Field(() => IntegrationCreateInput, { nullable: false })
  data!: IntegrationCreateInput;
}

export { CreateIntegrationArgs };
