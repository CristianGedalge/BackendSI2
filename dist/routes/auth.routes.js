"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authroutes = void 0;
const express_1 = require("express");
class Authroutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.post('/login');
        router.post('/login');
        router.get('/login');
        return router;
    }
}
exports.Authroutes = Authroutes;
