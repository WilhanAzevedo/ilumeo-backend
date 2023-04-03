"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_express2 = __toESM(require("express"));

// src/routes.ts
var import_express = require("express");

// src/entities/Point.ts
var Point = class {
  constructor(props) {
    this.props = props;
  }
  get id() {
    return this.props.id ?? 0;
  }
  get user_id() {
    return this.props.user_id;
  }
  get entry() {
    return this.props.entry;
  }
  get exit() {
    return this.props.exit;
  }
  static toResponse({ data }) {
    return {
      id: data.id,
      user_id: data.user_id,
      entry: data.entry,
      exit: data.exit
    };
  }
};

// src/useCases/createEntryRegistry/CreateEntryRegistryUseCase.ts
var CreateEntryRegistryUseCase = class {
  constructor(pointRepository4, userRepository4) {
    this.pointRepository = pointRepository4;
    this.userRepository = userRepository4;
  }
  async execute(data) {
    const user = await this.userRepository.findById(data.user_id);
    if (!user) {
      throw new Error("User not found.");
    }
    const point = await this.pointRepository.createEntry(new Point(data));
    return point;
  }
};

// src/useCases/createEntryRegistry/CreateEntryRegistryController.ts
var CreateEntryRegistryController = class {
  constructor(createEntryRegistryUseCase2) {
    this.createEntryRegistryUseCase = createEntryRegistryUseCase2;
  }
  async handle(request, response) {
    const { user_id, entry } = request.body;
    try {
      const registry = await this.createEntryRegistryUseCase.execute({
        user_id,
        entry
      });
      return response.status(201).send(registry);
    } catch (Error2) {
      return response.status(400).json({
        message: Error2.message || "Unexpected error."
      });
    }
  }
};

// src/repositories/PointRepository.ts
var import_client = require("@prisma/client");
var PointRepository = class {
  constructor() {
    this.prisma = new import_client.PrismaClient();
  }
  async createEntry(point) {
    const pointCreated = await this.prisma.points.create({
      data: {
        user_id: point.user_id,
        entry: point.entry,
        exit: point.exit
      }
    });
    return Point.toResponse({ data: pointCreated });
  }
  async createExit(point) {
    const pointCreated = await this.prisma.points.update({
      where: {
        id: point.id
      },
      data: {
        exit: point.exit
      }
    });
    return Point.toResponse({ data: pointCreated });
  }
  async findById(id) {
    const point = await this.prisma.points.findFirstOrThrow({
      where: {
        id
      }
    });
    return Point.toResponse({ data: point });
  }
  async findByUserId(id_user) {
    const points = await this.prisma.points.findMany({
      where: {
        user_id: id_user
      }
    });
    return points.map((point) => Point.toResponse({ data: point }));
  }
};

// src/repositories/UserRepository.ts
var import_client2 = require("@prisma/client");

// src/entities/User.ts
var User = class {
  constructor(props) {
    this.props = props;
  }
  get id() {
    return this.props.id ?? 0;
  }
  get name() {
    return this.props.name;
  }
  get code() {
    return this.props.code;
  }
  get is_admin() {
    return this.props.is_admin;
  }
  static toResponse({ data }) {
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      is_admin: data.is_admin
    };
  }
};

// src/repositories/UserRepository.ts
var UserRepository = class {
  constructor() {
    this.prisma = new import_client2.PrismaClient();
  }
  async create(user) {
    const userCreated = await this.prisma.users.create({
      data: {
        name: user.name,
        code: user.code,
        is_admin: user.is_admin
      }
    });
    return User.toResponse({ data: userCreated });
  }
  async findByCode(code) {
    const user = await this.prisma.users.findUnique({
      where: {
        code
      }
    });
    if (!user) {
      return null;
    }
    return user;
  }
  async findById(id) {
    const user = await this.prisma.users.findFirstOrThrow({
      where: {
        id
      }
    });
    if (!user) {
      return null;
    }
    return user;
  }
  async listAll() {
    const users = await this.prisma.users.findMany();
    return users.map((user) => User.toResponse({ data: user }));
  }
};

// src/useCases/createEntryRegistry/index.ts
var pointRepository = new PointRepository();
var userRepository = new UserRepository();
var createEntryRegistryUseCase = new CreateEntryRegistryUseCase(
  pointRepository,
  userRepository
);
var createEntryRegistryController = new CreateEntryRegistryController(
  createEntryRegistryUseCase
);

// src/useCases/createExitRegistry/CreateExitRegistryUseCase.ts
var CreateExitRegistryUseCase = class {
  constructor(pointRepository4) {
    this.pointRepository = pointRepository4;
  }
  async execute(data) {
    const point = await this.pointRepository.findById(data.id);
    if (!point) {
      throw new Error("Point not found.");
    }
    const pointRegistred = await this.pointRepository.createExit(data);
    return pointRegistred;
  }
};

// src/useCases/createExitRegistry/CreateExitRegistryController.ts
var CreateExitRegistryController = class {
  constructor(createExitRegistryUseCase2) {
    this.createExitRegistryUseCase = createExitRegistryUseCase2;
  }
  async handle(request, response) {
    const { id, user_id, entry, exit } = request.body;
    try {
      const registry = await this.createExitRegistryUseCase.execute({
        id,
        user_id,
        entry,
        exit
      });
      return response.status(201).send(registry);
    } catch (Error2) {
      return response.status(400).json({
        message: Error2.message || "Unexpected error."
      });
    }
  }
};

// src/useCases/createExitRegistry/index.ts
var pointRepository2 = new PointRepository();
var createExitRegistryUseCase = new CreateExitRegistryUseCase(pointRepository2);
var createExitRegistryController = new CreateExitRegistryController(
  createExitRegistryUseCase
);

// src/useCases/createUser/CreateUserUseCase.ts
var CreateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute(data) {
    const userAlreadyExists = await this.usersRepository.findByCode(data.code);
    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }
    const user = await this.usersRepository.create(new User(data));
    return user;
  }
};

// src/useCases/createUser/CreateUserController.ts
var CreateUserController = class {
  constructor(createUserUseCase2) {
    this.createUserUseCase = createUserUseCase2;
  }
  async handle(request, response) {
    const { name, code, is_admin } = request.body;
    try {
      const user = await this.createUserUseCase.execute({
        name,
        code,
        is_admin
      });
      return response.status(201).send(user);
    } catch (Error2) {
      return response.status(400).json({
        message: Error2.message || "Unexpected error."
      });
    }
  }
};

// src/useCases/createUser/index.ts
var userRepository2 = new UserRepository();
var createUserUseCase = new CreateUserUseCase(userRepository2);
var createUserController = new CreateUserController(createUserUseCase);

// src/useCases/listPoints/ListPointsUseCase.ts
var ListPointsUseCase = class {
  constructor(pointsRepository) {
    this.pointsRepository = pointsRepository;
  }
  async execute(user_id) {
    const points = await this.pointsRepository.findByUserId(user_id);
    return points;
  }
};

// src/useCases/listPoints/ListPointsController.ts
var ListPointsController = class {
  constructor(listPointsUseCase2) {
    this.listPointsUseCase = listPointsUseCase2;
  }
  async handle(request, response) {
    const user_id = request.body.user_id;
    try {
      const registrys = await this.listPointsUseCase.execute(user_id);
      return response.status(200).send(registrys);
    } catch (Error2) {
      return response.status(400).json({
        message: Error2.message || "Unexpected error."
      });
    }
  }
};

// src/useCases/listPoints/index.ts
var pointRepository3 = new PointRepository();
var listPointsUseCase = new ListPointsUseCase(pointRepository3);
var listPointsController = new ListPointsController(listPointsUseCase);

// src/useCases/ListUser/ListUserUseCase.ts
var ListUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute() {
    const users = await this.usersRepository.listAll();
    return users;
  }
};

// src/useCases/ListUser/ListUserController.ts
var ListUserController = class {
  constructor(listUserUseCase2) {
    this.listUserUseCase = listUserUseCase2;
  }
  async handle(request, response) {
    try {
      const users = await this.listUserUseCase.execute();
      return response.status(200).send(users);
    } catch (Error2) {
      return response.status(400).json({
        message: Error2.message || "Unexpected error."
      });
    }
  }
};

// src/useCases/ListUser/index.ts
var userRepository3 = new UserRepository();
var listUserUseCase = new ListUserUseCase(userRepository3);
var listUserController = new ListUserController(listUserUseCase);

// src/routes.ts
var router = (0, import_express.Router)();
router.get("/", (request, response) => {
  return response.json({ message: "Hello World Teste 2" });
});
router.post("/users", (request, response) => {
  return createUserController.handle(request, response);
});
router.get("/users", (request, response) => {
  return listUserController.handle(request, response);
});
router.post("/entries", (request, response) => {
  return createEntryRegistryController.handle(request, response);
});
router.post("/exits", (request, response) => {
  return createExitRegistryController.handle(request, response);
});
router.post("/points-by-user", (request, response) => {
  return listPointsController.handle(request, response);
});

// src/app.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use(router);

// src/server.ts
app.listen(3333).on("listening", () => {
  console.log("Server is running on port 3333");
});
