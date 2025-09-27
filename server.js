require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Models
const Upload = require('./models/Upload');
const User = require('./models/User');

// Connect MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if(!MONGODB_URI){
  console.error("MONGODB_URI not found in .env - please set it before running.");
  process.exit(1);
}
mongoose.connect(MONGODB_URI, { })
  .then(()=> console.log('Connected to MongoDB'))
  .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Seed admin if not exists
(async function seedAdmin(){
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASS;
  if(!adminEmail || !adminPass){
    console.warn("ADMIN_EMAIL or ADMIN_PASS not set in .env - create admin manually later.");
    return;
  }
  const existing = await User.findOne({ email: adminEmail });
  if(!existing){
    await User.create({ email: adminEmail, password: adminPass, role: 'admin' });
    console.log('Admin user created:', adminEmail);
  }
})();

// Middleware for flash + user
app.use((req, res, next)=>{
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.session.user || null;
  next();
});

// Routes
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, ()=> {
  console.log('Server running on port', PORT);
});
