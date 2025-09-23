import json
import os
import hashlib
import jwt
import psycopg2
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field, ValidationError

class RegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: str = Field(..., pattern=r'^[^@]+@[^@]+\.[^@]+$')
    password: str = Field(..., min_length=6)

class LoginRequest(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=6)

def hash_password(password: str) -> str:
    """Hash password with salt"""
    salt = os.urandom(32)
    pwd_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return salt.hex() + pwd_hash.hex()

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    salt = bytes.fromhex(hashed[:64])
    pwd_hash = bytes.fromhex(hashed[64:])
    return hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000) == pwd_hash

def create_jwt_token(user_id: int, username: str) -> str:
    """Create JWT token for user"""
    secret = os.environ.get('JWT_SECRET', 'default_secret_key')
    payload = {
        'user_id': user_id,
        'username': username,
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, secret, algorithm='HS256')

def get_db_connection():
    """Get database connection"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise Exception("DATABASE_URL not found in environment")
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Handle user authentication (register/login) for Cat Kombat game
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name, function_version
    Returns: HTTP response dict with JWT token or error
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
        'Access-Control-Max-Age': '86400'
    }
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    conn = None
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Registration
        if body_data.get('action') == 'register':
            req = RegisterRequest(**body_data)
            
            # Check if user exists
            cursor.execute("SELECT id FROM users WHERE username = %s OR email = %s", (req.username, req.email))
            if cursor.fetchone():
                return {
                    'statusCode': 400,
                    'headers': {**cors_headers, 'Content-Type': 'application/json'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Пользователь уже существует'})
                }
            
            # Create user
            password_hash = hash_password(req.password)
            cursor.execute("""
                INSERT INTO users (username, email, password_hash) 
                VALUES (%s, %s, %s) RETURNING id
            """, (req.username, req.email, password_hash))
            
            user_id = cursor.fetchone()[0]
            
            # Create initial game stats
            cursor.execute("""
                INSERT INTO game_stats (user_id, level, power, coins, experience, max_experience, click_damage)
                VALUES (%s, 1, 100, 0, 0, 100, 10)
            """, (user_id,))
            
            conn.commit()
            
            # Create JWT token
            token = create_jwt_token(user_id, req.username)
            
            return {
                'statusCode': 200,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'token': token,
                    'user': {
                        'id': user_id,
                        'username': req.username,
                        'email': req.email
                    }
                })
            }
        
        # Login
        else:
            req = LoginRequest(**body_data)
            
            # Get user
            cursor.execute("""
                SELECT id, username, email, password_hash, is_active 
                FROM users WHERE username = %s
            """, (req.username,))
            
            user = cursor.fetchone()
            if not user or not user[4]:  # is_active check
                return {
                    'statusCode': 401,
                    'headers': {**cors_headers, 'Content-Type': 'application/json'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Неверные учетные данные'})
                }
            
            user_id, username, email, password_hash, is_active = user
            
            # Verify password
            if not verify_password(req.password, password_hash):
                return {
                    'statusCode': 401,
                    'headers': {**cors_headers, 'Content-Type': 'application/json'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Неверные учетные данные'})
                }
            
            # Update last login
            cursor.execute("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = %s", (user_id,))
            conn.commit()
            
            # Create JWT token
            token = create_jwt_token(user_id, username)
            
            return {
                'statusCode': 200,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'token': token,
                    'user': {
                        'id': user_id,
                        'username': username,
                        'email': email
                    }
                })
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
        if conn:
            conn.close()