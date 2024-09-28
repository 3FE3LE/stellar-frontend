import { AvailableResults, SearchAvailable } from '@/components';

export default function SearchPage() {
  return (
    <div className="space-y-8">
      <SearchAvailable />
      <AvailableResults />
    </div>
  );
}
