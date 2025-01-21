import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getUserById } from '../database/authDB.js';
import dotenv from 'dotenv';

dotenv.config();

const initializePassport = () => {
    const options = {
        jwtFromRequest: ExtractJwt.
        fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(
        new JwtStrategy(options, async (jwt_payload, done ) =>{
            try{
                //Verificar si el usuario existe
                const usuario = await getUserById(jwt_payload.idUsuario);

                if(usuario){
                    return done(null, usuario);
                }
                return done(null, false, {message: "Usuario no encontrado"});
            }catch(error){
                return done(error, false);
            }
        })
    );
};

export default initializePassport;