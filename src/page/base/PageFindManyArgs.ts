import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PageWhereInput } from "./PageWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { PageOrderByInput } from "./PageOrderByInput";

@ArgsType()
class PageFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PageWhereInput,
  })
  @Field(() => PageWhereInput, { nullable: true })
  @Type(() => PageWhereInput)
  where?: PageWhereInput;

  @ApiProperty({
    required: false,
    type: PageOrderByInput,
  })
  @Field(() => PageOrderByInput, { nullable: true })
  @Type(() => PageOrderByInput)
  orderBy?: PageOrderByInput;

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

export { PageFindManyArgs };
