import parseurl from "parseurl";

export const securityMiddleware = (req, res, next) => {
   let pathname = parseurl(req).pathname;

   let protectedPath = ['/admin'];

   if(!req.session?.user && protectedPath.indexOf(pathname) !== -1 ){
      res.redirect('/');
   }
   else{
      next();
   }
}