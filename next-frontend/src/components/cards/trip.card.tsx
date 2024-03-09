import React from "react";
import styled from "styled-components";
import formatDate from "@/utils/date.utils";
import { Trip } from "@/dto/trips.dto";

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

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Container>
      <Dot status={trip.active ? "none" : "complete"} />
      <FieldContainer>
        <Field>Start Date: {formatDate(trip?.startTime)}</Field>
        <Field>End Date: {formatDate(trip?.endTime)}</Field>
        <Field>Start Lat: {trip.startLocation.lat}</Field>
        <Field>Start Long: {trip.startLocation.long}</Field>
        <Field>End Lat: {trip.endLocation.lat}</Field>
        <Field>End Long: {trip.endLocation.long}</Field>
      </FieldContainer>
    </Container>
  );
}
