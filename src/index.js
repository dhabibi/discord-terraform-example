import { Client, GatewayIntentBits, Collection, Events, ActivityType } from 'discord.js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync } from 'fs';
import { logCommand } from './database.js';

// Load environment variables
config();

// Validate required environment variables
const requiredEnvVars = ['DISCORD_TOKEN', 'DISCORD_CLIENT_ID', 'SUPABASE_URL', 'SUPABASE_ANON_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\nPlease check your .env file and ensure all required variables are set.');
  process.exit(1);
}

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Discord client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Collection to store commands
client.commands = new Collection();

// Load commands dynamically
async function loadCommands() {
  const commandsPath = join(__dirname, 'commands');
  
  try {
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    console.log(`📂 Loading ${commandFiles.length} command(s)...`);
    
    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const commandModule = await import(`file://${filePath}`);
      
      if ('data' in commandModule && 'execute' in commandModule) {
        client.commands.set(commandModule.data.name, commandModule);
        console.log(`   ✅ Loaded command: ${commandModule.data.name}`);
      } else {
        console.warn(`   ⚠️  Skipped ${file}: Missing 'data' or 'execute' export`);
      }
    }
  } catch (error) {
    console.error('❌ Error loading commands:', error);
  }
}

// Event: Bot is ready
client.once(Events.ClientReady, (readyClient) => {
  console.log('\n🤖 Discord Bot Started!');
  console.log(`   Logged in as: ${readyClient.user.tag}`);
  console.log(`   Bot ID: ${readyClient.user.id}`);
  console.log(`   Servers: ${readyClient.guilds.cache.size}`);
  console.log(`   Users: ${readyClient.users.cache.size}`);
  console.log(`   Commands: ${client.commands.size}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('\n✨ Bot is online and ready!\n');
  
  // Set bot activity/status
  const activityText = process.env.BOT_ACTIVITY || 'Powered by Terraform';
  readyClient.user.setActivity(activityText, { type: ActivityType.Playing });
});

// Event: Interaction created (slash commands)
client.on(Events.InteractionCreate, async (interaction) => {
  // Only handle slash commands
  if (!interaction.isChatInputCommand()) return;
  
  const command = client.commands.get(interaction.commandName);
  
  if (!command) {
    console.warn(`⚠️  No command matching ${interaction.commandName} was found.`);
    return;
  }
  
  try {
    console.log(`🔹 Executing command: ${interaction.commandName} by ${interaction.user.tag}`);
    
    // Execute the command
    await command.execute(interaction);
    
    // Log command to database (non-blocking)
    logCommand(
      interaction.commandName,
      interaction.user.id,
      interaction.guildId
    ).catch(error => {
      console.error('Failed to log command to database:', error);
    });
    
  } catch (error) {
    console.error(`❌ Error executing command ${interaction.commandName}:`, error);
    
    // Prepare error message
    const errorMessage = {
      content: '❌ There was an error executing this command!',
      ephemeral: true,
    };
    
    // Send error response
    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    } catch (followUpError) {
      console.error('Failed to send error message:', followUpError);
    }
  }
});

// Event: Error handling
client.on(Events.Error, (error) => {
  console.error('❌ Discord client error:', error);
});

// Event: Warning
client.on(Events.Warn, (warning) => {
  console.warn('⚠️  Discord client warning:', warning);
});

// Process error handlers
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏹️  Received SIGINT, shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⏹️  Received SIGTERM, shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

// Initialize and start the bot
async function start() {
  try {
    // Load commands
    await loadCommands();
    
    // Login to Discord
    console.log('\n🔐 Logging in to Discord...');
    await client.login(process.env.DISCORD_TOKEN);
    
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

// Start the bot
start();
