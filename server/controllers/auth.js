const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const {username, password, email, profilePic} = req.body;
    const db = req.app.get('db');
    
    const results = await db.users.get_user_by_username([username]);
    const existingUser = results[0];
    
    if(existingUser){
      return res.status(409).send('Username Taken')
    };
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const registerUser = await db.users.register_user([username, hash, email, profilePic]);

    console.log(registerUser);
    
    const user = registerUser[0];
    
    req.session.user = {user_id: user.user_id, username: user.username, email: user.email, profilePic: user.profilePic};
    
    res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    const {username, password} = req.body;
    const db = req.app.get('db');
    const searchUser = await db.users.get_user_by_username([username]);
    console.log(searchUser);
    const user = searchUser[0];

    if(!user){
      return res.status(409).send('username is incorrect')
    };

    const isAuthenticated= bcrypt.compareSync(password, user.password);

    if(!isAuthenticated){
      return res.status(409).send('password is incorrect')
    }

    delete user.hash;

    req.session.user = {user_id: user.user_id, username: user.username, email: user.email, profile_pic: user.profile_pic};

    res.status(200).send(req.session.user);
  },
  logout: async (req, res) => {
    req.session.destroy();
    return res.status(200).send('Logged Out');
  },
  getMe: (req, res) => {
    if(!req.session.user){
      return res.sendStatus(404);
    };
    res.status(200).send(req.session.user);
  },
  edit: async (req, res) => {
    const {user_id} = req.session.user;
    const {username, email, profile_pic} = req.body;
    const db = req.app.get('db');
    
    const results = await db.users.update_user_info([username, profile_pic, email, user_id])

    return res.status(200).send(results)
  }
}