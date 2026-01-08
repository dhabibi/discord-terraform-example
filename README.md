# Discord Terraform Example

A production-ready Discord bot with Terraform infrastructure setup for Supabase database and Railway deployment.

## 🚀 Features

- **Discord Bot**: Built with discord.js v14 with slash command support
- **Database Integration**: Supabase PostgreSQL database with client SDK
- **Infrastructure as Code**: Terraform configuration for automated infrastructure provisioning
- **CI/CD Pipeline**: GitHub Actions workflow for automated deployment to Railway
- **Type Safety**: ESM modules with proper error handling
- **Environment Management**: Secure configuration with environment variables

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Discord Developer Account
- Supabase Account
- Railway Account
- Terraform 1.0+ (for infrastructure provisioning)
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dhabibi/discord-terraform-example.git
cd discord-terraform-example
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to the "Bot" section and create a bot
4. Copy the bot token
5. Enable the following Privileged Gateway Intents:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
6. Navigate to OAuth2 → URL Generator
7. Select scopes: `bot`, `applications.commands`
8. Select bot permissions: `Send Messages`, `Read Messages/View Channels`
9. Copy the generated URL and invite the bot to your server

### 4. Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Copy your project URL and anon/public key from Settings → API
4. (Optional) Run the following SQL to create a sample table:

```sql
CREATE TABLE bot_commands (
  id SERIAL PRIMARY KEY,
  command_name VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  guild_id VARCHAR(255),
  executed_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Environment Configuration

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Fill in your credentials in `.env`:

```env
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_application_id
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=development
```

### 6. Run Locally

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## 🏗️ Infrastructure Deployment with Terraform

### Prerequisites

- Terraform installed locally
- Railway API token
- Supabase API token (if automating Supabase setup)

### Deploy Infrastructure

1. Navigate to the terraform directory:

```bash
cd terraform
```

2. Initialize Terraform:

```bash
terraform init
```

3. Create a `terraform.tfvars` file:

```hcl
railway_token = "your_railway_api_token"
project_name = "discord-bot-production"
discord_token = "your_discord_bot_token"
supabase_url = "https://your-project.supabase.co"
supabase_key = "your_supabase_anon_key"
```

4. Plan the deployment:

```bash
terraform plan
```

5. Apply the configuration:

```bash
terraform apply
```

### Destroy Infrastructure

```bash
terraform destroy
```

## 🚢 Railway Deployment

### Manual Deployment

1. Install Railway CLI:

```bash
npm install -g @railway/cli
```

2. Login to Railway:

```bash
railway login
```

3. Initialize project:

```bash
railway init
```

4. Add environment variables:

```bash
railway variables set DISCORD_TOKEN=your_token
railway variables set SUPABASE_URL=your_url
railway variables set SUPABASE_ANON_KEY=your_key
```

5. Deploy:

```bash
railway up
```

### Automated Deployment with GitHub Actions

The repository includes a GitHub Actions workflow for automated deployment:

1. Add the following secrets to your GitHub repository:
   - `RAILWAY_TOKEN`: Your Railway API token
   - `DISCORD_TOKEN`: Your Discord bot token
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anon key

2. Push to the `main` branch to trigger automatic deployment

## 📁 Project Structure

```
discord-terraform-example/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD workflow
├── src/
│   ├── commands/
│   │   └── ping.js             # Example command
│   ├── database.js             # Supabase client setup
│   └── index.js                # Main bot entry point
├── terraform/
│   ├── main.tf                 # Main infrastructure config
│   ├── variables.tf            # Variable definitions
│   ├── outputs.tf              # Output values
│   └── providers.tf            # Provider configurations
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

## 🤖 Bot Commands

### Available Commands

- `/ping` - Check bot latency and status

### Adding New Commands

1. Create a new file in `src/commands/` directory:

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

2. The command will be automatically loaded by the bot

## 🗄️ Database Operations

Example database operations are available in `src/database.js`:

```javascript
import { logCommand, getCommandStats } from './database.js';

// Log command execution
await logCommand('ping', userId, guildId);

// Get command statistics
const stats = await getCommandStats();
```

## 🔒 Security Best Practices

- Never commit `.env` file or secrets to git
- Use environment variables for all sensitive data
- Enable Discord bot intents only as needed
- Use Supabase Row Level Security (RLS) policies
- Rotate tokens and keys regularly
- Use Railway's built-in secret management

## 🐛 Troubleshooting

### Bot doesn't respond to commands

- Ensure the bot has proper permissions in your Discord server
- Check that MESSAGE CONTENT INTENT is enabled
- Verify the bot token is correct

### Database connection errors

- Verify Supabase URL and anon key are correct
- Check Supabase project is not paused
- Ensure network connectivity

### Railway deployment fails

- Check all environment variables are set
- Verify Railway token is valid
- Review deployment logs in Railway dashboard

## 📚 Additional Resources

- [Discord.js Documentation](https://discord.js.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Railway Documentation](https://docs.railway.app/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Daniel Habibi**

## 🙏 Acknowledgments

- Discord.js community
- Supabase team
- Railway platform
- Terraform community
