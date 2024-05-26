import User from "../models/User.js";
import { compareSync } from "bcrypt";


export const subscribe = async (req, res) => {
      const { email, password } = req.body;

      try {
            const newUser = await User.create(email, password);
            req.session.user = newUser;
            req.session.save(err => {
                  if (err) res.json({ message: 'Une erreur est survenue.', err: 'Une erreur est survenue.' });
            });
            res.json({message: 'Votre compte a bien été créé.', user: newUser});

      } catch(err) {
            res.json({ message: 'Une erreur est survenue.', err: 'Une erreur est survenue.' });
      }

}

export const login = async (req, res) => {
      const { email, password } = req.body;

      try {
            const user = await User.login(email, password)

            req.session.user = user;
            req.session.save(err => {
                  if (err) res.json({ message: 'Une erreur est survenue.', err: err.message });

                  else res.json({ message: 'Vous êtes connecté.', user: user});
            });
      } catch (err) {
            res.json({ message: 'Mauvais identifiants.', err: 'Mauvais identifiants.' });
      }
}


export const deleteUser = async (req, res) => {
      try {
            await User.deleteUser(req.session.user.id)
            req.session.destroy();
            res.clearCookie('session_id');
            res.json({message: 'Votre compte a bien été supprimé.'});
      } catch (err) {
            res.json({ message: 'Une erreur est survenue.', err: 'Une erreur est survenue.' });
      }
}

export const editUser = async (req, res) => {
      try {
            const checkUser = await User.findByIdWithPassword(req.session.user.id);

            if (!checkUser) throw new Error('Problème interne.');

            const confirm = compareSync(req.body.oldPassword, checkUser.password);
            if (!confirm) throw new Error('Problème interne.');

            await User.editUser(req.session.user.id, req.body.password);
            res.json({message: 'Votre compte a bien été modifié.'});
      } catch (err) {
            res.json({ message: 'Une erreur est survenue.', err: 'Une erreur est survenue.' });
      }
}

export const logout = (req, res) => {
      req.session.destroy();
      res.clearCookie('session_id');
      res.json({ message: 'Vous êtes déconnecté.' });
}

export const api_me = (req, res) => {
      res.json(req.session.user || {});
}