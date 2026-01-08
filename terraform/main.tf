# Main Terraform configuration for Discord Bot infrastructure
# Deploys to Railway with Supabase integration

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    railway = {
      source  = "terraform-community-providers/railway"
      version = "~> 0.3.0"
    }
  }
}

# Railway Project
resource "railway_project" "discord_bot" {
  name        = var.project_name
  description = "Discord bot with Supabase integration deployed via Terraform"
}

# Railway Environment (Production)
resource "railway_environment" "production" {
  project_id = railway_project.discord_bot.id
  name       = "production"
}

# Railway Service for Discord Bot
resource "railway_service" "discord_bot" {
  project_id = railway_project.discord_bot.id
  name       = "discord-bot"
  
  # Source configuration - GitHub repository
  source {
    repo = var.github_repo
    branch = var.github_branch
  }
}

# Railway Deployment
resource "railway_deployment" "discord_bot_production" {
  service_id     = railway_service.discord_bot.id
  environment_id = railway_environment.production.id
}

# Environment Variables for Discord Bot
resource "railway_variable" "discord_token" {
  project_id     = railway_project.discord_bot.id
  environment_id = railway_environment.production.id
  service_id     = railway_service.discord_bot.id
  name           = "DISCORD_TOKEN"
  value          = var.discord_token
}

resource "railway_variable" "discord_client_id" {
  project_id     = railway_project.discord_bot.id
  environment_id = railway_environment.production.id
  service_id     = railway_service.discord_bot.id
  name           = "DISCORD_CLIENT_ID"
  value          = var.discord_client_id
}

resource "railway_variable" "supabase_url" {
  project_id     = railway_project.discord_bot.id
  environment_id = railway_environment.production.id
  service_id     = railway_service.discord_bot.id
  name           = "SUPABASE_URL"
  value          = var.supabase_url
}

resource "railway_variable" "supabase_key" {
  project_id     = railway_project.discord_bot.id
  environment_id = railway_environment.production.id
  service_id     = railway_service.discord_bot.id
  name           = "SUPABASE_ANON_KEY"
  value          = var.supabase_key
}

resource "railway_variable" "node_env" {
  project_id     = railway_project.discord_bot.id
  environment_id = railway_environment.production.id
  service_id     = railway_service.discord_bot.id
  name           = "NODE_ENV"
  value          = "production"
}

# Optional: Custom domain for Railway service
# Uncomment and configure if you have a custom domain
# resource "railway_custom_domain" "discord_bot" {
#   service_id = railway_service.discord_bot.id
#   domain     = var.custom_domain
# }
