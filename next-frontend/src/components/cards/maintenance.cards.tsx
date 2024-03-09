"use client";
import Reacts, { useState } from "react";
import styled from "styled-components";
import { Maintenance } from "@/dto/maintenance.dto";
import MaintenanceCard from "./maintenance.card";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

export default function MaintenanceCards({
  maintenance,
}: {
  maintenance: Array<Maintenance> | [];
}) {
  return (
    <Container>
      {maintenance.length > 0 ? (
        maintenance.map((main) => (
          <MaintenanceCard key={main._id} maintenance={main} />
        ))
      ) : (
        <>No Data Found</>
      )}
    </Container>
  );
}
