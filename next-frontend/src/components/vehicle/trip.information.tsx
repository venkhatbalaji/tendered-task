import React from "react";
import styled from "styled-components";
import formatDate from "@/utils/date.utils";
import { Trip } from "@/dto/trips.dto";
import TripCards from "../cards/trip.cards";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

export default function TripInformationComponent({
  trip,
}: {
  trip: Array<Trip> | [];
}) {
  return (
    <Container>
      <InfoContainer>
        <TripCards trips={trip} />
      </InfoContainer>
    </Container>
  );
}
