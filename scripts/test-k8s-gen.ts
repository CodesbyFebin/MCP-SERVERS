import { generateK8sManifest } from '../src/lib/k8s-generator';
import fs from 'fs';
import path from 'path';

const testServerId = 'test-server-123e4567-e89b-12d3-a456-426614174000';
const testEnvVars = {
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/mcp',
  GITHUB_TOKEN: 'ghp_xxxxxxxxxxxxxxxxxxxx',
  LOG_LEVEL: 'info'
};

console.log('🧪 Generating K8s Manifests...\n');
const manifests = generateK8sManifest(testServerId, 'mcpserver/github:latest', testEnvVars);

const outputDir = path.join(__dirname, 'k8s-test-output');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

fs.writeFileSync(path.join(outputDir, 'secret.yaml'), manifests.secret);
fs.writeFileSync(path.join(outputDir, 'deployment.yaml'), manifests.deployment);
fs.writeFileSync(path.join(outputDir, 'service.yaml'), manifests.service);
fs.writeFileSync(path.join(outputDir, 'ingress.yaml'), manifests.ingress);

console.log('✅ Manifests generated successfully!');
console.log(`📁 Check the output in: ${outputDir}`);
console.log('💡 Tip: Run `kubectl apply -f scripts/k8s-test-output/ --dry-run=client` to validate syntax.');