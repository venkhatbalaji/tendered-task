"use client";
import React, { useEffect, useState } from "react";
import { Vehicle } from "@/dto/vehicle.dto";
import styled from "styled-components";
import VehicleCards from "../cards/vehicle.cards";
import Modal from "../modal/modal";
import { VehicleApi } from "@/api/vehicle.api";
const Container = styled.div`
  padding: 2rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  text-align: center;
  background-color: #fd5c63;
  margin-left: 2rem;
  white-space: nowrap;
  outline: none;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 0.5rem;
  padding: 1.5rem 3rem;
  transition: all 0.1s ease-in;
  cursor: pointer;
  border: 1px solid pink;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff8080;
  }
`;

const Header = styled.h1`
  text-align: center;
  color: #101010;
`;

export default function Home() {
  const [vehiclesList, setVehicles] = useState<Array<Vehicle> | []>([]);
  const [hidden, setHidden] = useState<boolean>(true);
  const [user, setUser] = useState<string>("User");
  const updateVehicle = (vehicle: Vehicle): void => {
    const updatedVehicles = [...vehiclesList, vehicle];
    setVehicles(updatedVehicles);
  };
  async function getData(): Promise<Array<Vehicle> | []> {
    try {
      const vehicles: Array<Vehicle> | [] = await VehicleApi.getAllVehicles(
        "1231"
      );
      return vehicles;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  useEffect(() => {
    if (vehiclesList.length === 0) {
      getData().then((vehicle) => {
        setVehicles(vehicle);
      });
    }
  }, [vehiclesList]);
  if (vehiclesList.length > 0) {
    return (
      <Container>
        <HeaderContainer>
          <Header>Welcome to your dahboard, {user}.</Header>
          <Button onClick={() => setHidden(false)}>Add Vehicle</Button>
        </HeaderContainer>
        <Modal
          hidden={hidden}
          unBlur={() => setHidden(true)}
          updateVehicle={updateVehicle}
        />
        <VehicleCards vehicles={vehiclesList} />
      </Container>
    );
  } else {
    return <>No Data Found</>;
  }
}
