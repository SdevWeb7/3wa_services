
SERVER-SIDE

APP_SECRET=3wa_services

SECRET_SESSION=svVnaKqJkY4A$wY7hKx9JQFhsL12Prqwemnpt1H5bXPZ#coasiS60z6$VejKdDYQ3A7

PORT_BACKEND=9000
URL_SERVER_FRONT=http://stevendurand.ide.3wa.io:9500

DB_HOST=db.3wa.io
DB_NAME=stevendurand_3wa_cs
DB_USER=stevendurand
DB_PASSWORD="1d15ab9eb54dd6c3696ee900550e33d1"


NODE_ENV=production






CLIENT-SIDE

VITE_BASE_URL_BACKEND=http://stevendurand.ide.3wa.io:9000


export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 9500, 
        proxy: {
            '/api': { 
            target: process.env.VITE_BASE_URL_BACKEND,
            }
        }
    }
})