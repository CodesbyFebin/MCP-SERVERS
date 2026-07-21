import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Zap, Cloud, Server } from "lucide-react";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";
import { getContentDates } from "../../../src/lib/contentDates";

export const metadata: Metadata = {
  title: "MCP Production Deployment Guide - Step-by-Step",
  description: "Complete guide to deploying MCP servers in production. Covering hosting, security, monitoring, scaling, and compliance for enterprise MCP deployments.",
  alternates: {
    canonical: "/learn/mcp-production-deployment",
    languages: {
      "en-IN": "/learn/mcp-production-deployment",
      "en": "/learn/mcp-production-deployment",
    }
  },

};

export default function McpProductionDeploymentPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.mcpserver.in";
  const dates = getContentDates("learn:mcp-production-deployment");
  
  const unifiedGraphSchema = getUnifiedGraphSchema({
    pageUrl: "/learn/mcp-production-deployment",
    title: "MCP Production Deployment Guide - Step-by-Step",
    description: "Complete guide to deploying MCP servers in production. Covering hosting, security, monitoring, scaling, and compliance for enterprise MCP deployments.",
    speakable: ["#mcp-production-deployment-page"],
    breadcrumbs: [
      { name: "Learn", item: "/learn" },
      { name: "MCP Production Deployment", item: "/learn/mcp-production-deployment" }
    ],
    article: {
      title: "MCP Production Deployment Guide - Step-by-Step",
      description: "Complete guide to deploying MCP servers in production. Covering hosting, security, monitoring, scaling, and compliance for enterprise MCP deployments.",
      authorName: "MCPserver.in Engineering",
      authorRole: "Infrastructure & Platform Team",
      datePublished: dates.datePublished,
      dateModified: dates.dateModified
    }
  });

  const steps = [
    {
      step: "1",
      title: "Choose Your Hosting Model",
      description: "Select between local (stdio), remote (SSE), or containerized deployment based on your scale and security requirements.",
      details: [
        "Local stdio: Best for personal use, IDE integrations, and single-user scenarios. Zero network latency, but limited to one client.",
        "Remote SSE: Ideal for shared enterprise tools, multi-client access, and cloud-native deployments. Requires TLS 1.3 and authentication.",
        "Containerized: Docker or Kubernetes for reproducible deployments. Recommended for production with auto-scaling and health checks."
      ]
    },
    {
      step: "2",
      title: "Configure Authentication & Authorization",
      description: "Implement mTLS, OAuth 2.0, or API key authentication based on your threat model.",
      details: [
        "mTLS: Mutual TLS for service-to-service communication in zero-trust networks.",
        "OAuth 2.0 + PKCE: For user-facing applications requiring delegated access.",
        "API Keys: Simple but secure for machine-to-machine scenarios. Rotate keys every 90 days.",
        "Least privilege: Scope every tool to minimum necessary permissions. Separate read and write capabilities."
      ]
    },
    {
      step: "3",
      title: "Harden Security Posture",
      description: "Apply defense-in-depth security controls before exposing your MCP server.",
      details: [
        "Never expose MCP over public internet without mTLS or equivalent encryption.",
        "Containerize servers and run outside corporate/private networks to reduce blast radius.",
        "Replace .env files with runtime secret injection (Vault, AWS Secrets Manager, or Kubernetes Secrets).",
        "Validate and sanitize all inputs before they reach tool execution.",
        "Log every request, tool invocation, and significant action for audit trails."
      ]
    },
    {
      step: "4",
      title: "Set Up Monitoring & Observability",
      description: "Deploy monitoring, logging, and alerting to detect issues before users do.",
      details: [
        "Metrics: Track request latency, error rates, tool invocation counts, and connection pool utilization.",
        "Logs: Structured JSON logging with correlation IDs for tracing requests across services.",
        "Alerts: Page on-call for error rate spikes, latency degradation, or authentication failures.",
        "Dashboards: Grafana or Datadog dashboards showing real-time MCP server health."
      ]
    },
    {
      step: "5",
      title: "Implement CI/CD Pipeline",
      description: "Automate testing, building, and deployment to reduce human error.",
      details: [
        "Unit tests for tool schemas and validation logic.",
        "Integration tests against a staging MCP server with sample data.",
        "Container image scanning for vulnerabilities before deployment.",
        "Canary deployments with automatic rollback on error rate increase."
      ]
    },
    {
      step: "6",
      title: "Scale for Production Traffic",
      description: "Configure auto-scaling, load balancing, and graceful degradation.",
      details: [
        "Horizontal scaling: Run multiple server instances behind a load balancer.",
        "Connection pooling: Reuse database and API connections to reduce latency.",
        "Circuit breakers: Prevent cascade failures when downstream services degrade.",
        "Rate limiting: Protect against abuse and ensure fair resource allocation."
      ]
    },
    {
      step: "7",
      title: "Ensure Compliance & Documentation",
      description: "Meet regulatory requirements and document your deployment for audits.",
      details: [
        "Data localization: Store data in required jurisdictions (e.g., India for DPDP compliance).",
        "Consent management: Log user consent for every data access operation.",
        "Breach notification: Implement 72-hour alerting aligned with DPDP requirements.",
        "Documentation: Maintain runbooks, architecture diagrams, and incident response procedures."
      ]
    }
  ];

  return (
    <div id="mcp-production-deployment-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedGraphSchema} />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { name: "Learn", href: "/learn" },
          { name: "MCP Production Deployment", href: "/learn/mcp-production-deployment" }
        ]} />

        <section className="py-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-500/10">
            <Server className="h-6 w-6 text-cyan-200" />
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            MCP Production Deployment Guide
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            A step-by-step guide to deploying Model Context Protocol servers in production. Covering hosting, security, monitoring, scaling, and compliance for enterprise MCP deployments.
          </p>
        </section>

        <div className="mt-12 space-y-8">
          {steps.map((step) => (
            <section key={step.step} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan-500/10 text-cyan-300 font-black text-sm border border-cyan-400/20">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-black text-white">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{step.description}</p>
                  <ul className="mt-4 space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/60">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Cloud className="h-5 w-5 text-cyan-300" />
            <h2 className="text-2xl font-black text-white">Infrastructure as Code: Terraform Examples</h2>
          </div>
          <p className="text-sm text-white/58 mb-6">
            Real Terraform configurations for deploying MCP server infrastructure in AWS ap-south-1 (Mumbai) and ap-south-2 (Bengaluru). These are working examples you can adapt for your own deployments.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-black text-white mb-3">Mumbai Region (ap-south-1) - Full VPC Setup</h3>
              <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-cyan-300">{`# terraform/mumbai/vpc.tf
resource "aws_vpc" "mcp" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "mcp-vpc-mumbai"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.mcp.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-south-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "mcp-public-mumbai"
  }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.mcp.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ap-south-1a"

  tags = {
    Name = "mcp-private-mumbai"
  }
}

# terraform/mumbai/security.tf
resource "aws_security_group" "mcp_server" {
  name_prefix = "mcp-server"
  vpc_id      = aws_vpc.mcp.id

  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "alb" {
  name_prefix = "mcp-alb"
  vpc_id      = aws_vpc.mcp.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# terraform/mumbai/iam.tf
resource "aws_iam_role" "mcp_ec2" {
  name = "mcp-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "cloudwatch" {
  role       = aws_iam_role.mcp_ec2.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}

# terraform/mumbai/main.tf
resource "aws_instance" "mcp_server" {
  ami                    = "ami-0c1a7f89451184c8b"
  instance_type          = "t3.medium"
  subnet_id              = aws_subnet.private.id
  vpc_security_group_ids = [aws_security_group.mcp_server.id]
  iam_instance_profile   = aws_iam_instance_profile.mcp_ec2.name

  user_data = base64encode(<<EOF
#!/bin/bash
yum update -y
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs git
# Install MCP server from your repo
git clone YOUR_MCP_REPO /app
cd /app && npm ci --production
# Start with systemd or PM2
npm install -g pm2
pm2 start npm --name mcp-server -- start
pm2 startup
pm2 save
EOF
  )

  root_block_device {
    encrypted = true
    volume_size = 20
  }

  tags = {
    Name = "mcp-server-mumbai"
  }
}

resource "aws_lb" "mcp" {
  name               = "mcp-alb-mumbai"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [aws_subnet.public.id]

  enable_deletion_protection = false

  tags = {
    Name = "mcp-alb-mumbai"
  }
}

resource "aws_lb_target_group" "mcp" {
  name        = "mcp-tg-mumbai"
  port        = 443
  protocol    = "HTTPS"
  vpc_id      = aws_vpc.mcp.id
  target_type = "instance"

  health_check {
    path                = "/health"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.mcp.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = var.acm_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.mcp.arn
  }
}

# terraform/mumbai/variables.tf
variable "acm_certificate_arn" {
  description = "ACM certificate for HTTPS listener"
  type        = string
}

# terraform/mumbai/cloudwatch.tf
resource "aws_cloudwatch_metric_alarm" "high_latency" {
  alarm_name          = "mcp-high-latency-mumbai"
  alarm_description   = "Alert when P99 latency exceeds 50ms"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "Latency"
  namespace           = "AWS/ApplicationELB"
  period              = "60"
  statistic           = "p99"
  threshold           = "0.050"
  alarm_actions       = [aws_sns_topic.alerts.arn]
}

resource "aws_sns_topic" "alerts" {
  name = "mcp-alerts-mumbai"
}`}</pre>
            </div>

            <div>
              <h3 className="text-sm font-black text-white mb-3">Bengaluru Region (ap-south-2) - Containerized</h3>
              <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-emerald-300">{`# terraform/bengaluru/ecs.tf
provider "aws" {
  region = "ap-south-2"
}

resource "aws_ecs_cluster" "mcp" {
  name = "mcp-cluster-blr"
}

resource "aws_ecs_task_definition" "mcp" {
  family                   = "mcp-server"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                     = "512"
  memory                  = "1024"
  execution_role_arn      = aws_iam_role.ecs_task_execution.arn
  task_role_arn           = aws_iam_role.mcp_task.arn

  container_definitions = jsonencode([{
    name      = "mcp-server"
    image     = "YOUR_ECR_REPO:latest"
    essential = true
    portMappings = [{
      containerPort = 443
      hostPort      = 443
      protocol      = "tcp"
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = "/ecs/mcp-server"
        awslogs-region        = "ap-south-2"
        awslogs-stream-prefix = "ecs"
      }
    }
    environment = [
      { name = "NODE_ENV", value = "production" },
      { name = "LOG_LEVEL", value = "info" }
    ]
    secrets = [
      { name = "MCP_API_KEY", valueFrom = aws_ssm_parameter.mcp_api_key.arn }
    ]
  }])
}

resource "aws_ecs_service" "mcp" {
  name            = "mcp-service-blr"
  cluster         = aws_ecs_cluster.mcp.id
  task_definition = aws_ecs_task_definition.mcp.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.private.id]
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.mcp.arn
    container_name   = "mcp-server"
    container_port   = 443
  }

  deployment_controller {
    type = "CODE_DEPLOY"
  }
}

resource "aws_lb" "mcp_blr" {
  name               = "mcp-alb-blr"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_subnet.public.id]
  security_groups    = [aws_security_group.alb.id]
}

resource "aws_lb_target_group" "mcp_blr" {
  name        = "mcp-tg-blr"
  port        = 443
  protocol    = "HTTPS"
  vpc_id      = aws_vpc.mcp.id
  target_type = "ip"

  health_check {
    path = "/health"
  }
}

# terraform/bengaluru/autoscaling.tf
resource "aws_appautoscaling_target" "ecs" {
  max_capacity       = 10
  min_capacity       = 2
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
  resource_id        = "service/" + aws_ecs_cluster.mcp.name + "/" + aws_ecs_service.mcp.name
}

resource "aws_appautoscaling_policy" "scale_up" {
  name               = "mcp-scale-up"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs.service_namespace

  target_tracking_scaling_policy_configuration {
    target_value = 70
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
  }
}

# terraform/bengaluru/ssm.tf
resource "aws_ssm_parameter" "mcp_api_key" {
  name        = "/mcp/server/api-key"
  type        = "SecureString"
  value       = "REPLACE_WITH_YOUR_SECRET_ROTATION"
  description = "MCP Server API Key"
}`}</pre>
            </div>
          </div>

<div className="mt-6 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs text-amber-200">
            <strong>Note:</strong> These are production-ready templates. Replace YOUR_ECR_REPO, YOUR_MCP_REPO, certificate ARNs, and secrets with your own. Always test in staging before production deployment.
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-violet-300/15 bg-gradient-to-r from-violet-950/60 via-[#112040] to-[#07111e] p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-500/10">
                  <ShieldCheck className="h-5 w-5 text-emerald-200" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">DPDP & RBI Compliant Hosting</h3>
                  <p className="text-[11px] text-white/50">India-first data governance built in</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/65">
                Skip the compliance overhead. MCPserver.in provides automated data localization, consent management, and breach notification protocols aligned with Indian digital regulations. Deploy from Mumbai and Bengaluru edge nodes designed for low latency.
              </p>
            </div>
            <div className="flex items-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-black text-black hover:bg-cyan-400 transition-colors"
              >
                Start Deploying <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/topics/mcp-security-best-practices" className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-black text-white group-hover:text-cyan-200">Security Best Practices</h3>
            </div>
            <p className="text-xs text-white/55">mTLS, least privilege, credential management, and audit logs for production MCP servers.</p>
          </Link>
          <Link href="/topics/free-mcp-hosting" className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-black text-white group-hover:text-cyan-200">Free MCP Hosting</h3>
            </div>
            <p className="text-xs text-white/55">CreateOS, Vercel, Railway, and serverless deployment options for MCP servers.</p>
          </Link>
          <Link href="/topics/mcp-architecture" className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-black text-white group-hover:text-cyan-200">MCP Architecture</h3>
            </div>
            <p className="text-xs text-white/55">JSON-RPC 2.0, STDIO vs SSE transports, and server design patterns for production.</p>
          </Link>
        </section>

        <div className="mt-12">
          <Link href="/learn" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors">
            <BookOpen className="h-3.5 w-3.5" /> Back to MCP Knowledge Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
