import React from 'react';
type AgendaItem = {
    title: string;
    time?: string;
    isAllDay?: boolean;
};
interface AgendaModalProps {
    selectedDate: Date;
    getAgendasForDate: (date: Date) => AgendaItem[];
}
declare const AgendaModal: React.FC<AgendaModalProps>;
export default AgendaModal;
//# sourceMappingURL=agendaModal.d.ts.map