

export const securityMiddleware = (req, res, next) => {

   if(!req.session?.user){
      res.status(403).json({err: 'Non autorisé', message: 'Vous devez être connecté pour accéder à cette page'});
   }
   else{
      next();
   }
}