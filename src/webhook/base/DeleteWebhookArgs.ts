import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { WebhookWhereUniqueInput } from "./WebhookWhereUniqueInput";

@ArgsType()
class DeleteWebhookArgs {
  @Field(() => WebhookWhereUniqueInput, { nullable: false })
  where!: WebhookWhereUniqueInput;
}

export { DeleteWebhookArgs };
