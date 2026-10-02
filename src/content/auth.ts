// Textos e regras das telas de autenticação (/entrar, /cadastrar e /redefinir-senha).

export const AUTH_CODE_LENGTH = 6;
export const AUTH_CODE_TTL_MINUTES = 10;
export const AUTH_PASSWORD_MIN_LENGTH = 8;
export const AUTH_RESEND_SECONDS = 60;

export const authCopy = {
  signIn: {
    title: "Entrar",
    submit: "Entrar",
    pending: "Entrando…",
    forgotPassword: "Esqueci minha senha",
    switchPrompt: "Ainda não tem conta?",
    switchLink: "Criar conta",
  },
  signUp: {
    title: "Criar conta",
    submit: "Criar conta",
    codeNotice: "Vamos enviar um código para confirmar seu e-mail.",
    switchPrompt: "Já tem conta?",
    switchLink: "Entrar",
  },
  verify: {
    title: "Confira seu e-mail",
    body: (email: string) =>
      ["Enviamos um código para ", email, `. Ele vale por ${AUTH_CODE_TTL_MINUTES} minutos.`] as const,
    submit: "Confirmar e-mail",
    wrongEmail: "E-mail errado?",
    changeEmail: "Corrigir e-mail",
  },
  forgot: {
    title: "Redefina sua senha",
    submit: "Enviar código",
  },
  reset: {
    title: "Crie uma nova senha",
    body: (email: string) => ["Enviamos um código para ", email, "."] as const,
    submit: "Salvar senha e entrar",
  },
  signOut: "Sair",
  back: "Voltar",
  divider: "ou",
  google: "Continuar com Google",
  github: "Continuar com GitHub",
  fields: {
    name: "Nome",
    namePlaceholder: "Seu nome",
    email: "E-mail",
    emailPlaceholder: "seu@email.com",
    password: "Senha",
    confirmPassword: "Confirmar senha",
    newPassword: "Nova senha",
    confirmNewPassword: "Confirmar nova senha",
    passwordHint: `Use pelo menos ${AUTH_PASSWORD_MIN_LENGTH} caracteres.`,
    code: "Código",
    codeGroup: `Código de ${AUTH_CODE_LENGTH} dígitos`,
    showPassword: "Mostrar senha",
    hidePassword: "Ocultar senha",
  },
  resend: {
    notReceived: "Não chegou? Confira a pasta de spam.",
    countdown: "Reenviar código em",
    action: "Reenviar código",
    sent: (email: string) => ["Enviamos um novo código para ", email, "."] as const,
  },
  prototype: {
    unavailable: "Protótipo: a autenticação ainda não está disponível.",
    verified: "Protótipo: código aceito. Com o backend conectado, a conta seria criada e você já entraria.",
    passwordSaved: "Protótipo: senha redefinida. Com o backend conectado, você já entraria na sua conta.",
    goHome: "Ir para a página inicial",
  },
};

export const authErrors = {
  nameRequired: "Informe seu nome.",
  emailRequired: "Informe seu e-mail.",
  emailInvalid: "Use um e-mail válido.",
  passwordRequired: "Informe sua senha.",
  wrongCredentials: "E-mail ou senha incorretos.",
  passwordTooShort: `A senha precisa ter pelo menos ${AUTH_PASSWORD_MIN_LENGTH} caracteres.`,
  passwordMismatch: "As senhas não são iguais.",
};

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
