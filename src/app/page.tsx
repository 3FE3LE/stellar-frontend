import { PricingRooms } from '@/components';

export default function RoomPricing() {
  return (
    <section className="container mx-auto py-12 px-4">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Room Pricing
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Choose the perfect room for your stay. All rooms include breakfast and
          access to our fitness center.
        </p>
      </div>
      <PricingRooms/>
    </section>
  );
}
