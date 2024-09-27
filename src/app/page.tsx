import { AvailableResults, SearchAvailable } from '@/components';

export default function ReservationsSearch() {
  return (
    <div className="space-y-8">
      <SearchAvailable />
      <AvailableResults />
    </div>
  );
}
