import { Response, Request } from 'express';
import User from '../models/User.model';
import { IAuthRequest } from '../interfaces';
import { genJWT, genPassword } from '../helpers';
import { getGoogleOAuthTokens, getGoogleUser } from '../services';

export const signUp = async (req: Request, res: Response) => {

  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({
      ok: false,
      msg: 'Email is already in use.'
    });

    user = new User(req.body);
    await user.save();

    const token = await genJWT({ uid: user.id, name: user.name, role: user.role  });
    res.cookie('token', token);

    return res.status(201).json({
      ok: true,
      user: {
        uid: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const singIn = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({
      ok: false,
      msg: 'Email or password are incorrect.',
    });

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) return res.status(400).json({
      ok: false,
      msg: 'Email or password are incorrect.'
    });

    const token = await genJWT({ uid: user.id, name: user.name, role: user.role  });
    res.cookie('token', token);

    return res.status(200).json({
      ok: true,
      user: {
        uid: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const signOut = async (_req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ 
      ok: true,
      msg: 'Successfully signed out.'
    });

  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};


export const renewToken = async (req: IAuthRequest, res: Response) => {

  try {
    if (!req.auth) throw new Error;
    const { uid, name, role } = req.auth;

    const token = await genJWT({ uid, name, role });
    const user = await User.findById(uid);

    if (!!!user) { 
      res.clearCookie('token');
      return res.status(400).json({
        ok: false,
        msg: 'User not found.'
      });
    }

    res.cookie('token', token);

    return res.json({ 
      ok: true,
      user: {
        uid: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const googleOauthHandler = async (req: Request, res: Response) => {

  const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN as string;

  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(401).json({
        status: "fail",
        message: "Authorization code not provided!",
      });
    }

    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    const googleUser = await getGoogleUser({ id_token, access_token });

    if (!googleUser.verified_email) {
      return res.status(403).json({
        ok: false,
        msg: 'Google account is not verified.'
      });
    }

    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      user = new User({
        name: googleUser.name,
        email: googleUser.email,
        password: genPassword()
      });
      await user.save();
    }

    const token = await genJWT({ uid: user.id, name: user.name, role: user.role });

    res.cookie('token', token, {
      expires: new Date(Date.now() + (10 * 60 * 60 * 1000))
    });
    return res.redirect(CLIENT_ORIGIN);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};
