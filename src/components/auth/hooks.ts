import { useEffect, useState } from "react";

/**
 * Validação de formulário no estilo da referência: o erro de um campo aparece
 * quando ele perde o foco já preenchido, ou em todos os campos depois do primeiro envio.
 */
export function useFieldValidation<T extends Record<string, string>>(values: T, errors: Partial<Record<keyof T, string>>) {
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  return {
    errorFor: (field: keyof T) => (submitted || touched[field] ? errors[field] : undefined),
    touch: (field: keyof T) => () => {
      if (values[field]) setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
    },
    /** Marca o formulário como enviado e diz se ele é válido. */
    submit: () => {
      setSubmitted(true);
      return Object.values(errors).every((error) => !error);
    },
  };
}

/** Contagem regressiva para liberar o "Reenviar código". */
export function useResendCountdown(seconds: number) {
  const [deadline, setDeadline] = useState(() => Date.now() + seconds * 1000);
  const [now, setNow] = useState(() => Date.now());
  const remaining = Math.max(0, Math.ceil((deadline - now) / 1000));

  useEffect(() => {
    if (remaining === 0) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [remaining]);

  return {
    remaining,
    label: `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`,
    restart: () => {
      const start = Date.now();
      setNow(start);
      setDeadline(start + seconds * 1000);
    },
  };
}

/** Simula a latência de uma chamada ao backend. */
export const simulateRequest = () => new Promise((resolve) => setTimeout(resolve, 600));
