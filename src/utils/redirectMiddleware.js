import token from './token';
import history from './history';

export const redirectMiddleware = store => next => (action) => {
   const refreshTokenExpiration = token.getRefreshTokenExpiration();
   const isExpired =  Date.now() > refreshTokenExpiration || !refreshTokenExpiration;

   if(isExpired && history.location.pathname !== '/signin') {
      history.push('/signin');
      return;
   }

   if(action) {
      next(action);
   }
   
   return;
};