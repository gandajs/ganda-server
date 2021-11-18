import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { WebhookWhereUniqueInput } from "./WebhookWhereUniqueInput";
import { WebhookUpdateInput } from "./WebhookUpdateInput";

@ArgsType()
class UpdateWebhookArgs {
  @Field(() => WebhookWhereUniqueInput, { nullable: false })
  where!: WebhookWhereUniqueInput;
  @Field(() => WebhookUpdateInput, { nullable: false })
  data!: WebhookUpdateInput;
}

export { UpdateWebhookArgs };
