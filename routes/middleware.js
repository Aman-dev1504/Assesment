import jwt from "jsonwebtoken";
export const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      status: "error",
      code: "UNAUTHORIZED",
      message: "Authorization token not provided.",
    });
  }
  jwt.verify(token, "dpdZero", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "error",
        code: "UNAUTHORIZED",
        message: "Invalid or expired token.",
      });
    }
    req.userId = decoded.userId;
    next();
  });
};
