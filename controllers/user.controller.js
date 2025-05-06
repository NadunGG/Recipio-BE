// Get user profile
export const getUserProfile = (req, res) => {
  try {
    const { user } = req;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }
    
    res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get user profile'
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { user } = req;
    const { name } = req.body;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }
    
    // Update user in Firebase
    await auth.currentUser.updateProfile({
      displayName: name
    });
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        ...user,
        name
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update profile'
    });
  }
};


