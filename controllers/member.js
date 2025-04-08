import CommitteeMember from '../models/member.js';
import generateId from '../utils/generateId.js';
import bcrypt from 'bcrypt';
import {generateToken} from './auth.js';

// Get all members
export const getAllMembers = async (req, res) => {
  try {
    const members = await CommitteeMember.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error });
  }
};

// Get member by ID
export const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await CommitteeMember.findOne({externalId: id});
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching member', error });
  }
};

// Add new member
export const addMember = async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    contact,
    email,
    address,
    roles,
    password,
  } = req.body;

  const externalId = generateId();

  try {
    const existing = await CommitteeMember.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: 'Member already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = new CommitteeMember({
      externalId,
      firstName,
      lastName,
      birthDate,
      contact,
      email,
      address,
      roles,
      password: hashedPassword,
    });

    newMember.save();
    const auth_token = generateToken(newMember);
    console.log('token', auth_token);
    res.status(201).json({ message: 'user created successfully.', token: auth_token });
  } catch (error) {
    res.status(500).json({ message: 'Error adding member', error });
  }
};

// Update member
export const updateMember = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const member = await CommitteeMember.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const updatedMember = await CommitteeMember.findOneAndDelete({externalId: id}, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: 'Error updating member', error });
  }
};

// Delete member
export const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await CommitteeMember.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    await CommitteeMember.findOneAndDelete({externalId: id});
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error });
  }
};