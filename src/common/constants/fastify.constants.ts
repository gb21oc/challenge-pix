export namespace FastifyConstants {
  export const PORT = () => process.env.PORT;
  export const RUNNING = `Service is running in http://localhost:${PORT()}/`
}
