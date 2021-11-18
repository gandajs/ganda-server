import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { PageWhereUniqueInput } from "./PageWhereUniqueInput";

@ArgsType()
class DeletePageArgs {
  @Field(() => PageWhereUniqueInput, { nullable: false })
  where!: PageWhereUniqueInput;
}

export { DeletePageArgs };
