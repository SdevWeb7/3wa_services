import User from "../models/User.js";
import { pool } from "../database/config.js";


export const subscribe = (req, res) => {
      const { email, password } = req.body;

      pool.execute('SELECT * FROM users WHERE username = ?', [email], (err, result) => {
            if (err) {
                  req.flash('error', 'Une erreur est survenue.');
                  res.redirect('/');
            }

            if (result[0].length > 0) {
                  req.flash('error', 'Ce nom d\'utilisateur est déjà pris');
                  res.redirect('/');
            }

            User.create(req.body.username, req.body.password).then(() => {
                  req.flash('success', 'Votre compte a bien été créé');
                  req.session.isLogged = true;
            }).then(result => {
                  pool.execute('SELECT * FROM users WHERE id = ?', [result.lastInsertId], (err, result) => {
                        if (err) throw err;

                        console.log(result[0]); // A TESTER
                        req.session.user = result[0];
                        res.redirect('/');
                  })
            })
               .catch(() => {
                  req.flash('error', 'Une erreur est survenue.');
                  res.redirect('/');
            });
      });

}

export const login = (req, res) => {
      User.login(req.body.username, req.body.password).then((result) => {
            req.session.isLogged = true;
            req.session.user = result;
            req.flash('success', 'Vous êtes connecté');
            res.redirect('/');
      }).catch(() => {
            req.flash('error', 'Mauvais identifiants');
            res.redirect('/');
      })
}

export const logout = (req, res) => {
      req.session.destroy();
      req.clearCookie('connect.sid');
      res.redirect('/');
}