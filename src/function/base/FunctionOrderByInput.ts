import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Field } from "../../field/base/Field";
import { SortOrder } from "../../util/SortOrder";

@InputType({
  isAbstract: true,
  description: undefined,
})
class FunctionOrderByInput {
  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  branch?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  createdAt?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  description?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  displayName?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  id?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  name?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  repository?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  updatedAt?: SortOrder;
}

export { FunctionOrderByInput };
