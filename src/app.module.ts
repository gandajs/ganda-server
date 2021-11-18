import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { EntityModule } from "./entity/entity.module";
import { FieldModule } from "./field/field.module";
import { EntityLogicModule } from "./entityLogic/entityLogic.module";
import { WebhookModule } from "./webhook/webhook.module";
import { FunctionModule } from "./function/function.module";
import { HookModule } from "./hook/hook.module";
import { NavigationModule } from "./navigation/navigation.module";
import { ApplicationModule } from "./application/application.module";
import { IntegrationModule } from "./integration/integration.module";
import { AuthenticatorModule } from "./authenticator/authenticator.module";
import { RoleModule } from "./role/role.module";
import { PageModule } from "./page/page.module";
import { HealthModule } from "./health/health.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    EntityModule,
    FieldModule,
    EntityLogicModule,
    WebhookModule,
    FunctionModule,
    HookModule,
    NavigationModule,
    ApplicationModule,
    IntegrationModule,
    AuthenticatorModule,
    RoleModule,
    PageModule,
    HealthModule,
    ACLModule,
    AuthModule,
    SecretsManagerModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
