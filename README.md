# Discord Terraform Example

A production-ready Discord bot demonstrating **Infrastructure as Code** with Terraform for fully automated infrastructure provisioning, deployment, and management.

## 🎯 What This Project Demonstrates

This project showcases **complete infrastructure automation** using Terraform. With a single command (`terraform apply`), you automatically provision:

- ✅ **Supabase Projects** - Automatically created and configured
- ✅ **PostgreSQL Databases** - Automatically provisioned with schema
- ✅ **Railway Projects** - Automatically created for deployment
- ✅ **Environment Configuration** - Automatically configured across all services
- ✅ **CI/CD Pipeline** - GitHub Actions workflow for automated deployments

**No manual clicking through web interfaces. No manual resource creation. Just code.**

## 🚀 Quick Start (Recommended: Terraform Automation)

### Prerequisites
- Terraform 1.0+
- Railway API token ([Get it here](https://railway.app/account/tokens))
- Supabase API token ([Get it here](https://supabase.com/dashboard/account/tokens))
- Discord bot token ([Create bot here](https://discord.com/developers/applications))

### One-Time Setup (5 minutes)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhabibi/discord-terraform-example.git
   cd discord-terraform-example/terraform
   ```

2. **Configure credentials** (one-time setup):
   ```bash
   # Create terraform.tfvars with your API tokens
   cat > terraform.tfvars << EOF
   railway_token = "your_railway_api_token"
   supabase_token = "your_supabase_api_token"
   discord_token = "your_discord_bot_token"
   discord_client_id = "your_discord_application_id"
   project_name = "discord-bot-production"
   EOF
   ```

3. **Deploy everything automatically:**
   ```bash
   terraform init
   terraform apply
   ```

**That's it!** Terraform automatically creates:
- Your Supabase project with PostgreSQL database
- Database tables and schema
- Your Railway project with the bot deployed
- All environment variables configured correctly
- Your Discord bot running in production

### Update or Destroy Infrastructure

```bash
# Update infrastructure (after code changes)
terraform apply

# Destroy all infrastructure
terraform destroy
```

---

## ⚡ What Terraform Eliminates

### Without Terraform (Manual Process): 😰
1. ❌ Log into Supabase dashboard
2. ❌ Click "New Project" and wait for provisioning
3. ❌ Manually copy project URL and keys
4. ❌ Open SQL editor and manually run schema creation
5. ❌ Log into Railway dashboard
6. ❌ Click "New Project" and configure settings
7. ❌ Manually add environment variables one by one
8. ❌ Connect GitHub repository manually
9. ❌ Configure build settings manually
10. ❌ Deploy and hope everything is configured correctly
11. ❌ Repeat all steps for staging/production environments
12. ❌ Document every manual step for team members

**Time: 30-45 minutes per environment** | **Error-prone** | **Not reproducible**

### With Terraform (Automated Process): 🎉
1. ✅ `terraform apply`
2. ✅ Wait 2-3 minutes
3. ✅ Done!

**Time: 3 minutes** | **Consistent** | **Reproducible** | **Version controlled**

---

## 🏗️ Infrastructure as Code Benefits

### What You Get with Terraform

- **🔄 Reproducibility**: Spin up identical environments instantly
- **📝 Version Control**: Infrastructure changes tracked in Git
- **🤝 Team Collaboration**: Everyone uses the same configuration
- **🔒 No Configuration Drift**: Infrastructure matches code exactly
- **⚡ Fast Iteration**: Test changes in isolated environments
- **📚 Self-Documenting**: Code serves as infrastructure documentation
- **🔙 Easy Rollback**: Revert to previous infrastructure states
- **🌍 Multi-Environment**: Deploy dev/staging/prod with same code

### Terraform Manages Everything

```hcl
# This code automatically creates:
# - Supabase organization and project
# - PostgreSQL database with schema
# - Railway project and service
# - All environment variables
# - Deployment configuration
```

**Before Terraform**: 12+ manual steps, 45 minutes, error-prone  
**After Terraform**: 1 command, 3 minutes, guaranteed consistency

---

## 🛠️ Setup Path Comparison

Choose your path based on your needs:

### Path 1: Automated Setup with Terraform ✨ (RECOMMENDED)

**Use this if you want:**
- Fully automated infrastructure
- Reproducible environments
- Production-ready setup
- Team collaboration

**Steps:**
1. Get API tokens (one-time)
2. Create `terraform.tfvars`
3. Run `terraform apply`
4. Everything is created automatically

**Time:** 3 minutes | **Best for:** Production, teams, multiple environments

---

### Path 2: Manual Setup 🔧 (For Learning/Testing Only)

**Use this if you want:**
- To understand each component individually
- Quick local testing without Terraform
- Learning how Discord bots work

**Note:** This path requires manually creating all infrastructure through web dashboards. See the [Manual Setup Guide](#manual-setup-alternative-path) below.

**Time:** 30-45 minutes | **Best for:** Learning, local development only

---

## 📋 Detailed Terraform Setup Guide

### 1. Install Terraform

**macOS:**
```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

**Windows:**
```bash
choco install terraform
```

**Linux:**
```bash
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

### 2. Obtain Required API Tokens

#### Railway API Token
1. Go to [Railway Account Tokens](https://railway.app/account/tokens)
2. Click "Create New Token"
3. Copy the token immediately (shown only once)

#### Supabase API Token
1. Go to [Supabase Account Tokens](https://supabase.com/dashboard/account/tokens)
2. Click "Generate New Token"
3. Give it a name (e.g., "Terraform")
4. Copy the token immediately (shown only once)

#### Discord Bot Token
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to "Bot" section and create a bot
4. Copy the bot token
5. Enable Privileged Gateway Intents:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
6. Copy your Application ID from "General Information"

### 3. Configure Terraform

Create `terraform/terraform.tfvars`:

```hcl
# API Tokens (keep these secret!)
railway_token    = "your_railway_api_token_here"
supabase_token   = "your_supabase_api_token_here"
discord_token    = "your_discord_bot_token_here"
discord_client_id = "your_discord_application_id_here"

# Project Configuration
project_name     = "discord-bot-production"
supabase_org_id  = "your_supabase_org_id"  # Optional
region          = "us-east-1"               # Optional
```

**Security Note:** Never commit `terraform.tfvars` to Git! It's already in `.gitignore`.

### 4. Initialize and Deploy

```bash
cd terraform

# Initialize Terraform (downloads providers)
terraform init

# Preview what will be created
terraform plan

# Create all infrastructure
terraform apply
```

Terraform will show you exactly what it will create. Type `yes` to confirm.

### 5. What Happens During `terraform apply`

```
Terraform will perform the following actions:

  # supabase_project.main will be created
  + resource "supabase_project" "main" {
      + name            = "discord-bot-production"
      + database_password = (sensitive value)
      + region          = "us-east-1"
    }

  # railway_project.main will be created
  + resource "railway_project" "main" {
      + name = "discord-bot-production"
    }

  # railway_service.bot will be created
  + resource "railway_service" "bot" {
      + name    = "discord-bot"
      + project = (known after apply)
    }

Plan: 8 to add, 0 to change, 0 to destroy.
```

**In 2-3 minutes**, Terraform:
1. ✅ Creates Supabase project
2. ✅ Provisions PostgreSQL database
3. ✅ Runs database schema migrations
4. ✅ Creates Railway project
5. ✅ Configures environment variables
6. ✅ Deploys your Discord bot
7. ✅ Outputs connection details

### 6. Verify Deployment

After `terraform apply` completes:

```bash
# View outputs
terraform output

# Example output:
# railway_url = "https://discord-bot-production.railway.app"
# supabase_url = "https://abcdefghijk.supabase.co"
# supabase_project_id = "abcdefghijk"
```

Your bot is now running! Invite it to your Discord server using the OAuth2 URL.

### 7. Making Changes

Modify your Terraform configuration or application code, then:

```bash
terraform apply
```

Terraform automatically detects changes and updates only what's needed.

### 8. Clean Up

Remove all infrastructure:

```bash
terraform destroy
```

Type `yes` to confirm. All resources will be deleted.

---

## 📁 Project Structure

```
discord-terraform-example/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD workflow
├── src/
│   ├── commands/
│   │   └── ping.js             # Example slash command
│   ├── database.js             # Supabase client setup
│   └── index.js                # Main bot entry point
├── terraform/
│   ├── main.tf                 # Main infrastructure (Supabase, Railway)
│   ├── database.tf             # Database schema and tables
│   ├── variables.tf            # Input variables
│   ├── outputs.tf              # Output values
│   ├── providers.tf            # Provider configurations
│   └── terraform.tfvars        # Your credentials (not in Git)
├── .env.example                # Environment template (for manual setup)
├── .gitignore                  # Git ignore rules
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

---

## 🚢 CI/CD with GitHub Actions

### Automated Deployment Pipeline

The repository includes a GitHub Actions workflow that automatically deploys to Railway on every push to `main`.

**Setup:**

1. Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):
   - `RAILWAY_TOKEN`: Your Railway API token
   - `DISCORD_TOKEN`: Your Discord bot token
   - `SUPABASE_URL`: Your Supabase project URL (from Terraform output)
   - `SUPABASE_ANON_KEY`: Your Supabase anon key (from Terraform output)

2. Push to `main` branch:
   ```bash
   git push origin main
   ```

3. GitHub Actions automatically:
   - ✅ Runs tests
   - ✅ Builds the application
   - ✅ Deploys to Railway
   - ✅ Notifies on success/failure

---

## 🤖 Bot Features

### Available Commands

- `/ping` - Check bot latency and status

### Adding New Commands

1. Create a new file in `src/commands/`:

```javascript
// src/commands/hello.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('hello')
  .setDescription('Says hello!');

export async function execute(interaction) {
  await interaction.reply('Hello!');
}
```

2. The command is automatically loaded by the bot
3. Deploy with `terraform apply` or push to trigger CI/CD

---

## 🗄️ Database Operations

The bot includes Supabase integration for persistent storage:

```javascript
import { logCommand, getCommandStats } from './database.js';

// Log command execution
await logCommand('ping', userId, guildId);

// Get command statistics
const stats = await getCommandStats();
```

**Database schema** is automatically created by Terraform in `terraform/database.tf`.

---

## 🔒 Security Best Practices

- ✅ Never commit `terraform.tfvars` to Git (already in `.gitignore`)
- ✅ Use GitHub Secrets for CI/CD credentials
- ✅ Rotate API tokens regularly
- ✅ Enable only required Discord bot intents
- ✅ Use Supabase Row Level Security (RLS) policies
- ✅ Review Terraform plans before applying
- ✅ Use separate credentials for dev/staging/production

---

## 🐛 Troubleshooting

### Terraform Issues

**Error: "Invalid Railway token"**
- Verify your Railway token in `terraform.tfvars`
- Generate a new token at [Railway Account Tokens](https://railway.app/account/tokens)

**Error: "Supabase organization not found"**
- Verify your Supabase token has correct permissions
- Check `supabase_org_id` in `terraform.tfvars`

**State lock errors:**
```bash
terraform force-unlock <lock-id>
```

### Bot Issues

**Bot doesn't respond to commands:**
- Check Railway logs: `railway logs`
- Verify environment variables in Railway dashboard
- Ensure MESSAGE CONTENT INTENT is enabled

**Database connection errors:**
- Check Supabase project is not paused
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Railway

---

## 📚 Additional Resources

- [Discord.js Documentation](https://discord.js.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Terraform Supabase Provider](https://registry.terraform.io/providers/supabase/supabase/latest/docs)
- [Terraform Railway Provider](https://registry.terraform.io/providers/terraform-community-providers/railway/latest/docs)

---

## 🎓 Learning Resources

### Understanding Infrastructure as Code

If you're new to Terraform or Infrastructure as Code:

1. **Read the Terraform code**: Start with `terraform/main.tf` to see how resources are defined
2. **Run `terraform plan`**: See what Terraform will create before applying
3. **Check `terraform/outputs.tf`**: Understand what information Terraform exposes
4. **Experiment**: Create a test environment, modify values, see what changes

### Compare Manual vs Automated

Try both paths to understand the difference:
1. Follow the [Manual Setup Guide](#manual-setup-alternative-path) once
2. Destroy everything manually
3. Use Terraform to create the same infrastructure
4. Notice the time and effort difference

---

## Manual Setup (Alternative Path)

<details>
<summary>Click to expand manual setup instructions</summary>

### ⚠️ Note: Not Recommended for Production

This path is **only recommended for learning** or quick local testing. For production use, **use Terraform** (see above).

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Discord Developer Account
- Supabase Account
- Railway Account
- Git

### 1. Clone Repository

```bash
git clone https://github.com/dhabibi/discord-terraform-example.git
cd discord-terraform-example
npm install
```

### 2. Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to "Bot" section and create a bot
4. Copy the bot token
5. Enable Privileged Gateway Intents:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
6. Go to OAuth2 → URL Generator
7. Select scopes: `bot`, `applications.commands`
8. Select permissions: `Send Messages`, `Read Messages/View Channels`
9. Copy the URL and invite the bot to your server

### 3. Supabase Manual Setup

1. Go to [Supabase](https://supabase.com)
2. Click "New Project"
3. Fill in project details and wait for provisioning (2-3 minutes)
4. Copy your project URL from Settings → API
5. Copy your anon/public key from Settings → API
6. Go to SQL Editor and run:

```sql
CREATE TABLE bot_commands (
  id SERIAL PRIMARY KEY,
  command_name VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  guild_id VARCHAR(255),
  executed_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env`:

```env
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_application_id
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=development
```

### 5. Run Locally

```bash
npm start
```

Or with auto-reload:

```bash
npm run dev
```

### 6. Railway Manual Deployment

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login and initialize:
   ```bash
   railway login
   railway init
   ```

3. Set environment variables:
   ```bash
   railway variables set DISCORD_TOKEN=your_token
   railway variables set SUPABASE_URL=your_url
   railway variables set SUPABASE_ANON_KEY=your_key
   railway variables set DISCORD_CLIENT_ID=your_client_id
   ```

4. Deploy:
   ```bash
   railway up
   ```

**Note:** You'll need to repeat all these steps for each environment (dev/staging/prod).

</details>

---

## 🤝 Contributing

Contributions are welcome! 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Test with Terraform (`terraform plan`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Daniel Habibi**

GitHub: [@dhabibi](https://github.com/dhabibi)

---

## 🙏 Acknowledgments

- Discord.js community for excellent documentation
- Supabase team for the Terraform provider
- Railway platform for seamless deployments
- Terraform community for Infrastructure as Code best practices

---

## ⭐ Why This Project Matters

This project demonstrates **real-world Infrastructure as Code practices** that you can apply to any project:

- **Eliminate manual setup** - No more clicking through dashboards
- **Reproducible environments** - Spin up identical staging/production environments
- **Version-controlled infrastructure** - Track infrastructure changes like code
- **Team collaboration** - Everyone uses the same configuration
- **Fast iteration** - Test infrastructure changes safely
- **Self-documenting** - Code is the documentation

**From 45 minutes of manual work to 3 minutes of automation.** That's the power of Infrastructure as Code.

---

## 🚀 Next Steps

1. ⭐ Star this repository if you found it helpful
2. 🍴 Fork it and customize for your own projects
3. 📖 Read the Terraform code to understand how it works
4. 🧪 Experiment with `terraform plan` and `terraform apply`
5. 🌟 Share your own Infrastructure as Code journey!

---

**Ready to automate your infrastructure?** Start with `terraform apply` and see the magic happen! ✨
