import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EntityLogicWhereInput } from "./EntityLogicWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { EntityLogicOrderByInput } from "./EntityLogicOrderByInput";

@ArgsType()
class EntityLogicFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => EntityLogicWhereInput,
  })
  @Field(() => EntityLogicWhereInput, { nullable: true })
  @Type(() => EntityLogicWhereInput)
  where?: EntityLogicWhereInput;

  @ApiProperty({
    required: false,
    type: EntityLogicOrderByInput,
  })
  @Field(() => EntityLogicOrderByInput, { nullable: true })
  @Type(() => EntityLogicOrderByInput)
  orderBy?: EntityLogicOrderByInput;

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

export { EntityLogicFindManyArgs };
