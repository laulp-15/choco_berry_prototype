// src/routes/ProfileRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileLayout from '../features/profile/layout/ProfileLayout';
import ProfileWelcome from '../features/profile/pages/ProfileWelcome';
import PersonalInfo from '../features/profile/components/PersonalInfo';
import UserOrders from '../features/profile/components/UserOrders';

export default function ProfileRoutes() {
  return (
    <Routes>
      <Route element={<ProfileLayout />}>
        <Route index element={<ProfileWelcome />} />
        <Route path="informacion-personal" element={<PersonalInfo />} />
        <Route path="pedidos" element={<UserOrders />} />
      </Route>
    </Routes>
  );
}