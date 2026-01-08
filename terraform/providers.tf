# Terraform Providers Configuration
# Configure Railway and other cloud providers

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    railway = {
      source  = "terraform-community-providers/railway"
      version = "~> 0.3.0"
    }
  }
  
  # Optional: Configure remote state backend
  # Uncomment and configure for team collaboration
  # backend "s3" {
  #   bucket         = "your-terraform-state-bucket"
  #   key            = "discord-bot/terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "terraform-state-lock"
  # }
}

# Railway Provider
provider "railway" {
  token = var.railway_token
}

# Provider configuration notes:
# 1. Railway provider requires an API token
# 2. Get your token from: https://railway.app/account/tokens
# 3. Store token securely in terraform.tfvars or environment variable
# 4. Never commit tokens to version control

# Additional providers can be added here:
# - AWS for additional infrastructure
# - Cloudflare for DNS management
# - Datadog for monitoring
