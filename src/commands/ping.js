import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { isDatabaseHealthy } from '../database.js';

/**
 * Ping command - Check bot latency and status
 */
export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Check bot latency and status');

/**
 * Execute the ping command
 * @param {Interaction} interaction - Discord interaction object
 */
export async function execute(interaction) {
  try {
    // Defer reply to allow time for checks
    await interaction.deferReply();
    
    // Get bot latency
    const sent = await interaction.fetchReply();
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);
    
    // Check database health
    const dbHealthy = await isDatabaseHealthy();
    
    // Determine latency quality
    let latencyStatus = '🟢 Excellent';
    let latencyColor = 0x00FF00; // Green
    
    if (apiLatency > 200) {
      latencyStatus = '🟡 Good';
      latencyColor = 0xFFFF00; // Yellow
    }
    if (apiLatency > 400) {
      latencyStatus = '🟠 Fair';
      latencyColor = 0xFFA500; // Orange
    }
    if (apiLatency > 600) {
      latencyStatus = '🔴 Poor';
      latencyColor = 0xFF0000; // Red
    }
    
    // Get bot uptime
    const uptime = process.uptime();
    const uptimeHours = Math.floor(uptime / 3600);
    const uptimeMinutes = Math.floor((uptime % 3600) / 60);
    const uptimeSeconds = Math.floor(uptime % 60);
    const uptimeString = `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`;
    
    // Get memory usage
    const memoryUsage = process.memoryUsage();
    const memoryMB = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    
    // Build embed response
    const embed = new EmbedBuilder()
      .setColor(latencyColor)
      .setTitle('🏓 Pong!')
      .setDescription(`Bot is online and operational`)
      .addFields(
        {
          name: '⚡ Latency',
          value: `\`\`\`${latency}ms\`\`\``,
          inline: true,
        },
        {
          name: '🌐 API Latency',
          value: `\`\`\`${apiLatency}ms\`\`\``,
          inline: true,
        },
        {
          name: '📊 Status',
          value: latencyStatus,
          inline: true,
        },
        {
          name: '🗄️ Database',
          value: dbHealthy ? '✅ Connected' : '❌ Disconnected',
          inline: true,
        },
        {
          name: '⏱️ Uptime',
          value: `\`\`\`${uptimeString}\`\`\``,
          inline: true,
        },
        {
          name: '💾 Memory',
          value: `\`\`\`${memoryMB} MB\`\`\``,
          inline: true,
        }
      )
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();
    
    // Send embed response
    await interaction.editReply({ embeds: [embed] });
    
  } catch (error) {
    console.error('Error executing ping command:', error);
    
    // Prepare error response
    const errorMessage = {
      content: '❌ An error occurred while checking bot status.',
      ephemeral: true,
    };
    
    // Send error response
    if (interaction.deferred) {
      await interaction.editReply(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
}
