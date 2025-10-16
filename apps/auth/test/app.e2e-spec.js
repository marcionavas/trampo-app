"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const auth_module_1 = require("./../src/auth.module");
describe('AuthController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [auth_module_1.AuthModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('/ (GET)', () => {
        return (0, supertest_1.default)(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map