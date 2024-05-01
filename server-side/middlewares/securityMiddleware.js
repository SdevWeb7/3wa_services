import parseurl from "parseurl";

export const securityMiddleware = (req, res, next) => {
   let pathname = parseurl(req).pathname;

   let protectedPath = ['/admin', '/create', '/update', '/delete'];

   if(!req.session?.isLogged && protectedPath.indexOf(pathname) !== -1 ){
      req.flash("error", 'Vous devez être connecté pour accéder à cette page');
      res.redirect('/');
   }
   else{
      next();
   }
}