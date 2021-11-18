import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Field } from "../../field/base/Field";
@InputType()
class EntityLogicWhereUniqueInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
}
export { EntityLogicWhereUniqueInput };
