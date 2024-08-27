import jwt from 'jsonwebtoken'
const getMe = (request) => {
    const token = request.cookies.get('token')?.value || '';
    //@ts-ignore
    const decodedToken = jwt.decode(token, 'PIKACHU');
    return  decodedToken.user
} 


export default getMe