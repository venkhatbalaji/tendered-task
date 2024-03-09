"use client";
import React, { useState } from "react";
import { Vehicle } from "@/dto/vehicle.dto";
import styled from "styled-components";
import VehicleCard from "./vehicle.card";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export default function VehicleCards({
  vehicles,
}: {
  vehicles: Array<Vehicle> | [];
}) {
  return (
    <Container>
      {vehicles.length > 0 &&
        vehicles.map((vehicle) => <VehicleCard key={vehicle._id} vehicle={vehicle} />)}
    </Container>
  );
}
