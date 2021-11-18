import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EntityWhereInput } from "./EntityWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { EntityOrderByInput } from "./EntityOrderByInput";

@ArgsType()
class EntityFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => EntityWhereInput,
  })
  @Field(() => EntityWhereInput, { nullable: true })
  @Type(() => EntityWhereInput)
  where?: EntityWhereInput;

  @ApiProperty({
    required: false,
    type: EntityOrderByInput,
  })
  @Field(() => EntityOrderByInput, { nullable: true })
  @Type(() => EntityOrderByInput)
  orderBy?: EntityOrderByInput;

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

export { EntityFindManyArgs };
