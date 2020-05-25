import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO, startOfHour } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const appointmentDate = startOfHour(parseISO(date));

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({ provider_id, date: appointmentDate });

  return response.json(appointment);
});

export default appointmentRouter;
