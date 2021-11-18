import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { EntityWhereUniqueInput } from "./EntityWhereUniqueInput";

@ArgsType()
class DeleteEntityArgs {
  @Field(() => EntityWhereUniqueInput, { nullable: false })
  where!: EntityWhereUniqueInput;
}

export { DeleteEntityArgs };
