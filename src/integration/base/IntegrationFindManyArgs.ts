import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IntegrationWhereInput } from "./IntegrationWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { IntegrationOrderByInput } from "./IntegrationOrderByInput";

@ArgsType()
class IntegrationFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => IntegrationWhereInput,
  })
  @Field(() => IntegrationWhereInput, { nullable: true })
  @Type(() => IntegrationWhereInput)
  where?: IntegrationWhereInput;

  @ApiProperty({
    required: false,
    type: IntegrationOrderByInput,
  })
  @Field(() => IntegrationOrderByInput, { nullable: true })
  @Type(() => IntegrationOrderByInput)
  orderBy?: IntegrationOrderByInput;

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

export { IntegrationFindManyArgs };
