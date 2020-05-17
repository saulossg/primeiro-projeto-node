import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date) : Appointment | null {
    const findAppointmentInSameDate = this.appointments.find((appointment) => isEqual(date, appointment.date));

    return findAppointmentInSameDate || null;
  }

  public all() {
    return this.appointments;
  }

  public create({ provider, date } : CreateAppointmentDTO) : Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
