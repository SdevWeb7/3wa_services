import path from "path";


export const home_controller = (req, res) => {
   res.render(path.join(process.cwd(), 'public', 'index.html'));
};