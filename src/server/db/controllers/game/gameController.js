const db = require('../util/postgres');


module.exports = {
  gameList(req, res, next) {
    console.log('gameList query reached')
    db.query('SELECT game_name, background, font, game_icon FROM "game.dbo".game')
      .then((data) => {
        console.log(' gameList -> data', data);
        return res.json(data)
      })
      .catch(err => console.error(err));
  },

  gameMenu(req, res, next) {
    const { game } = req.params;
    console.log('params', game);
    db.any('SELECT game_category FROM "game.dbo".game_categories where game_name =$1', [game])
      .then((data) => {
        console.log('data', data);
        return res.send(data);
        next();
      })

      .catch(err => console.error(err));
  },
};

//   db.task(t => {
//     // execute a chain of queries against the task context, and return the result:
//     return t.one('SELECT  FROM events WHERE id = $1', 123, a => +a.count)
//         .then(count => {
//             if(count > 0) {
//                 return t.any('SELECT * FROM log WHERE event_id = $1', 123)
//                     .then(logs => {
//                         return {count, logs};
//                     })
//             }
//             return {count};
//         });
// })
//     .then(data => {
//         // success, data = either {count} or {count, logs}
//     })
//     .catch(error => {
//         // failed
//     });
