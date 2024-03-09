import React from "react";
import styled from "styled-components";
import { Maintenance } from "@/dto/maintenance.dto";
import formatDate from "@/utils/date.utils";

const Container = styled.div`
  padding: 1rem;
  height: 10rem;
  width: 18rem;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 8px;
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
    status === "complete" ? "grey" : "green"};
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-weight: 800;
`;

const Field = styled.div``;

export default function MaintenanceCard({
  maintenance,
}: {
  maintenance: Maintenance;
}) {
  return (
    <Container>
      {maintenance.status && <Dot status={maintenance.status} />}
      <FieldContainer>
        <Field>Description: {maintenance.description}</Field>
        <Field>Date: {formatDate(maintenance.startDate)}</Field>
        <Field>
          Odo Reading: {maintenance.odometerReading.reading}{" "}
          {maintenance.odometerReading.unit}
        </Field>
      </FieldContainer>
    </Container>
  );
}
