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
    forgotPassword: "Esqueceu a senha?",
    switchPrompt: "Primeira vez no Aulaflix?",
    switchLink: "Crie sua conta",
  },
  signUp: {
    title: "Criar conta",
    submit: "Criar minha conta",
    codeNotice: "Para ativar a conta, você vai receber um código no seu e-mail.",
    switchPrompt: "Já tem cadastro?",
    switchLink: "Entrar",
  },
  verify: {
    title: "Verifique seu e-mail",
    body: (email: string) =>
      ["Digite o código que mandamos para ", email, `. Ele expira em ${AUTH_CODE_TTL_MINUTES} minutos.`] as const,
    submit: "Verificar e-mail",
    wrongEmail: "Digitou o e-mail errado?",
    changeEmail: "Alterar e-mail",
  },
  forgot: {
    title: "Recuperar acesso",
    submit: "Receber código",
  },
  reset: {
    title: "Defina uma nova senha",
    body: (email: string) => ["Digite o código que mandamos para ", email, " e escolha a nova senha."] as const,
    submit: "Salvar e entrar",
  },
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
    confirmPassword: "Repita a senha",
    newPassword: "Nova senha",
    confirmNewPassword: "Repita a nova senha",
    passwordHint: `Mínimo de ${AUTH_PASSWORD_MIN_LENGTH} caracteres.`,
    code: "Código",
    codeGroup: `Código de ${AUTH_CODE_LENGTH} dígitos`,
    showPassword: "Mostrar senha",
    hidePassword: "Ocultar senha",
  },
  resend: {
    notReceived: "Não recebeu? Procure também na caixa de spam.",
    countdown: "Pedir outro código em",
    action: "Pedir outro código",
    sent: (email: string) => ["Mandamos um novo código para ", email, "."] as const,
  },
  prototype: {
    unavailable: "Protótipo: a autenticação ainda não está disponível.",
    verified: "Protótipo: código aceito. Com o backend conectado, a conta seria criada e você já entraria.",
    passwordSaved: "Protótipo: senha redefinida. Com o backend conectado, você já entraria na sua conta.",
    goHome: "Ir para a página inicial",
  },
};

export const authErrors = {
  nameRequired: "Digite seu nome.",
  emailRequired: "Digite seu e-mail.",
  emailInvalid: "Esse e-mail não parece válido.",
  passwordRequired: "Digite sua senha.",
  wrongCredentials: "E-mail ou senha não conferem.",
  passwordTooShort: `A senha precisa de no mínimo ${AUTH_PASSWORD_MIN_LENGTH} caracteres.`,
  passwordMismatch: "As senhas digitadas são diferentes.",
};

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
