import Contact from '../models/Contact.js';

// Submit a new contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully! We will get back to you soon.',
      contact
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error submitting contact form',
      error: err.message 
    });
  }
};

// Get all contacts (admin only)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single contact by ID (admin only)
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update contact status (admin only)
export const updateContact = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (status && !['new', 'read', 'replied', 'closed'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be one of: new, read, replied, closed' 
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updatedAt: Date.now() }, 
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a contact (admin only)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get contact statistics (admin only)
export const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });

    res.json({
      total: totalContacts,
      new: newContacts,
      byStatus: stats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 