

export const adminMiddleware = (req, res, next) => {

   if(req.session?.user && req.session.user.role === 'admin'){
      next();
   } else{
      res.status(403).json({
         err: 'Non autorisé',
         message: 'Vous devez être connecté pour accéder à cette page'
      });
   }
}