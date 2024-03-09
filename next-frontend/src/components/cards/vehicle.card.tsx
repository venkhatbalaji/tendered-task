import React from "react";
import { Vehicle } from "@/dto/vehicle.dto";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  height: 20rem;
  width: 28rem;
  margin: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f0f8ff;
  box-shadow: 0 1px 3px rgba(238, 174, 202, 1), 0 1px 2px rgba(238, 174, 202, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

const Dot = styled.div<{ status: string }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ status }) =>
    status === "active" ? "green" : "orange"};
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  gap: 1rem;
  font-weight: 800;
`;

const Field = styled.div``;

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  return (
    <Container onClick={() => router.push(`/vehicle?id=${vehicle._id}`)}>
      {vehicle.status && <Dot status={vehicle.status} />}
      <FieldContainer>
        <Field>Id: {vehicle._id}</Field>
        <Field>Model: {vehicle.vehicleModel}</Field>
        <Field>Type: {vehicle.vehicleType}</Field>
        <Field>Plate Number: {vehicle.licensePlate}</Field>
      </FieldContainer>
    </Container>
  );
}
