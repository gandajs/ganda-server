import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ApplicationWhereInput } from "./ApplicationWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { ApplicationOrderByInput } from "./ApplicationOrderByInput";

@ArgsType()
class ApplicationFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ApplicationWhereInput,
  })
  @Field(() => ApplicationWhereInput, { nullable: true })
  @Type(() => ApplicationWhereInput)
  where?: ApplicationWhereInput;

  @ApiProperty({
    required: false,
    type: ApplicationOrderByInput,
  })
  @Field(() => ApplicationOrderByInput, { nullable: true })
  @Type(() => ApplicationOrderByInput)
  orderBy?: ApplicationOrderByInput;

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

export { ApplicationFindManyArgs };
