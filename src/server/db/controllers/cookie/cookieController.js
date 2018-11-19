module.exports = {

  /* ============================================ User ============================================ */

  deleteSSIDCookie: (req, res, next) => {
    console.log('============================================');
    console.log('You are in cookieController deleteSSIDCookie');
    console.log('*** req.cookies ***', req.cookies);

    // Clear Cookie - Removes Authorization for User
    res.clearCookie('ssid');
    next();
  },

  setSSIDCookie: (req, res, next) => {
    console.log('=========================================');
    console.log('You are in cookieController setSSIDCookie');
    console.log('*** res.locals ***', res.locals);

    // Cookie accessible via HTTP only
    res.cookie('ssid', res.locals.ssid, { httpOnly: true });
    next();
  },

  /* ============================================ Admin ============================================ */

  deleteAdminCookie: (req, res, next) => {
    console.log('=============================================');
    console.log('You are in cookieController deleteAdminCookie');
    console.log('*** req.cookies ***', req.cookies);

    // Clear Cookie - Removes Authorization for Admin
    res.clearCookie('admin');
    next();
  },

  setAdminCookie: (req, res, next) => {
    console.log('==========================================');
    console.log('You are in cookieController setAdminCookie');
    console.log('*** res.locals.admin ***', res.locals.admin);

    // Cookie accessible via HTTP only
    res.cookie('admin', res.locals.admin, { httpOnly: true });
    next();
  },
};
