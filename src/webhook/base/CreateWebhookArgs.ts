import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { WebhookCreateInput } from "./WebhookCreateInput";

@ArgsType()
class CreateWebhookArgs {
  @Field(() => WebhookCreateInput, { nullable: false })
  data!: WebhookCreateInput;
}

export { CreateWebhookArgs };
