import { Router } from 'express';
import appointments from './appointments.routes';
import users from './users.routes';
import session from './session.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', session);

export default routes;
