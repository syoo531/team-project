const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  } catch {}

  res.status(200).json({ data: "success!" });
};

module.exports = { signUp };
