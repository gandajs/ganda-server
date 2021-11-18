import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { PageCreateInput } from "./PageCreateInput";

@ArgsType()
class CreatePageArgs {
  @Field(() => PageCreateInput, { nullable: false })
  data!: PageCreateInput;
}

export { CreatePageArgs };
