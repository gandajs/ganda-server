import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { NavigationWhereInput } from "./NavigationWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { NavigationOrderByInput } from "./NavigationOrderByInput";

@ArgsType()
class NavigationFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => NavigationWhereInput,
  })
  @Field(() => NavigationWhereInput, { nullable: true })
  @Type(() => NavigationWhereInput)
  where?: NavigationWhereInput;

  @ApiProperty({
    required: false,
    type: NavigationOrderByInput,
  })
  @Field(() => NavigationOrderByInput, { nullable: true })
  @Type(() => NavigationOrderByInput)
  orderBy?: NavigationOrderByInput;

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

export { NavigationFindManyArgs };
