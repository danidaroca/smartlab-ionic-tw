import React from 'react';
import { IonIcon } from '@ionic/react';

export interface KpiCardProps {
  title: string;
  value: number;
  icon: string;
  iconColorClass: string;
  valueColorClass: string;
  sublabel?: string;
  testId?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  iconColorClass,
  valueColorClass,
  sublabel,
  testId,
}) => {
  return (
    <article
      data-testid={testId}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      aria-label={`${title}: ${value}`}
    >
      <div className="flex items-center justify-between text-slate-500">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-slate-100">
          <IonIcon icon={icon} className={`text-xl ${iconColorClass}`} aria-hidden="true" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${valueColorClass}`}>
          {value}
        </span>
        {sublabel && (
          <span className="text-[11px] font-medium text-slate-400">
            {sublabel}
          </span>
        )}
      </div>
    </article>
  );
};

export default KpiCard;
