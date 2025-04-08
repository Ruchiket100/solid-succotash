import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import CommitteeMember from '../models/member.js';

dotenv.config();

const JWT_secret = process.env.JWT_SECRET;

express().use(bodyParser.json());


export const login = async (req, res) => {
const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required.' });
    }

    try {
        const existingUser = await CommitteeMember.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'user does not exist.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'invalid credentials.' });
        }

        const auth_token = generateToken(existingUser);
        return res.status(200).json({ message: 'user logged in successfully.', token: auth_token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
// generate token
export const generateToken = (user) => {
    return jwt.sign({ id: user.externalId, email: user.email }, JWT_secret, { expiresIn: '9999d' });
}