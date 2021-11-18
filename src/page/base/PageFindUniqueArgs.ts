import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { PageWhereUniqueInput } from "./PageWhereUniqueInput";

@ArgsType()
class PageFindUniqueArgs {
  @Field(() => PageWhereUniqueInput, { nullable: false })
  where!: PageWhereUniqueInput;
}

export { PageFindUniqueArgs };
