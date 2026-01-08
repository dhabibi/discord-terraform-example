# Terraform Outputs
# Export important values after deployment

output "project_id" {
  description = "Railway project ID"
  value       = railway_project.discord_bot.id
}

output "project_name" {
  description = "Railway project name"
  value       = railway_project.discord_bot.name
}

output "service_id" {
  description = "Railway service ID for the Discord bot"
  value       = railway_service.discord_bot.id
}

output "service_name" {
  description = "Railway service name"
  value       = railway_service.discord_bot.name
}

output "environment_id" {
  description = "Railway environment ID"
  value       = railway_environment.production.id
}

output "environment_name" {
  description = "Railway environment name"
  value       = railway_environment.production.name
}

output "deployment_id" {
  description = "Railway deployment ID"
  value       = railway_deployment.discord_bot_production.id
}

output "github_repo" {
  description = "GitHub repository being deployed"
  value       = var.github_repo
}

output "github_branch" {
  description = "GitHub branch being deployed"
  value       = var.github_branch
}

output "supabase_url" {
  description = "Supabase project URL"
  value       = var.supabase_url
  sensitive   = false
}

output "node_version" {
  description = "Node.js version"
  value       = var.node_version
}

output "deployment_summary" {
  description = "Summary of the deployment"
  value = {
    project_name    = railway_project.discord_bot.name
    service_name    = railway_service.discord_bot.name
    environment     = railway_environment.production.name
    github_repo     = var.github_repo
    github_branch   = var.github_branch
    node_version    = var.node_version
  }
}

# Note: Sensitive values like tokens and keys are not exposed in outputs
# Access them through Railway dashboard or environment variables
