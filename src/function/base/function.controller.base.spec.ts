import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { FunctionController } from "../function.controller";
import { FunctionService } from "../function.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  branch: "exampleBranch",
  createdAt: new Date(),
  description: "exampleDescription",
  displayName: "exampleDisplayName",
  id: "exampleId",
  name: "exampleName",
  repository: "exampleRepository",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  branch: "exampleBranch",
  createdAt: new Date(),
  description: "exampleDescription",
  displayName: "exampleDisplayName",
  id: "exampleId",
  name: "exampleName",
  repository: "exampleRepository",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    branch: "exampleBranch",
    createdAt: new Date(),
    description: "exampleDescription",
    displayName: "exampleDisplayName",
    id: "exampleId",
    name: "exampleName",
    repository: "exampleRepository",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  branch: "exampleBranch",
  createdAt: new Date(),
  description: "exampleDescription",
  displayName: "exampleDisplayName",
  id: "exampleId",
  name: "exampleName",
  repository: "exampleRepository",
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Function", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: FunctionService,
          useValue: service,
        },
      ],
      controllers: [FunctionController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /functions", async () => {
    await request(app.getHttpServer())
      .post("/functions")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /functions", async () => {
    await request(app.getHttpServer())
      .get("/functions")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /functions/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/functions"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /functions/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/functions"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
