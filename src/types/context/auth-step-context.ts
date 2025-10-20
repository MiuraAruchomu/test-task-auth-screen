export type TAuthStep = 'login' | '2fa';

export interface IAuthStepContext {
  step: TAuthStep;
  setStep: (step: TAuthStep) => void;
}
