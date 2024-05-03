export function findClassByType (type) {
   let toastClass;
   switch (type) {
      case 'success':
         toastClass = 'toast-success'
         break;
      case 'error':
         toastClass = 'toast-error'
         break;
      case 'info':
         toastClass = 'toast-info'
         break;
      default:
         toastClass = "toast"
         break
   }
   return toastClass;
}