import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { RuntimeNodeInstrumentation } from '@opentelemetry/instrumentation-runtime-node';

// Prevent multiple initializations
if (!(global as any).__otelInitialized) {
  const prometheusPort = parseInt(process.env.PROMETHEUS_PORT || '9464');
  const prometheusExporter = new PrometheusExporter({
    port: prometheusPort,
  });

  // Start the Prometheus server only if not already started
  prometheusExporter.startServer().catch((error) => {
    // Ignore error if server is already listening (e.g., in watch mode)
    if (error.code !== 'ERR_SERVER_ALREADY_LISTEN') {
      console.error('Error starting Prometheus exporter:', error);
    }
  });

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

  (global as any).__otelInitialized = true;
}

