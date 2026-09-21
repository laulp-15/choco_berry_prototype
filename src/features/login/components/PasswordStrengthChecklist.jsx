
// src/features/login/components/PasswordStrengthChecklist.jsx

import React from "react";

import { getPasswordChecks } from "../utils/validators";

import "./PasswordStrengthChecklist.css";

const RULES = [
  {
    key: "minLength",
    label: "Mínimo 8 caracteres",
  },
  {
    key: "hasUpper",
    label: "Una letra mayúscula",
  },
  {
    key: "hasNumber",
    label: "Un número",
  },
  {
    key: "hasSpecial",
    label: "Un carácter especial",
  },
];

/**
 * Checklist visual de los requisitos de la contraseña.
 *
 * Muestra en tiempo real qué reglas ya cumple la contraseña
 * y cuáles todavía faltan.
 */
export default function PasswordStrengthChecklist({
  password = "",
}) {
  const checks = getPasswordChecks(password);

  const passedRules = RULES.filter(
    (rule) => checks[rule.key]
  ).length;

  const allRulesPassed = passedRules === RULES.length;

  return (
    <section
      className={`password-checklist ${
        allRulesPassed ? "is-complete" : ""
      }`}
      aria-label="Requisitos de la contraseña"
    >
      <div className="password-checklist-header">
        <div className="password-checklist-heading">
          <i
            className="fa-solid fa-shield-halved"
            aria-hidden="true"
          />

          <span>Tu contraseña debe tener:</span>
        </div>

        <span
          className="password-checklist-count"
          aria-label={`${passedRules} de ${RULES.length} requisitos cumplidos`}
        >
          {passedRules}/{RULES.length}
        </span>
      </div>

      <ul
        className="password-checklist-list"
        aria-live="polite"
      >
        {RULES.map((rule) => {
          const passed = Boolean(checks[rule.key]);

          return (
            <li
              key={rule.key}
              className={`password-checklist-item ${
                passed ? "is-valid" : ""
              }`}
            >
              <span
                className="password-checklist-icon"
                aria-hidden="true"
              >
                <i
                  className={`fa-solid ${
                    passed
                      ? "fa-circle-check"
                      : "fa-circle"
                  }`}
                />
              </span>

              <span className="password-checklist-label">
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

