# Terraform Variables Configuration
# Define all input variables for the infrastructure

variable "railway_token" {
  description = "Railway API token for authentication"
  type        = string
  sensitive   = true
  
  validation {
    condition     = length(var.railway_token) > 0
    error_message = "Railway token must not be empty."
  }
}

variable "project_name" {
  description = "Name of the Railway project"
  type        = string
  default     = "discord-bot-terraform"
  
  validation {
    condition     = length(var.project_name) > 0 && length(var.project_name) <= 50
    error_message = "Project name must be between 1 and 50 characters."
  }
}

variable "github_repo" {
  description = "GitHub repository in format 'owner/repo'"
  type        = string
  default     = "dhabibi/discord-terraform-example"
  
  validation {
    condition     = can(regex("^[a-zA-Z0-9-]+/[a-zA-Z0-9-]+$", var.github_repo))
    error_message = "GitHub repo must be in format 'owner/repo'."
  }
}

variable "github_branch" {
  description = "GitHub branch to deploy from"
  type        = string
  default     = "main"
  
  validation {
    condition     = length(var.github_branch) > 0
    error_message = "GitHub branch must not be empty."
  }
}

variable "discord_token" {
  description = "Discord bot token"
  type        = string
  sensitive   = true
  
  validation {
    condition     = length(var.discord_token) > 0
    error_message = "Discord token must not be empty."
  }
}

variable "discord_client_id" {
  description = "Discord application client ID"
  type        = string
  
  validation {
    condition     = can(regex("^[0-9]+$", var.discord_client_id))
    error_message = "Discord client ID must be numeric."
  }
}

variable "supabase_url" {
  description = "Supabase project URL"
  type        = string
  
  validation {
    condition     = can(regex("^https://.*\\.supabase\\.co$", var.supabase_url))
    error_message = "Supabase URL must be a valid Supabase project URL."
  }
}

variable "supabase_key" {
  description = "Supabase anon/public API key"
  type        = string
  sensitive   = true
  
  validation {
    condition     = length(var.supabase_key) > 0
    error_message = "Supabase key must not be empty."
  }
}

variable "node_version" {
  description = "Node.js version to use"
  type        = string
  default     = "18"
  
  validation {
    condition     = contains(["16", "18", "20"], var.node_version)
    error_message = "Node version must be 16, 18, or 20."
  }
}

variable "custom_domain" {
  description = "Optional custom domain for the bot service"
  type        = string
  default     = ""
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
  
  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "Environment must be development, staging, or production."
  }
}

variable "bot_activity" {
  description = "Bot activity status message"
  type        = string
  default     = "Powered by Terraform"
}

variable "log_level" {
  description = "Logging level for the bot"
  type        = string
  default     = "info"
  
  validation {
    condition     = contains(["debug", "info", "warn", "error"], var.log_level)
    error_message = "Log level must be debug, info, warn, or error."
  }
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    Project     = "discord-bot"
    ManagedBy   = "terraform"
    Environment = "production"
  }
}
