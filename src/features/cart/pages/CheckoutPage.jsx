// src/features/cart/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useCart } from "../hooks/useCart";
import ShippingForm from "../components/ShippingForm";
import PaymentSection from "../components/PaymentSection";
import OrderSummary from "../components/OrderSummary";
import { getShippingCost } from "../data/Shipping";
import "./CheckoutPage.css";

const INITIAL_FORM = {
  fullName: "",
  address: "",
  municipio: "",
  instructions: "",
  paymentMethod: "",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, cardMessage, clearCart } = useCart();

  const [form, setForm] = useState(INITIAL_FORM);
  const [proofFile, setProofFile] = useState(null);
  const [errors, setErrors] = useState({});

  const shippingCost = getShippingCost(form.municipio);

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "El nombre completo es obligatorio.";
    if (!form.paymentMethod) newErrors.paymentMethod = "Selecciona un medio de pago.";
    if (!proofFile) newErrors.proofFile = "Debes adjuntar el comprobante de pago.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // TODO: enviar `form` + `cardMessage` + `proofFile` + `items` al backend (crear pedido)
    console.log("Pedido:", { ...form, cardMessage, proofFile, items, shippingCost });

    clearCart();
    navigate("/productos"); // TODO: navegar a una página de confirmación real
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container checkout-wrap">
          <p>Tu carrito está vacío.</p>
          <button type="button" className="checkout-empty-link" onClick={() => navigate("/productos")}>
            Ver catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-wrap">
        <div className="checkout-header">
          <IconButton className="checkout-back" disableRipple onClick={() => navigate("/carrito")}>
            <i className="fa-solid fa-arrow-left-long" />
          </IconButton>
          <h1 className="checkout-title">Finalizar Pedido</h1>
        </div>

        <div className="row">
          <div className="col-12 col-lg-7">
            <ShippingForm
              values={form}
              onChange={handleFieldChange}
              fullNameError={errors.fullName}
            />
            <PaymentSection
              paymentMethod={form.paymentMethod}
              onPaymentMethodChange={(value) => handleFieldChange("paymentMethod", value)}
              proofFile={proofFile}
              onProofFileChange={setProofFile}
              paymentMethodError={errors.paymentMethod}
              proofFileError={errors.proofFile}
            />
          </div>
          <div className="col-12 col-lg-5">
            <OrderSummary items={items} shippingCost={shippingCost} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}