-- Add unique constraint on user_id in game_stats table for proper ON CONFLICT handling
ALTER TABLE game_stats ADD CONSTRAINT unique_user_game_stats UNIQUE (user_id);