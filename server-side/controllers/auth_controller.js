import User from "../models/User.js";
import { compareSync } from "bcrypt";


export const subscribe = async (req, res) => {
      const { email, password } = req.body;

      try {
            const result = await User.findByEmail(email);

            if (result) {
                  //on ne veut pas donner d'informations sur l'existence ou non de l'utilisateur
                  res.json({ message: 'Problème interne', err: 'Problème interne' });
            } else {
                  try {
                        const result2 = await User.create(email, password);
                        const result3 = await User.findById(result2.insertId);
                        req.session.user = result3;
                        res.json({message: 'Votre compte a bien été créé'});
                  } catch (err) {
                        res.json({message: 'Une erreur est survenue lors de la création du compte.', err: err.message});
                  }
            }

      } catch(err) {
            res.json({ message: 'Une erreur est survenue.', err: err.message });
      }

}

export const login = async (req, res) => {
      const { email, password } = req.body;

      try {
            const result = await User.login(email, password)

            req.session.user = {
                  id: result.id,
                  email: result.email,
                  sold: result.sold,
                  services_rendered: result.services_rendered,
                  created_at: result.created_at
            };
            req.session.save(err => {
                  if (err) {
                        res.json({ message: 'Une erreur est survenue.', err: err.message });
                  } else {
                        res.json({ message: 'Vous êtes connecté' });
                  }
            });
      } catch (err) {
            res.json({ message: 'Mauvais identifiants', err: err.message });
      }
}

export const logout = (req, res) => {
      req.session.destroy();
      res.clearCookie('session_id');
      res.json({ message: 'Vous êtes déconnecté' });
}

export const deleteUser = async (req, res) => {
      try {
            await User.deleteUser(req.params.id)
            req.session.destroy();
            res.clearCookie('session_id');
            res.json({message: 'Votre compte a bien été supprimé'});
      } catch (err) {
            res.json({ message: 'Une erreur est survenue.', err: err.message });
      }
}

export const editUser = async (req, res) => {
      try {
            const checkUser = await User.findByIdWithPassword(req.params.id);
            if (!checkUser) {
                  //on ne veut pas donner d'informations sur l'existence ou non de l'utilisateur
                  throw new Error('Problème interne');
            }
            const confirm = compareSync(req.body.oldPassword, checkUser.password);
            if (!confirm) {
                  throw new Error('Problème interne');
            }

            await User.editUser(req.params.id, req.body.password);
            res.json({message: 'Votre compte a bien été modifié'});
      } catch (err) {
            res.json({ message: 'Une erreur est survenue.', err: err.message});
      }
}

export const api_me = (req, res) => {
      res.json(req.session.user || {});
}