import {MeetingStatusEnum} from "../enums/meeting-status.enum";


export function getTextForMeetingStatus(status: MeetingStatusEnum) {
    switch (status) {
        case MeetingStatusEnum.Accepted:
            return 'Aceptada';
        case MeetingStatusEnum.Approved:
            return 'Aprobada';
        case MeetingStatusEnum.Cancelled:
            return 'Cancelada';
        case MeetingStatusEnum.Complete:
            return 'Completada';
        case MeetingStatusEnum.Rejected:
            return 'Rechazada';
        case MeetingStatusEnum.InProgress:
            return 'En Progreso';
        case MeetingStatusEnum.Pending:
            return 'Pendiente';
        case MeetingStatusEnum.Unapproved:
            return 'Sin Aprobación';
    }
}
