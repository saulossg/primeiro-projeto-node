import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const appointmentDate = startOfHour(parseISO(date));

    const service = new CreateAppointmentService(appointmentRepository);
    const appointment = service.execute({ provider, date: appointmentDate });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default appointmentRouter;
