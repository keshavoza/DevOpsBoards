import express from "express";
import cors from "cors";
import helmet from "helmet";
import { roleRouter } from "./routes/roles.routes.js";
import {router as userRoutes} from "./routes/user.routes.js";
import {router as userRoleRoutes} from "./routes/userRole.routes.js";
import {router as permissionRoutes} from './routes/permission.routes.js'
import {router as attachmentRoutes} from './routes/attachments.routes.js'
import{router as rolePermissions} from './routes/permissionForRoles.routes.js'
import {router as boardsRoutes} from "./routes/boards.routes.js";
import {router as sprintRoutes} from "./routes/sprint.routes.js";
import {router as epicRoutes} from "./routes/epics.routes.js"
import { routesConstant } from "../constants/routes.constants.js";
import {router as UserStoryRoutes} from './routes/userStory.routes.js'
import { responseHandler } from "../common/handlers.js";

const {USERROUTES,ROLEROUTER,USERROLEROUTES,PERMISSIONROUTES,ATTACHMENTROUTES,ROLEPERMISSIONS,BOARDSROUTES,SPRINTROUTES,EPICROUTES,USERSTORYROUTES} = routesConstant



const app = express();

app.use(express.json());
app.use(cors());

app.use(helmet());

const routes = [
    { path: USERROUTES, router: userRoutes },
    { path: ROLEROUTER, router: roleRouter },
    { path: USERROLEROUTES, router: userRoleRoutes },
    { path: PERMISSIONROUTES, router: permissionRoutes },
    { path: ATTACHMENTROUTES, router: attachmentRoutes },
    { path: ROLEPERMISSIONS, router: rolePermissions },
    { path: BOARDSROUTES,router: boardsRoutes},
    {path:SPRINTROUTES,router:sprintRoutes},
    {path: EPICROUTES,router:epicRoutes},
    {path: USERSTORYROUTES,router:UserStoryRoutes}
  ];
  
routes.forEach(route => {

app.use(route.path, route.router);
});

app.use((error,req,res,next)=>{
  res.status(error.statusCode || 500).send(new responseHandler(null,error.message))
})
  
export default app;