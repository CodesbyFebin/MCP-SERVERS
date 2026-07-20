export interface K8sManifests {
  secret: string;
  deployment: string;
  service: string;
  ingress: string;
}

export interface EnvVars {
  [key: string]: string;
}

function sanitizeServerId(id: string): string {
  return id.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

export function generateK8sManifest(
  serverId: string,
  image: string,
  envVars: EnvVars
): K8sManifests {
  const sanitizedId = sanitizeServerId(serverId);
  
  const envEntries = Object.entries(envVars)
    .map(([key, value]) => `      - name: ${key}\n        value: "${value}"`)
    .join('\n');

  const secretYaml = `apiVersion: v1
kind: Secret
metadata:
  name: ${sanitizedId}-secret
  namespace: mcp
type: Opaque
data:
${Object.entries(envVars)
    .map(([key, value]) => `  ${key}: "${Buffer.from(value).toString('base64')}"`)
    .join('\n')}
`;

  const deploymentYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${sanitizedId}
  namespace: mcp
  labels:
    app: ${sanitizedId}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${sanitizedId}
  template:
    metadata:
      labels:
        app: ${sanitizedId}
    spec:
      containers:
        - name: mcp-server
          image: ${image}
          ports:
            - containerPort: 3000
          env:
${envEntries}
          resources:
            limits:
              cpu: "500m"
              memory: "512Mi"
            requests:
              cpu: "250m"
              memory: "256Mi"
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
`;

  const serviceYaml = `apiVersion: v1
kind: Service
metadata:
  name: ${sanitizedId}-service
  namespace: mcp
spec:
  selector:
    app: ${sanitizedId}
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
`;

  const ingressYaml = `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${sanitizedId}-ingress
  namespace: mcp
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: ${sanitizedId}.mcpserver.in
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ${sanitizedId}-service
                port:
                  number: 80
`;

  return {
    secret: secretYaml,
    deployment: deploymentYaml,
    service: serviceYaml,
    ingress: ingressYaml
  };
}