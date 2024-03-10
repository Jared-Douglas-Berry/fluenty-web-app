
import { decode } from 'jsonwebtoken';

// Debug function to decrypt and decode JWT token
export function debugJWTToken(token) {
    const decodedToken = decode(token);
    console.log(decodedToken);
}