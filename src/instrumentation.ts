import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { RuntimeNodeInstrumentation } from '@opentelemetry/instrumentation-runtime-node';

const prometheusPort = parseInt(process.env.PROMETHEUS_PORT || '9464');
const prometheusExporter = new PrometheusExporter({
  port: prometheusPort,
});

// Start the Prometheus server
prometheusExporter.startServer();

const sdk = new NodeSDK({
  metricReader: prometheusExporter,
  instrumentations: [
    new RuntimeNodeInstrumentation(),
  ],
});

// Initialize the SDK
sdk.start();

// Gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('OpenTelemetry terminated'))
    .catch((error) => console.log('Error terminating OpenTelemetry', error))
    .finally(() => process.exit(0));
});

export default sdk;

