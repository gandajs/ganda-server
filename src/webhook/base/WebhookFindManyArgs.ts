import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { WebhookWhereInput } from "./WebhookWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { WebhookOrderByInput } from "./WebhookOrderByInput";

@ArgsType()
class WebhookFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => WebhookWhereInput,
  })
  @Field(() => WebhookWhereInput, { nullable: true })
  @Type(() => WebhookWhereInput)
  where?: WebhookWhereInput;

  @ApiProperty({
    required: false,
    type: WebhookOrderByInput,
  })
  @Field(() => WebhookOrderByInput, { nullable: true })
  @Type(() => WebhookOrderByInput)
  orderBy?: WebhookOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { WebhookFindManyArgs };
