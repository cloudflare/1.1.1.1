declare module 'cowsay' {
  interface SayConfig {
    text: string
  }
  export function say (input: SayConfig): void
}
