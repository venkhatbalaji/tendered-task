import React, { useState } from "react";
import { OverLay } from "./modal.overlay";
import { ModalWrap } from "./modal.wrap";
import VehicleForm from "../form/vehicle.form";
import styled from "styled-components";

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
`;

export default function Modal({
  hidden,
  unBlur,
  updateVehicle,
}: {
  hidden: boolean;
  unBlur: any;
  updateVehicle: any;
}) {
  return (
    <OverLay hidden={hidden}>
      <ModalWrap>
        <CloseButton onClick={unBlur}>&times;</CloseButton>
        <VehicleForm unBlur={unBlur} updateVehicle={updateVehicle} />
      </ModalWrap>
    </OverLay>
  );
}
