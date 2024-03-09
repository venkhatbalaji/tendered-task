"use client";
import Reacts, { useState } from "react";
import styled from "styled-components";
import { Trip } from "@/dto/trips.dto";
import TripCard from "./trip.card";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

export default function TripCards({ trips }: { trips: Array<Trip> | [] }) {
  return (
    <Container>
      {trips.length > 0 ? (
        trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
      ) : (
        <>No Data Found</>
      )}
    </Container>
  );
}
