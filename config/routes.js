module.exports = app => {
    app.get("/", (req, res) => {
        res.json({message: 'Bem vindo ao WeCare APP'});
    });

    app.post("/signup", app.api.usuarios.save);
    app.post("/sigin", app.api.auth.signin);

    // app.get("/visitantes", app.config.passport.authenticate(), app.api.visitantes.getVisitantes);
    app.get("/visitantes", app.api.visitantes.getVisitantes);
    app.post("/visitantes", app.api.visitantes.save);
}