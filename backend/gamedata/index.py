import json
import os
import jwt
import psycopg2
from datetime import datetime
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field, ValidationError

class GameStatsModel(BaseModel):
    level: int = Field(..., ge=1, le=1000)
    power: int = Field(..., ge=0)
    coins: int = Field(..., ge=0)
    experience: int = Field(..., ge=0)
    max_experience: int = Field(..., ge=1)
    click_damage: int = Field(..., ge=1)

class SaveGameRequest(BaseModel):
    game_stats: GameStatsModel

def verify_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify JWT token and return payload"""
    try:
        secret = os.environ.get('JWT_SECRET', 'default_secret_key')
        payload = jwt.decode(token, secret, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def get_user_id_from_headers(headers: Dict[str, str]) -> Optional[int]:
    """Extract user ID from Authorization header"""
    auth_header = headers.get('X-Auth-Token') or headers.get('x-auth-token')
    if not auth_header:
        return None
    
    payload = verify_jwt_token(auth_header)
    if not payload:
        return None
    
    return payload.get('user_id')

def get_db_connection():
    """Get database connection"""
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Handle game progress save/load operations for authenticated users
    Args: event - dict with httpMethod, headers, body
          context - object with attributes: request_id, function_name, function_version
    Returns: HTTP response dict with game data or success confirmation
    '''
    method: str = event.get('httpMethod', 'GET')
    headers: Dict[str, str] = event.get('headers', {})
    
    # Handle CORS OPTIONS request
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Authorization',
        'Access-Control-Max-Age': '86400'
    }
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'isBase64Encoded': False,
            'body': ''
        }
    
    # Get user ID from token
    user_id = get_user_id_from_headers(headers)
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Необходима авторизация'})
        }
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # GET - Load game progress
        if method == 'GET':
            cursor.execute("""
                SELECT level, power, coins, experience, max_experience, click_damage, updated_at
                FROM game_stats 
                WHERE user_id = %s
            """, (user_id,))
            
            result = cursor.fetchone()
            if result:
                level, power, coins, experience, max_experience, click_damage, updated_at = result
                game_stats = {
                    'level': level,
                    'power': power,
                    'coins': coins,
                    'experience': experience,
                    'maxExperience': max_experience,
                    'clickDamage': click_damage,
                    'lastSaved': updated_at.isoformat() if updated_at else None
                }
            else:
                # Return default stats if no saved data
                game_stats = {
                    'level': 1,
                    'power': 100,
                    'coins': 0,
                    'experience': 0,
                    'maxExperience': 100,
                    'clickDamage': 10,
                    'lastSaved': None
                }
            
            return {
                'statusCode': 200,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'gameStats': game_stats
                })
            }
        
        # POST/PUT - Save game progress
        elif method in ['POST', 'PUT']:
            body_data = json.loads(event.get('body', '{}'))
            save_request = SaveGameRequest(**body_data)
            
            # Update or insert game stats
            cursor.execute("""
                INSERT INTO game_stats (user_id, level, power, coins, experience, max_experience, click_damage, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
                ON CONFLICT (user_id) 
                DO UPDATE SET 
                    level = EXCLUDED.level,
                    power = EXCLUDED.power,
                    coins = EXCLUDED.coins,
                    experience = EXCLUDED.experience,
                    max_experience = EXCLUDED.max_experience,
                    click_damage = EXCLUDED.click_damage,
                    updated_at = CURRENT_TIMESTAMP
            """, (
                user_id,
                save_request.game_stats.level,
                save_request.game_stats.power,
                save_request.game_stats.coins,
                save_request.game_stats.experience,
                save_request.game_stats.max_experience,
                save_request.game_stats.click_damage
            ))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'message': 'Прогресс сохранен',
                    'savedAt': datetime.now().isoformat()
                })
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Метод не поддерживается'})
            }
            
    except ValidationError as e:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Ошибка валидации: {str(e)}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Внутренняя ошибка сервера: {str(e)}'})
        }
    finally:
        if 'conn' in locals():
            conn.close()