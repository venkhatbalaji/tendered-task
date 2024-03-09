"use client";
import VehicleComponent from "@/components/vehicle/vehicle";

export default async function VehiclePage({
  searchParams,
}: {
  searchParams: any;
}) {
  return <VehicleComponent id={searchParams.id} />;
}
