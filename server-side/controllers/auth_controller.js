import User from "../models/User.js";


export const subscribe = async (req, res) => {
      const { email, password } = req.body;

      try {
            const result = await User.findByEmail(email);

            if (result[0].length > 0) {
                  res.json({ message: 'Ce nom d\'utilisateur est déjà pris' });
            } else {
                  try {
                        const result2 = await User.create(email, password);
                        req.session.isLogged = true;

                        const result3 = await User.findById(result2.insertId);
                        console.log(result3);
                        req.session.user = result3[0][0];
                        res.json({message: 'Votre compte a bien été créé'});
                  } catch (err) {
                        res.json({message: 'Une erreur est survenue lors de la création du compte.', err});
                  }
            }

      } catch(err) {
            res.json({ message: 'Une erreur est survenue.', err });
      }

}

export const login = async (req, res) => {
      const { email, password } = req.body;

      try {
            const result = await User.login(email, password)
            req.session.isLogged = true;
            req.session.user = {
                  id: result.id,
                  email: result.email,
                  sold: result.sold,
                  services_rendered: result.services_rendered,
                  created_at: result.created_at
            };
            res.json({ message: 'Vous êtes connecté' });
      } catch (err) {
            res.json({ message: 'Mauvais identifiants', err });
      }
}

export const logout = (req, res) => {
      req.session.destroy();
      res.clearCookie('connect.sid');
      res.json({ message: 'Vous êtes déconnecté' });
}

export const api_me = (req, res) => {
      res.json(req.session.user || {});
}