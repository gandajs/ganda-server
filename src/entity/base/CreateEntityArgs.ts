import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { EntityCreateInput } from "./EntityCreateInput";

@ArgsType()
class CreateEntityArgs {
  @Field(() => EntityCreateInput, { nullable: false })
  data!: EntityCreateInput;
}

export { CreateEntityArgs };
