"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VehicleInformation } from "@/dto/common.dto";
import VehicleInformationComponent from "./vehicle.information";
import MaintenanceInformationComponent from "./maintenance.information";
import TripInformationComponent from "./trip.information";
import { VehicleApi } from "@/api/vehicle.api";
const Container = styled.div`
  padding: 2rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Header = styled.h1`
  text-align: center;
  color: #101010;
`;

const StatusContainer = styled.div`
  display: flex;
  font-weight: bold;
  align-items: center;
  gap: 0.2rem;
`;

const Dot = styled.div<{ status: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ status }) =>
    status === "active" ? "green" : "orange"};
`;

const PerformanceContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

export default function VehicleComponent({ id }: { id: string }) {
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInformation | null>(
    null
  );
  const [hidden, setHidden] = useState<boolean>(true);
  async function getData({
    id,
  }: {
    id: string;
  }): Promise<VehicleInformation | null> {
    try {
      const vehicle: VehicleInformation | null =
        await VehicleApi.getVehicleData("1231", id);
      return vehicle;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  useEffect(() => {
    if (vehicleInfo === null) {
      getData({ id: id }).then((vehicle) => {
        setVehicleInfo(vehicle);
      });
    }
  }, [vehicleInfo]);

  if (vehicleInfo) {
    return (
      <Container>
        <HeaderContainer>
          <Header>{vehicleInfo?.vehicle.vehicleModel} Information Page</Header>
          <StatusContainer>
            {vehicleInfo?.vehicle.status}
            <Dot
              status={
                vehicleInfo?.vehicle.status
                  ? vehicleInfo?.vehicle.status
                  : "null"
              }
            />
          </StatusContainer>
        </HeaderContainer>
        <VehicleInformationComponent
          vehicle={vehicleInfo?.vehicle ? vehicleInfo?.vehicle : null}
        />
        <PerformanceContainer>
          <MaintenanceInformationComponent
            maintenance={
              vehicleInfo?.maintenance ? vehicleInfo?.maintenance : []
            }
          />
          <TripInformationComponent
            trip={vehicleInfo?.trips ? vehicleInfo?.trips : []}
          />
        </PerformanceContainer>
      </Container>
    );
  } else {
    return <>No Data Found</>;
  }
}
