import React from 'react';
import {
  IonChip,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from '@ionic/react';
import {
  checkmarkCircleOutline,
  chevronForwardOutline,
  locationOutline,
  trashOutline,
} from 'ionicons/icons';
import { Incident, IncidentPriority } from '../types/incident';

export interface IncidentItemProps {
  incident: Incident;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export const PRIORITY_BADGE_STYLES: Record<IncidentPriority, string> = {
  alta: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20',
  media: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
  baja: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
};

export const IncidentItem: React.FC<IncidentItemProps> = ({
  incident,
  onToggleStatus,
  onDelete,
  onViewDetails,
}) => {
  const isResolved = incident.status === 'resuelta';

  return (
    <IonItemSliding
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-md"
    >
      <IonItem
        lines="none"
        className="incident-item w-full"
        style={{
          '--background': 'transparent',
          '--padding-start': '16px',
          '--inner-padding-end': '16px',
          '--padding-top': '12px',
          '--padding-bottom': '12px',
        } as React.CSSProperties}
      >
        <div className="w-full py-1">
          {/* Fila superior: ID, Prioridad y Hora */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                {incident.id}
              </span>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                  PRIORITY_BADGE_STYLES[incident.priority]
                }`}
              >
                {incident.priority}
              </span>
            </div>
            <span className="text-xs font-medium text-slate-400">
              {incident.createdAt}
            </span>
          </div>

          {/* Título de la incidencia con enlace/botón a detalle */}
          <div className="mt-2 flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={() => onViewDetails?.(incident.id)}
              className="group text-left focus:outline-hidden"
              aria-label={`Ver detalles de ${incident.title}`}
            >
              <h3
                className={`text-base font-semibold transition-colors group-hover:text-blue-600 ${
                  isResolved
                    ? 'text-slate-400 line-through'
                    : 'text-slate-900'
                }`}
              >
                {incident.title}
              </h3>
            </button>
            {onViewDetails && (
              <button
                type="button"
                onClick={() => onViewDetails(incident.id)}
                className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-hidden"
                title="Ver detalle de incidencia"
                aria-label={`Ver ficha de ${incident.id}`}
              >
                <IonIcon icon={chevronForwardOutline} className="text-lg" />
              </button>
            )}
          </div>

          {/* Descripción */}
          <p className="mt-1 text-sm text-slate-600 line-clamp-2">
            {incident.description}
          </p>

          {/* Fila inferior: Ubicación y Chip de estado interactivo */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <IonIcon icon={locationOutline} className="text-slate-400 text-sm" />
              <span>
                Ubicación: <strong className="text-slate-700">{incident.location}</strong>
              </span>
            </span>

            <div className="flex items-center gap-2">
              <IonChip
                color={isResolved ? 'success' : 'warning'}
                className="m-0 h-6 text-xs font-semibold cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStatus(incident.id);
                }}
                role="button"
                aria-label={`Cambiar estado de ${incident.status}`}
              >
                {isResolved ? 'Resuelta' : 'Pendiente'}
              </IonChip>
            </div>
          </div>
        </div>
      </IonItem>

      {/* Opciones tras deslizamiento (Swipe actions para móvil/touch) */}
      <IonItemOptions side="end">
        <IonItemOption
          color="success"
          onClick={() => onToggleStatus(incident.id)}
          aria-label={isResolved ? 'Marcar como pendiente' : 'Marcar como resuelta'}
        >
          <IonIcon slot="icon-only" icon={checkmarkCircleOutline} />
        </IonItemOption>
        <IonItemOption
          color="danger"
          onClick={() => onDelete(incident.id)}
          aria-label="Eliminar incidencia"
        >
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default IncidentItem;
