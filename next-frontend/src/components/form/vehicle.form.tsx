import { VehicleApi } from "@/api/vehicle.api";
import { Vehicle } from "@/dto/vehicle.dto";
import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  font-weight: bold;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function VehicleForm({
  unBlur,
  updateVehicle,
}: {
  unBlur: any;
  updateVehicle: any;
}) {
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    vehicleModel: "",
    vehicleType: "",
    licensePlate: "",
    nextMaintainanceDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.vehicleModel &&
      formData.licensePlate &&
      formData.nextMaintainanceDate &&
      formData.vehicleType
    ) {
      const vehicle = await VehicleApi.addVehicle("21312", formData);
      if (vehicle) {
        updateVehicle(vehicle);
      }
      setFormData({
        vehicleModel: "",
        vehicleType: "",
        licensePlate: "",
        nextMaintainanceDate: "",
      });
      unBlur();
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="vehicleModel">Vehicle Model:</Label>
          <Input
            type="text"
            id="vehicleModel"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="vehicleType">Vehicle Type:</Label>
          <Input
            type="text"
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="licensePlate">License Plate:</Label>
          <Input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nextMaintainanceDate">Next Maintenance Date:</Label>
          <Input
            type="datetime-local"
            id="nextMaintainanceDate"
            name="nextMaintainanceDate"
            value={formData.nextMaintainanceDate}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
  );
}
