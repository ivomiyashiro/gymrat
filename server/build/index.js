"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var database_1 = require("./database");
var routes_1 = require("./routes");
var app = (0, express_1.default)();
// DB Conn
(0, database_1.dbConnection)();
// Config
app.use((0, cors_1.default)({
    origin: ['http://localhost:4000', 'http://127.0.0.1', 'http://104.142.122.231'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/auth', routes_1.AuthRouter);
app.use('/api/users', routes_1.UserRouter);
app.use('/api/products', routes_1.ProductsRouter);
app.use('/api/orders', routes_1.OrdersRouter);
app.use('/api/search', routes_1.SearchRounter);
app.listen(process.env.SERVER_PORT, function () {
    console.log("Server running in port ".concat(process.env.SERVER_PORT));
});
