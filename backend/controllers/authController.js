// A simple login controller
const login = (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // In a real app, you would validate credentials against a database
  console.log(`Login attempt for email: ${email}`);

  // On success, send back a token (fake for now)
  res.status(200).json({ message: 'Login successful!', token: 'fake-jwt-token' });
};

// A simple signup controller
const signup = (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  // In a real app, you would save the new user to a database and hash the password.
  console.log('Signup attempt for:', { name, email });

  // Respond with success
  res.status(201).json({ message: 'User created successfully! Please log in.' });
};

module.exports = {
  login,
  signup,
};