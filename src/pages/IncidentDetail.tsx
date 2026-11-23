import React, { useState, useEffect } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import {
  alertCircleOutline,
  calendarOutline,
  checkmarkCircleOutline,
  locationOutline,
  saveOutline,
  trashOutline,
} from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import useIncidentsStorage from '../hooks/useIncidentsStorage';
import { PRIORITY_BADGE_STYLES } from '../components/IncidentItem';

interface RouteParams {
  id: string;
}

export const IncidentDetail: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { incidents, updateDescription, toggleStatus, deleteIncident } =
    useIncidentsStorage();

  const incident = incidents.find((item) => item.id === id);

  const [description, setDescription] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (incident) {
      setDescription(incident.description);
    }
  }, [incident]);

  if (!incident) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" text="Atrás" />
            </IonButtons>
            <IonTitle className="font-semibold">Incidencia no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-slate-50 ion-padding">
          <div className="mx-auto max-w-lg mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-xs">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
              <IonIcon icon={alertCircleOutline} className="text-3xl" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Incidencia no localizada</h2>
            <p className="mt-2 text-sm text-slate-600">
              No se ha encontrado ninguna incidencia registrada con el código{' '}
              <span className="font-mono font-semibold text-slate-900">{id}</span>.
            </p>
            <div className="mt-6">
              <IonButton routerLink="/home" expand="block" fill="solid">
                Volver al Listado Principal
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const isResolved = incident.status === 'resuelta';

  const handleSaveDescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setToastMessage('La descripción no puede estar vacía');
      return;
    }
    updateDescription(incident.id, description.trim());
    setIsEditing(false);
    setToastMessage('Descripción técnica actualizada con éxito');
  };

  const handleToggle = () => {
    toggleStatus(incident.id);
    setToastMessage(
      `Estado actualizado a ${!isResolved ? 'Resuelta' : 'Pendiente'}`
    );
  };

  const handleDelete = () => {
    deleteIncident(incident.id);
    setToastMessage(`Incidencia ${incident.id} eliminada`);
    setTimeout(() => {
      history.replace('/home');
    }, 400);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Atrás" />
          </IonButtons>
          <IonTitle className="font-semibold tracking-tight">
            Ficha Técnica: {incident.id}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-slate-50">
        <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          {/* Tarjeta Resumen Principal */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Cabecera de la ficha */}
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-blue-100/70 px-2.5 py-1 font-mono text-sm font-bold text-blue-700">
                    {incident.id}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                      PRIORITY_BADGE_STYLES[incident.priority]
                    }`}
                  >
                    Prioridad {incident.priority}
                  </span>
                </div>

                <IonChip
                  color={isResolved ? 'success' : 'warning'}
                  className="m-0 cursor-pointer font-semibold"
                  onClick={handleToggle}
                  aria-label={`Estado actual: ${incident.status}. Tocar para cambiar.`}
                >
                  <IonIcon
                    icon={isResolved ? checkmarkCircleOutline : alertCircleOutline}
                  />
                  <span>{isResolved ? 'Resuelta' : 'Pendiente'}</span>
                </IonChip>
              </div>

              <h1 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {incident.title}
              </h1>
            </div>

            {/* Metadatos técnicos */}
            <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 bg-slate-50/50 p-4 sm:p-6 text-sm">
              <div className="flex items-center gap-3 py-2 sm:py-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <IonIcon icon={locationOutline} className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Ubicación / Dependencia
                  </p>
                  <p className="font-medium text-slate-800">{incident.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2 sm:py-0 sm:pl-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <IonIcon icon={calendarOutline} className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Hora / Registro
                  </p>
                  <p className="font-medium text-slate-800">{incident.createdAt}</p>
                </div>
              </div>
            </div>

            {/* Sección de Descripción Técnica y Edición */}
            <section className="p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  Descripción del Incidente
                </h2>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  {isEditing ? 'Cancelar Edición' : 'Editar Descripción'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveDescription} className="space-y-4">
                  <div className="rounded-xl border border-blue-200 bg-blue-50/20 p-2">
                    <IonItem lines="none" className="bg-transparent">
                      <IonTextarea
                        rows={5}
                        placeholder="Edita la descripción detallada de la incidencia..."
                        value={description}
                        onIonInput={(e) => setDescription(e.detail.value ?? '')}
                        className="font-sans text-sm"
                        autoGrow
                      />
                    </IonItem>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDescription(incident.description);
                        setIsEditing(false);
                      }}
                      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-hidden"
                    >
                      <IonIcon icon={saveOutline} className="text-base" />
                      <span>Guardar Cambios</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
                  <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                    {incident.description}
                  </p>
                </div>
              )}

              {/* Botonera de acciones rápidas */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={handleToggle}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                    isResolved
                      ? 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <IonIcon
                    icon={isResolved ? alertCircleOutline : checkmarkCircleOutline}
                    className="text-base"
                  />
                  <span>
                    {isResolved ? 'Reabrir Incidencia' : 'Marcar como Resuelta'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-rose-700 hover:bg-rose-100"
                >
                  <IonIcon icon={trashOutline} className="text-base" />
                  <span>Eliminar Incidencia</span>
                </button>
              </div>
            </section>
          </div>
        </main>

        <IonToast
          isOpen={toastMessage !== null}
          message={toastMessage ?? ''}
          duration={2200}
          position="bottom"
          onDidDismiss={() => setToastMessage(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default IncidentDetail;
