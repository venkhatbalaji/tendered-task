import React from "react";
import { Vehicle } from "@/dto/vehicle.dto";
import styled from "styled-components";
import formatDate from "@/utils/date.utils";

const Container = styled.div`
  width: 100%;
  background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
  border: 1px solid rgba(238, 174, 202, 1);
  border-radius: 0.5rem;
`;

const InfoContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Field = styled.div`
  padding: 1rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export default function VehicleInformationComponent({
  vehicle,
}: {
  vehicle: Vehicle | null;
}) {
  return (
    <Container>
      <InfoContainer>
        {vehicle?._id && <Field>ID: {vehicle?._id}</Field>}
        {vehicle?.licensePlate && (
          <Field>PLATE NUMBER: {vehicle?.licensePlate}</Field>
        )}
        {vehicle?.vehicleModel && <Field>Model: {vehicle?.vehicleModel}</Field>}
        {vehicle?.vehicleType && <Field>Type: {vehicle?.vehicleType}</Field>}
        {vehicle?.createdAt && (
          <Field>Created Date: {formatDate(vehicle?.createdAt)}</Field>
        )}
        {vehicle?.nextMaintainanceDate && (
          <Field>
            Next Maintenance Date: {formatDate(vehicle?.nextMaintainanceDate)}
          </Field>
        )}
      </InfoContainer>
    </Container>
  );
}
