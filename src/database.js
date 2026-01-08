import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

// Validate Supabase configuration
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('❌ Supabase configuration is missing. Please check your .env file.');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

console.log('✅ Supabase client initialized');

/**
 * Log a command execution to the database
 * @param {string} commandName - Name of the command
 * @param {string} userId - Discord user ID
 * @param {string} guildId - Discord guild/server ID (optional)
 * @returns {Promise<Object>} - Result of the database operation
 */
export async function logCommand(commandName, userId, guildId = null) {
  try {
    const { data, error } = await supabase
      .from('bot_commands')
      .insert([
        {
          command_name: commandName,
          user_id: userId,
          guild_id: guildId,
          executed_at: new Date().toISOString(),
        },
      ])
      .select();
    
    if (error) {
      console.error('Database error:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Failed to log command:', error);
    return { success: false, error };
  }
}

/**
 * Get command execution statistics
 * @param {number} limit - Number of results to return
 * @returns {Promise<Object>} - Command statistics
 */
export async function getCommandStats(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('bot_commands')
      .select('command_name, user_id, executed_at')
      .order('executed_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Database error:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Failed to get command stats:', error);
    return { success: false, error };
  }
}

/**
 * Get total command count by command name
 * @returns {Promise<Object>} - Command counts grouped by command name
 */
export async function getCommandCounts() {
  try {
    const { data, error } = await supabase
      .rpc('get_command_counts');
    
    if (error) {
      console.error('Database error:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Failed to get command counts:', error);
    return { success: false, error };
  }
}

/**
 * Get user command history
 * @param {string} userId - Discord user ID
 * @param {number} limit - Number of results to return
 * @returns {Promise<Object>} - User's command history
 */
export async function getUserCommandHistory(userId, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('bot_commands')
      .select('*')
      .eq('user_id', userId)
      .order('executed_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Database error:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Failed to get user command history:', error);
    return { success: false, error };
  }
}

/**
 * Health check for database connection
 * @returns {Promise<boolean>} - True if database is accessible
 */
export async function isDatabaseHealthy() {
  try {
    const { error } = await supabase
      .from('bot_commands')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Database health check failed:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Database health check error:', error);
    return false;
  }
}

// Export the Supabase client for advanced use cases
export { supabase };

// Export default client
export default supabase;
